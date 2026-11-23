import { createHash, timingSafeEqual } from "crypto";

const sha256 = (value) => createHash("sha256").update(value).digest();

/**
 * True when the request carries `Authorization: Bearer <WEBHOOK_SECRET>`.
 * Hashing both sides gives equal-length buffers, so the comparison is constant time.
 */
export function hasValidWebhookSecret(req, secret = process.env.WEBHOOK_SECRET) {
  const header = req.headers.authorization;
  if (!secret || typeof header !== "string" || !header.startsWith("Bearer ")) return false;
  return timingSafeEqual(sha256(header.slice("Bearer ".length)), sha256(secret));
}
