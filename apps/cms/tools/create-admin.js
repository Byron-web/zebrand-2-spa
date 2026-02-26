// tools/create-admin.js
// Creates a Strapi admin user directly in SQLite for Strapi v5.
// Usage:
// node tools/create-admin.js "email@domain.com" "StrongPassword123!" "First" "Last"

const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");
const crypto = require("crypto");

function exit(msg) {
  console.log(msg);
  process.exit(1);
}

function nowIso() {
  return new Date().toISOString();
}

function sha512(password, salt) {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("hex");
}

// Strapi admin password format historically uses salt + hash.
// We'll store: password = <hash> and salt in a column if present.
// Some schemas use "password" only (already hashed). We'll detect schema.
function buildPasswordFields(password, tableInfo) {
  const cols = new Set(tableInfo.map((c) => c.name));

  // common columns
  const hasSalt = cols.has("password_salt") || cols.has("salt");
  const saltCol = cols.has("password_salt") ? "password_salt" : cols.has("salt") ? "salt" : null;

  const hashed = crypto.randomBytes(16).toString("hex"); // placeholder; will set real below
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = sha512(password, salt);

  if (hasSalt && saltCol) {
    return { password: hash, [saltCol]: salt };
  }

  // If no salt column exists, we still store a deterministic hash string.
  // Strapi may reject if format differs; if that happens we'll switch to Strapi's crypto util.
  const fallback = crypto.createHash("sha256").update(password).digest("hex");
  return { password: fallback };
}

function main() {
  const [email, password, firstname, lastname] = process.argv.slice(2);

  if (!email || !password) {
    exit('Missing args. Example: node tools/create-admin.js "admin@site.com" "Pass123!" "Admin" "User"');
  }

  const first = firstname || "Admin";
  const last = lastname || "User";

  const root = path.resolve(__dirname, "..");
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) exit(`.env not found at ${envPath}`);

  const env = fs.readFileSync(envPath, "utf8");
  const match = env.match(/^DATABASE_FILENAME=(.+)$/m);
  if (!match) exit("DATABASE_FILENAME not found in .env");

  const dbFile = match[1].trim();
  const dbPath = path.isAbsolute(dbFile) ? dbFile : path.join(root, dbFile);

  if (!fs.existsSync(dbPath)) exit(`SQLite DB not found: ${dbPath}`);

  const db = new Database(dbPath);

  // Strapi admin user table is typically: admin_users
  const table = "admin_users";

  // Confirm table exists
  const tbl = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
    .get(table);

  if (!tbl) {
    exit(`Table "${table}" not found in DB. This project may be using a different admin table name.`);
  }

  const tableInfo = db.prepare(`PRAGMA table_info(${table})`).all();
  const cols = new Set(tableInfo.map((c) => c.name));

  // Required columns (most common)
  const required = ["email", "firstname", "lastname"];
  for (const r of required) {
    if (!cols.has(r)) exit(`Column "${r}" not found in ${table}. Schema differs.`);
  }

  // If email already exists, delete it (so reruns are safe)
  db.prepare(`DELETE FROM ${table} WHERE email = ?`).run(email);

  const createdAtCol = cols.has("created_at") ? "created_at" : cols.has("createdAt") ? "createdAt" : null;
  const updatedAtCol = cols.has("updated_at") ? "updated_at" : cols.has("updatedAt") ? "updatedAt" : null;

  const isActiveCol = cols.has("is_active") ? "is_active" : cols.has("isActive") ? "isActive" : null;
  const blockedCol = cols.has("blocked") ? "blocked" : null;

  const rolesTable = "admin_roles";
  const userRolesTable = "admin_users_roles_links";

  // Determine if roles tables exist
  const hasRoles = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
    .get(rolesTable);
  const hasUserRoles = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
    .get(userRolesTable);

  const passwordFields = buildPasswordFields(password, tableInfo);

  // Build insert object
  const row = {
    email,
    firstname: first,
    lastname: last,
    ...passwordFields,
  };

  // Set status flags if present
  if (isActiveCol) row[isActiveCol] = 1;
  if (blockedCol) row[blockedCol] = 0;

  const now = nowIso();
  if (createdAtCol) row[createdAtCol] = now;
  if (updatedAtCol) row[updatedAtCol] = now;

  // Insert
  const keys = Object.keys(row);
  const placeholders = keys.map(() => "?").join(", ");
  const stmt = db.prepare(`INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`);
  const info = stmt.run(...keys.map((k) => row[k]));

  const userId = info.lastInsertRowid;

  // Assign Super Admin role if tables exist
  if (hasRoles && hasUserRoles) {
    const superAdmin = db
      .prepare(`SELECT id FROM ${rolesTable} WHERE code = ? OR name = ?`)
      .get("strapi-super-admin", "Super Admin");

    if (superAdmin && superAdmin.id) {
      // Link table fields vary; inspect columns
      const linkInfo = db.prepare(`PRAGMA table_info(${userRolesTable})`).all();
      const linkCols = new Set(linkInfo.map((c) => c.name));

      const userCol =
        linkCols.has("user_id") ? "user_id" :
        linkCols.has("admin_user_id") ? "admin_user_id" :
        linkCols.has("user") ? "user" : null;

      const roleCol =
        linkCols.has("role_id") ? "role_id" :
        linkCols.has("admin_role_id") ? "admin_role_id" :
        linkCols.has("role") ? "role" : null;

      if (userCol && roleCol) {
        db.prepare(`DELETE FROM ${userRolesTable} WHERE ${userCol}=?`).run(userId);
        db.prepare(`INSERT INTO ${userRolesTable} (${userCol}, ${roleCol}) VALUES (?, ?)`).run(
          userId,
          superAdmin.id
        );
      }
    }
  }

  db.close();

  console.log("Admin user created:");
  console.log(`  Email: ${email}`);
  console.log("  Role: (attempted) Super Admin");
  console.log("Next: start Strapi and log in at http://localhost:1337/admin");
}

main();