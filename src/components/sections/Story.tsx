"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-night py-32 md:py-44"
    >
      {/* Warm window light streaming across */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,179,71,0.0) 30%, rgba(255,179,71,0.16) 55%, rgba(255,179,71,0.0) 80%)",
        }}
      />

      <div className="container-x relative">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left: a stylised 3D-ish kitchen scene drawn with SVG so it
              works without GLTF assets. Wooden masala dabba, brass diya,
              window light. */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            className="relative aspect-[5/6] w-full"
          >
            <KitchenIllustration />
          </motion.div>

          <div>
            <SectionLabel number="02" label="Our Story" />
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
              className="mt-5 font-display text-balance text-4xl font-light leading-[1.05] tracking-[-0.01em] text-cream md:text-6xl"
            >
              A kitchen that
              <span className="block italic text-saffron-gradient">
                cooks like home does.
              </span>
            </motion.h2>

            <div className="mt-7 max-w-lg space-y-5 font-body text-cream/72">
              <p>
                Ms Bawarchi began in a small Andheri kitchen — one brass
                handi, a wooden masala dabba and the recipes Dadi
                wouldn&apos;t write down. We pre-order our day so that
                every tiffin is cooked fresh, never reheated.
              </p>
              <p>
                Real ghee. Hand-pounded masalas. Slow-cooked dals. No
                preservatives, no shortcuts — the kind of food you
                wouldn&apos;t mind eating every single day.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-brass/20 pt-7">
              <Stat number="60+" label="dishes on rotation" />
              <Stat number="4.9" label="rating · 1,200+ tiffins" />
              <Stat number="0" label="preservatives, ever" />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-3xl text-cream md:text-4xl">
        <span className="text-saffron-gradient">{number}</span>
      </dt>
      <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-cream/55">
        {label}
      </dd>
    </div>
  );
}

function KitchenIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-brass/25 bg-gradient-to-br from-[#1a1108] via-[#0d0904] to-[#050300]">
      {/* warm window light beams */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 80% 10%, rgba(255,179,71,0.4) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50 mix-blend-screen"
        style={{
          background:
            "linear-gradient(115deg, transparent 50%, rgba(255,179,71,0.18) 60%, transparent 75%)",
        }}
      />

      <svg
        viewBox="0 0 400 480"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6b4422" />
            <stop offset="100%" stopColor="#3a2410" />
          </linearGradient>
          <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD27A" />
            <stop offset="50%" stopColor="#E8A33D" />
            <stop offset="100%" stopColor="#8B6420" />
          </linearGradient>
          <radialGradient id="flame" cx="0.5" cy="0.6" r="0.5">
            <stop offset="0%" stopColor="#FFE2A0" />
            <stop offset="60%" stopColor="#FFB347" />
            <stop offset="100%" stopColor="#C84B31" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* wooden counter */}
        <rect x="0" y="340" width="400" height="140" fill="url(#wood)" />
        <line
          x1="0"
          y1="340"
          x2="400"
          y2="340"
          stroke="#8B6420"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* masala dabba — open, with circles of spice */}
        <g transform="translate(50,260)">
          <ellipse cx="60" cy="78" rx="60" ry="14" fill="#1a0e04" />
          <rect
            x="0"
            y="20"
            width="120"
            height="60"
            rx="6"
            fill="url(#wood)"
            stroke="#8B6420"
            strokeWidth="1"
          />
          {/* spice circles inside */}
          {[
            { cx: 25, cy: 50, c: "#E8A33D" },
            { cx: 60, cy: 50, c: "#C84B31" },
            { cx: 95, cy: 50, c: "#8B6420" },
            { cx: 25, cy: 75, c: "#4A7C3A" },
            { cx: 60, cy: 75, c: "#F5EDD9" },
            { cx: 95, cy: 75, c: "#7A2E2E" },
          ].map((c, i) => (
            <g key={i}>
              <circle
                cx={c.cx}
                cy={c.cy}
                r="12"
                fill="#0a0500"
                stroke="#8B6420"
                strokeWidth="0.8"
              />
              <circle cx={c.cx} cy={c.cy} r="10" fill={c.c} opacity="0.85" />
            </g>
          ))}
        </g>

        {/* brass diya with flame */}
        <g transform="translate(260,290)">
          <ellipse cx="40" cy="62" rx="40" ry="6" fill="#1a0e04" />
          <path d="M5 50 Q40 70 75 50 L65 60 Q40 70 15 60 Z" fill="url(#brass)" />
          <ellipse cx="40" cy="50" rx="32" ry="6" fill="#8B6420" />
          {/* flame */}
          <ellipse cx="40" cy="32" rx="14" ry="22" fill="url(#flame)" />
          <ellipse cx="40" cy="34" rx="6" ry="14" fill="#FFE2A0" opacity="0.9">
            <animate
              attributeName="ry"
              values="14;16;12;14"
              dur="2s"
              repeatCount="indefinite"
            />
          </ellipse>
        </g>

        {/* small brass handi on counter */}
        <g transform="translate(160,200)">
          <ellipse cx="50" cy="120" rx="50" ry="8" fill="#1a0e04" />
          <path
            d="M5 60 Q5 110 50 116 Q95 110 95 60 L88 50 L12 50 Z"
            fill="url(#brass)"
          />
          <rect x="0" y="46" width="100" height="8" rx="2" fill="url(#brass)" />
          {/* steam */}
          <path
            d="M30 38 Q26 22 34 14 M52 38 Q60 22 50 12 M70 38 Q66 22 74 14"
            stroke="#F5EDD9"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.9;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
    </div>
  );
}
