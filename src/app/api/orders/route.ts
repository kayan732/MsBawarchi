import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";

/**
 * Create an order. The Razorpay payment intent is created server-side
 * and stored alongside the order; the browser then opens the Razorpay
 * checkout with that `order_id`. The webhook (see /api/webhook/razorpay)
 * marks the order as paid once Razorpay confirms.
 *
 * In production, hook this up to `supabaseService()` and `razorpay()` —
 * for the demo we accept the request and return a synthetic order id so
 * the rest of the flow stays clickable.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const id = `MB-${Math.floor(Math.random() * 9000 + 1000)}`;

  // Production path (commented out until Supabase env is wired):
  // const supabase = supabaseService();
  // const { data, error } = await supabase
  //   .from("orders")
  //   .insert({ payload: body, status: "received" })
  //   .select("id")
  //   .single();
  // if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    id,
    status: "received",
    razorpayOrderId: `order_${id}`,
    accepted: true,
    echo: body,
  });
}

export async function GET() {
  // List orders for the admin dashboard (filtered server-side in real life).
  // Here we just return an empty list shape.
  void supabaseService;
  return NextResponse.json({ orders: [] });
}
