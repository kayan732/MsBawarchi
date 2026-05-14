"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Flame, Package, Bike, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const STATUSES = [
  { id: "received", label: "Order received", icon: CheckCircle2 },
  { id: "cooking", label: "In the kitchen", icon: Flame },
  { id: "packed", label: "Packed", icon: Package },
  { id: "delivering", label: "Out for delivery", icon: Bike },
  { id: "delivered", label: "Delivered", icon: CheckCircle2 },
] as const;

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [orderId, setOrderId] = useState<string>("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    params.then((p) => setOrderId(p.id));
  }, [params]);

  // Demo: auto-advance through statuses every few seconds
  useEffect(() => {
    const t = setInterval(() => {
      setActive((s) => (s < STATUSES.length - 1 ? s + 1 : s));
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen pt-28">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Logo size={48} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            className="mt-10 font-display text-balance text-4xl font-light leading-tight text-cream md:text-6xl"
          >
            Order
            <span className="italic text-saffron-gradient"> confirmed.</span>
          </motion.h1>
          <p className="mt-4 font-body text-cream/65">
            We&apos;ve started cooking. Your tiffin is on its way to your
            chosen slot.
          </p>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-widest2 text-saffron">
            Order #{orderId || "—"}
          </p>
        </div>

        {/* 3D tiffin reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          className="mx-auto mt-10 grid h-48 w-48 place-items-center"
        >
          <svg viewBox="0 0 96 96" className="h-full w-full">
            <defs>
              <linearGradient id="t-brass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFD27A" />
                <stop offset="50%" stopColor="#E8A33D" />
                <stop offset="100%" stopColor="#8B6420" />
              </linearGradient>
            </defs>
            <g>
              <rect
                x="22"
                y="26"
                width="52"
                height="12"
                rx="2"
                fill="url(#t-brass)"
              />
              <rect
                x="22"
                y="40"
                width="52"
                height="12"
                rx="2"
                fill="url(#t-brass)"
              />
              <rect
                x="22"
                y="54"
                width="52"
                height="12"
                rx="2"
                fill="url(#t-brass)"
              />
              <path
                d="M22 32h-5a3 3 0 0 0 0 6h5M74 32h5a3 3 0 0 1 0 6h-5"
                stroke="url(#t-brass)"
                strokeWidth="2"
                fill="none"
              />
              <path d="M48 14v10" stroke="#F5EDD9" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M40 18c0-3 2-4 2-7M56 18c0-2 2-3 2-6" stroke="#F5EDD9" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
                <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite" />
              </path>
            </g>
          </svg>
        </motion.div>

        <div className="mx-auto mt-14 max-w-3xl">
          <ol className="grid gap-3 md:grid-cols-5">
            {STATUSES.map((s, i) => {
              const reached = i <= active;
              const Icon = s.icon;
              return (
                <li
                  key={s.id}
                  className={`glass rounded-2xl p-4 transition ${
                    reached ? "brass-edge" : "opacity-50"
                  }`}
                >
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-full transition ${
                      reached
                        ? "bg-brass-gradient text-night"
                        : "bg-night/40 text-cream/40"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.6} />
                  </div>
                  <p className="mt-3 font-display text-sm text-cream">
                    {s.label}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest2 text-cream/40">
                    {reached ? "Done" : "Pending"}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
            ETA · 45 min · Rider Vinod will call on arrival
          </p>
          <div className="flex items-center gap-3">
            <a href="tel:+910000000000" className="btn-ghost">
              <Phone size={14} /> Call rider
            </a>
            <Link href="/" className="btn-primary">
              Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
