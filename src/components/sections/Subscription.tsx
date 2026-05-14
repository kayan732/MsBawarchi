"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PLANS } from "@/lib/plans";
import { formatINR, cn } from "@/lib/utils";

export function Subscription() {
  return (
    <section
      id="subscribe"
      className="relative overflow-hidden bg-night py-32 md:py-44"
    >
      {/* warm spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(255,179,71,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel
            number="05"
            label="Tiffin subscriptions"
            className="justify-center"
          />
          <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.05] tracking-[-0.01em] text-cream md:text-6xl">
            Pick a rhythm that
            <span className="block italic text-saffron-gradient">
              fits your week.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-cream/65">
            One-time tiffin, weekly comfort, or a full month of ghar
            ka khaana. Pause, skip, or modify anytime — the Bawarchi
            kitchen flexes with your life.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 1,
                delay: i * 0.12,
                ease: [0.65, 0, 0.35, 1],
              }}
              animate={{ y: plan.popular ? [-4, 4, -4] : [0, 0] }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-3xl p-8 brass-edge",
                plan.popular
                  ? "glass-strong z-10 md:-mt-6 md:mb-2 md:scale-[1.04]"
                  : "glass",
              )}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {plan.popular && (
                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-brass-gradient px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-night">
                  <Sparkles size={11} /> Most popular
                </span>
              )}

              <header>
                <h3 className="font-display text-2xl text-cream">
                  {plan.name}
                </h3>
                <p className="mt-2 font-body text-sm text-cream/60">
                  {plan.tagline}
                </p>
              </header>

              <div className="mt-7 flex items-baseline gap-2">
                <span className="font-display text-5xl text-saffron-gradient">
                  {formatINR(plan.price)}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest2 text-cream/50">
                  {plan.cadence}
                </span>
              </div>
              {plan.saves && (
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-coriander">
                  {plan.saves}
                </p>
              )}

              <ul className="mt-8 flex-1 space-y-3">
                {plan.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-3 font-body text-sm text-cream/75"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-saffron/45 bg-night/50">
                      <Check size={11} className="text-saffron" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={cn(
                  "mt-9 w-full",
                  plan.popular ? "btn-primary" : "btn-ghost",
                )}
              >
                {plan.cta}
              </button>

              <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-widest2 text-cream/40">
                {plan.id === "daily"
                  ? "No commitment · cancel anytime"
                  : "Cancel anytime · proration applied"}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-widest2 text-cream/40">
          All plans include real ghee, hand-pounded masalas, and
          insulated delivery. UPI · Cards · Net Banking via Razorpay.
        </p>
      </div>
    </section>
  );
}
