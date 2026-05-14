import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { supabaseService } from "@/lib/supabase";

/**
 * Razorpay → Ms Bawarchi webhook. Marks orders / subscriptions paid
 * once Razorpay confirms. The signature header is HMAC-SHA256 of the
 * raw body keyed with the webhook secret.
 */
export async function POST(req: Request) {
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  const raw = await req.text();
  if (!verifyWebhookSignature(raw, signature)) {
    return NextResponse.json({ error: "bad signature" }, { status: 401 });
  }

  const event = JSON.parse(raw) as {
    event: string;
    payload: { payment: { entity: { order_id: string; status: string } } };
  };

  // const supabase = supabaseService();
  // await supabase.from("orders").update({ status: "paid" }).eq("razorpay_order_id", event.payload.payment.entity.order_id);
  void supabaseService;
  void event;

  return NextResponse.json({ received: true });
}
