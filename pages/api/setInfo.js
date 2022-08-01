import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).send({ message: "Only POST requests allowed" });

  console.error(req.query);
  const { First, Last } = req.query;
  const entry = await prisma.entry.create({
    data: {
      Name: `${First} ${Last}`,
      First: First,
      Last: Last,
    },
  });
  res.status(200).json(entry);
}
