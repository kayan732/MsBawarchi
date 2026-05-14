/**
 * Razorpay server SDK helper. The browser uses the Checkout script via
 * a CDN; this file exists for server-side order/subscription creation
 * and webhook signature verification.
 */
import crypto from "node:crypto";
import Razorpay from "razorpay";

export function razorpay() {
  const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials are not configured.");
  }
  return new Razorpay({ key_id, key_secret });
}

export function verifyWebhookSignature(body: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature),
  );
}
