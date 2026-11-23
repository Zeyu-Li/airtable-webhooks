// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const data = await prisma.entry.findMany();
  res.status(200).json(data);
}
