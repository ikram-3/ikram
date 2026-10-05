// Seed the site-owner admin account for RBAC (Task 3).
// Env override: ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME. Demo defaults below.
// Run: bun scripts/seed-admin.ts

import { PrismaClient } from "@prisma/client";
import { scryptSync, randomBytes } from "node:crypto";

const db = new PrismaClient();

function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$16384$8$1$${salt.toString("hex")}$${hash.toString("hex")}`;
}

const EMAIL = (process.env.ADMIN_EMAIL ?? "admin@ikram.local").toLowerCase();
const PASSWORD = process.env.ADMIN_PASSWORD ?? "IkramAdmin2025";
const NAME = process.env.ADMIN_NAME ?? "Muhammad Ikram";

async function main() {
  const existing = await db.user.findUnique({ where: { email: EMAIL } });
  if (existing) {
    await db.user.update({ where: { email: EMAIL }, data: { role: "admin", passwordHash: hashPassword(PASSWORD) } });
    console.log(`admin refreshed: ${EMAIL}`);
    return;
  }
  await db.user.create({ data: { email: EMAIL, name: NAME, passwordHash: hashPassword(PASSWORD), role: "admin" } });
  console.log(`admin created: ${EMAIL} / ${PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
