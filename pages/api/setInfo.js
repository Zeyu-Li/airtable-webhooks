import { prisma } from "../../lib/prisma";
import { hasValidWebhookSecret } from "../../lib/webhookAuth";

const MAX_NAME_LENGTH = 100;

const isValidName = (value) =>
  typeof value === "string" && value.trim() !== "" && value.length <= MAX_NAME_LENGTH;

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).send({ message: "Only POST requests allowed" });

  if (!process.env.WEBHOOK_SECRET)
    return res.status(500).send({ message: "WEBHOOK_SECRET is not configured" });

  if (!hasValidWebhookSecret(req))
    return res.status(401).send({ message: "Unauthorized" });

  const { First, Last } = req.query;
  if (!isValidName(First) || !isValidName(Last))
    return res.status(400).send({
      message: `First and Last must each be a single non-empty value of at most ${MAX_NAME_LENGTH} characters`,
    });

  const entry = await prisma.entry.create({
    data: {
      Name: `${First} ${Last}`,
      First: First,
      Last: Last,
    },
  });
  res.status(200).json(entry);
}
