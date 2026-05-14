import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

/**
 * Create a Razorpay order for one-time payment. Amount is in paise.
 *
 *   POST /api/razorpay  { amount: 17900, receipt: "MB-1234" }
 *
 * Returns `{ id, amount, currency }` which the browser passes to
 * `Razorpay.open({ order_id: id, ... })`.
 */
export async function POST(req: Request) {
  try {
    const { amount, receipt } = (await req.json()) as {
      amount: number;
      receipt?: string;
    };
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "invalid amount" }, { status: 400 });
    }
    const order = await razorpay().orders.create({
      amount,
      currency: "INR",
      receipt: receipt ?? `mb-${Date.now()}`,
      payment_capture: true,
    });
    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
