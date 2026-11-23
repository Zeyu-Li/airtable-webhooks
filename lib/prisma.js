import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

function createClient() {
  const adapter = new PrismaBetterSqlite3(
    { url: process.env.DATABASE_URL },
    // Prisma 4 stored DateTime as epoch milliseconds; keep that format so existing rows still read.
    { timestampFormat: "unixepoch-ms" }
  );
  return new PrismaClient({ adapter });
}

// Reuse one client across hot reloads in development.
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? createClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
