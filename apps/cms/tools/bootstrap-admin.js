// tools/bootstrap-admin.js
// Creates or updates a Strapi admin user using Strapi internals (correct hashing).
// Run: node tools/bootstrap-admin.js

const path = require("path");

async function main() {
  const strapiFactory = require("@strapi/strapi").default;
  const appDir = path.resolve(__dirname, "..");

  const strapi = await strapiFactory({ dir: appDir }).load();

  const email = process.env.BOOTSTRAP_ADMIN_EMAIL || "admin@local.dev";
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD || "ChangeMe_12345!";
  const firstname = process.env.BOOTSTRAP_ADMIN_FIRSTNAME || "Byron";
  const lastname = process.env.BOOTSTRAP_ADMIN_LASTNAME || "Admin";

  const adminUserService =
    strapi?.admin?.services?.user ||
    strapi?.plugin?.("admin")?.service?.("user") ||
    null;

  if (!adminUserService) {
    console.error("Could not access Strapi admin user service.");
    await strapi.destroy();
    process.exit(1);
  }

  const existing = adminUserService.findOneByEmail
    ? await adminUserService.findOneByEmail(email)
    : await adminUserService.findOne({ email });

  if (existing && existing.id) {
    if (adminUserService.updateById) {
      await adminUserService.updateById(existing.id, {
        email,
        firstname,
        lastname,
        password,
        isActive: true,
        blocked: false,
      });
    } else if (adminUserService.update) {
      await adminUserService.update(existing.id, {
        email,
        firstname,
        lastname,
        password,
        isActive: true,
        blocked: false,
      });
    }
    console.log(`Updated admin user: ${email}`);
  } else {
    if (adminUserService.create) {
      await adminUserService.create({
        email,
        firstname,
        lastname,
        password,
        isActive: true,
        blocked: false,
      });
    } else if (adminUserService.createUser) {
      await adminUserService.createUser({
        email,
        firstname,
        lastname,
        password,
        isActive: true,
        blocked: false,
      });
    }
    console.log(`Created admin user: ${email}`);
  }

  console.log("Login at: http://localhost:1337/admin");
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  await strapi.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
