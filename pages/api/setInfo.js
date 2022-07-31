import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).send({ message: "Only POST requests allowed" });

  console.error(req.body);
  const entry = await prisma.entry.create({
    data: {
      Name: "Alice Lee",
      First: "Alice",
      Last: "Lee",
    },
  });
  res.status(200).json(entry);
}
