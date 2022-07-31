import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const entry = await prisma.entry.create({
    data: {
      Name: "Alice Lee",
      First: "Alice",
      Last: "Lee",
    },
  });
  res.status(200).json(entry);
}
