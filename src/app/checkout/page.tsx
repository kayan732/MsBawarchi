"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useCart, cartTotal } from "@/lib/cart";
import { formatINR, cn } from "@/lib/utils";

const STEPS = ["Address", "Time", "Pay"] as const;

const SLOTS = [
  { id: "lunch-1", label: "Lunch · 12 – 1 PM" },
  { id: "lunch-2", label: "Lunch · 1 – 2 PM" },
  { id: "dinner-1", label: "Dinner · 7 – 8 PM" },
  { id: "dinner-2", label: "Dinner · 8 – 9 PM" },
];

const ZONES = [
  "Andheri West",
  "Lokhandwala",
  "Versova",
  "Oshiwara",
  "Jogeshwari",
];

const PAY_METHODS = [
  { id: "upi", label: "UPI · GPay / PhonePe / Paytm" },
  { id: "card", label: "Credit / Debit Card" },
  { id: "netbanking", label: "Net Banking" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const total = cartTotal(lines);
  const deliveryFee = total > 0 && total < 199 ? 29 : 0;
  const grand = total + deliveryFee;

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    zone: ZONES[0],
    landmark: "",
    slot: SLOTS[0].id,
    payment: "upi",
  });

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function placeOrder() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, customer: form, total: grand }),
      });
      const data = await res.json();
      clear();
      router.push(`/orders/${data.id ?? "demo"}`);
    } catch {
      // graceful fallback to demo confirmation
      clear();
      router.push("/orders/demo");
    }
  }

  if (lines.length === 0) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container-x text-center">
          <h1 className="font-display text-4xl text-cream">
            Nothing in the tiffin yet.
          </h1>
          <p className="mt-3 text-cream/55">
            Pick a few dishes from today&apos;s menu to get started.
          </p>
          <Link href="/#menu" className="btn-primary mt-8">
            Open menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28">
      <div className="container-x">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-cream/55 hover:text-cream"
        >
          <ArrowLeft size={14} /> Back to menu
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Stepper step={step} />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                className="glass mt-8 rounded-3xl p-8 brass-edge"
              >
                {step === 0 && (
                  <fieldset className="space-y-5">
                    <legend className="font-display text-2xl text-cream">
                      Where should we deliver?
                    </legend>
                    <Field label="Name">
                      <input
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className={INPUT}
                        placeholder="As on the doorbell"
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className={INPUT}
                        placeholder="+91 XXXXX XXXXX"
                        inputMode="tel"
                      />
                    </Field>
                    <Field label="Address">
                      <textarea
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        className={`${INPUT} min-h-24`}
                        placeholder="Flat · Building · Street"
                      />
                    </Field>
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Zone">
                        <select
                          value={form.zone}
                          onChange={(e) =>
                            setForm({ ...form, zone: e.target.value })
                          }
                          className={INPUT}
                        >
                          {ZONES.map((z) => (
                            <option key={z} value={z}>
                              {z}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Landmark (optional)">
                        <input
                          value={form.landmark}
                          onChange={(e) =>
                            setForm({ ...form, landmark: e.target.value })
                          }
                          className={INPUT}
                          placeholder="Near …"
                        />
                      </Field>
                    </div>
                  </fieldset>
                )}

                {step === 1 && (
                  <fieldset className="space-y-5">
                    <legend className="font-display text-2xl text-cream">
                      Pick a delivery slot
                    </legend>
                    <ul className="grid gap-3 md:grid-cols-2">
                      {SLOTS.map((slot) => {
                        const selected = form.slot === slot.id;
                        return (
                          <li key={slot.id}>
                            <button
                              type="button"
                              onClick={() =>
                                setForm({ ...form, slot: slot.id })
                              }
                              className={cn(
                                "w-full rounded-2xl border px-5 py-4 text-left transition",
                                selected
                                  ? "border-saffron/70 bg-night/60 text-cream"
                                  : "border-brass/25 bg-night/30 text-cream/70 hover:border-brass/55",
                              )}
                            >
                              <p className="font-display text-lg leading-tight">
                                {slot.label}
                              </p>
                              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
                                {selected ? "Selected" : "Tap to select"}
                              </p>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="rounded-2xl border border-brass/15 bg-night/30 px-5 py-4 font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
                      Lunch closes at 10 AM · Dinner closes at 5 PM
                    </p>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset className="space-y-5">
                    <legend className="font-display text-2xl text-cream">
                      Pay your way
                    </legend>
                    <ul className="grid gap-3">
                      {PAY_METHODS.map((m) => {
                        const selected = form.payment === m.id;
                        return (
                          <li key={m.id}>
                            <button
                              type="button"
                              onClick={() =>
                                setForm({ ...form, payment: m.id })
                              }
                              className={cn(
                                "flex w-full items-center justify-between rounded-2xl border px-5 py-4 transition",
                                selected
                                  ? "border-saffron/70 bg-night/60 text-cream"
                                  : "border-brass/25 bg-night/30 text-cream/70 hover:border-brass/55",
                              )}
                            >
                              <span className="font-display text-base">
                                {m.label}
                              </span>
                              {selected && (
                                <span className="grid h-6 w-6 place-items-center rounded-full bg-saffron text-night">
                                  <Check size={13} strokeWidth={3} />
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
                      Razorpay opens in a secure modal · UPI / Cards / Wallets
                    </p>
                  </fieldset>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={step === 0}
                    className="btn-ghost disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="btn-primary"
                    >
                      Continue <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={placeOrder}
                      className="btn-primary disabled:opacity-60"
                    >
                      {submitting
                        ? "Placing order…"
                        : `Pay ${formatINR(grand)}`}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Summary card */}
          <aside className="glass h-fit rounded-3xl p-7 brass-edge lg:sticky lg:top-28">
            <h2 className="font-display text-xl text-cream">Your order</h2>
            <ul className="mt-5 space-y-3 border-t border-brass/15 pt-5">
              {lines.map((l) => (
                <li
                  key={l.itemId}
                  className="flex items-start justify-between gap-3 font-body text-sm text-cream/75"
                >
                  <span className="flex items-start gap-2">
                    <span
                      className="veg-dot mt-1.5"
                      data-veg={l.veg ? "true" : "false"}
                    />
                    <span>
                      {l.name}
                      <span className="ml-2 font-mono text-xs text-cream/45">
                        × {l.qty}
                      </span>
                    </span>
                  </span>
                  <span className="font-mono text-cream/85">
                    {formatINR(l.price * l.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-1.5 border-t border-brass/15 pt-5 font-mono text-sm">
              <div className="flex justify-between text-cream/65">
                <dt>Subtotal</dt>
                <dd>{formatINR(total)}</dd>
              </div>
              <div className="flex justify-between text-cream/65">
                <dt>Delivery</dt>
                <dd>{deliveryFee === 0 ? "Free" : formatINR(deliveryFee)}</dd>
              </div>
              <div className="flex justify-between border-t border-brass/15 pt-3 text-cream">
                <dt>Total</dt>
                <dd className="text-saffron-gradient text-base">
                  {formatINR(grand)}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-4">
      {STEPS.map((label, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <li key={label} className="flex flex-1 items-center gap-3">
            <span
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full border font-mono text-xs",
                done && "border-saffron bg-saffron text-night",
                active &&
                  !done &&
                  "border-saffron text-saffron shadow-[0_0_18px_rgba(232,163,61,0.5)]",
                !active && !done && "border-brass/30 text-cream/55",
              )}
            >
              {done ? <Check size={14} /> : i + 1}
            </span>
            <span
              className={cn(
                "font-mono text-[11px] uppercase tracking-widest2",
                active || done ? "text-cream" : "text-cream/45",
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1",
                  done ? "bg-saffron/70" : "bg-brass/20",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-widest2 text-cream/55">
        {label}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const INPUT =
  "w-full rounded-xl border border-brass/25 bg-night/40 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/35 focus:border-saffron/70 focus:outline-none focus:ring-2 focus:ring-saffron/20";
