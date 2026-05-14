"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const FAQS = [
  {
    q: "What time should I order by?",
    a: "Order by 10 AM for the lunch slot (12–2 PM) and by 5 PM for the dinner slot (7–9 PM). The earlier you order, the better the kitchen can plan.",
  },
  {
    q: "Which areas do you deliver to?",
    a: "Andheri West, Lokhandwala, Versova, Oshiwara and Jogeshwari are our primary zones. Other Mumbai locations on the monthly plan — DM us on Instagram to confirm.",
  },
  {
    q: "Can I pause or skip my subscription?",
    a: "Yes — skip any day by 9 AM and the kitchen won't cook for you. Pause for up to two weeks; pro-ration is applied to your next billing cycle.",
  },
  {
    q: "Is the food spicy?",
    a: "By default we cook to a balanced Mumbai-mild level. Add 'less spicy' or 'extra spicy' as an order note and we'll adjust.",
  },
  {
    q: "Do you use real ghee?",
    a: "Always. Locally-sourced A2 desi ghee. Hand-pounded masalas. No preservatives, no shortcuts — that's the whole brand.",
  },
  {
    q: "What about allergies or dietary needs?",
    a: "Tell us once — nut-free, dairy-free, Jain, low-sodium — and we'll honour it on every order. Add a note in your profile or message the WhatsApp concierge.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-night py-32 md:py-40"
    >
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel
            number="08"
            label="Questions answered"
            className="justify-center"
          />
          <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.05] tracking-[-0.01em] text-cream md:text-6xl">
            Common
            <span className="italic text-saffron-gradient"> curiosities.</span>
          </h2>
        </div>

        <ul className="mx-auto mt-14 max-w-3xl divide-y divide-brass/15 border-y border-brass/15">
          {FAQS.map((faq, i) => (
            <FAQRow key={faq.q} faq={faq} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FAQRow({
  faq,
  index,
}: {
  faq: { q: string; a: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="flex items-center gap-5">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-cream/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-xl text-cream md:text-2xl">
            {faq.q}
          </span>
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brass/30 transition-transform duration-500 ${
            open ? "rotate-45 border-saffron/70 text-saffron" : "text-cream/70"
          }`}
        >
          <Plus size={16} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 pl-[3.4rem] pr-12 font-body text-cream/65">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
