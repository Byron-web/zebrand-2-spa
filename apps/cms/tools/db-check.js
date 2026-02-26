const Database = require("better-sqlite3");

const db = new Database(".tmp/data.db");

const row = db
  .prepare("SELECT id,email,is_active,blocked FROM admin_users WHERE email = ?")
  .get("admin@local.dev");

console.log(row);

db.close();