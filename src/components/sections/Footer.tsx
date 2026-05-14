"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Instagram, MessageCircle, Phone, Mail } from "lucide-react";

const COLS = [
  {
    title: "Menu",
    links: [
      { href: "/#menu", label: "Today's menu" },
      { href: "/#menu", label: "Tiffin service" },
      { href: "/#menu", label: "Parathe ki Galli" },
      { href: "/#menu", label: "Desserts" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#story", label: "Our story" },
      { href: "/#why-us", label: "Why Ms Bawarchi" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/#faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/refunds", label: "Refund policy" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-brass/15 bg-night pt-32"
    >
      {/* tiny handi shrinking into the distance */}
      <div className="relative mx-auto mb-24 h-24 w-24">
        <motion.div
          initial={{ scale: 1.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        >
          <Logo size={56} />
        </motion.div>
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-balance text-3xl font-light leading-tight text-cream md:text-5xl">
            <span className="text-saffron-gradient italic">Ghar Jaisa Swaad</span>
            <br />
            Har Bite Mein.
          </h2>
          <p className="mt-5 font-body text-cream/55">
            Pre-order by 10 AM for lunch, 5 PM for dinner. Delivered hot
            across Andheri, Lokhandwala, Versova, and Oshiwara.
          </p>
        </div>

        <div className="mt-20 grid gap-10 border-t border-brass/15 pt-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo size={36} />
            <p className="mt-5 max-w-xs font-body text-sm text-cream/55">
              Mumbai&apos;s premium homestyle tiffin & classic Indian
              cuisine, delivered on pre-order.
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-3">
              <SocialLink
                href="https://instagram.com"
                label="Instagram"
                icon={<Instagram size={16} />}
              />
              <SocialLink
                href="https://wa.me/910000000000"
                label="WhatsApp"
                icon={<MessageCircle size={16} />}
              />
              <SocialLink
                href="tel:+910000000000"
                label="Call"
                icon={<Phone size={16} />}
              />
              <SocialLink
                href="mailto:hello@msbawarchi.in"
                label="Email"
                icon={<Mail size={16} />}
              />
            </ul>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-saffron/85">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-cream/70 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-brass/15 pb-10 pt-7 text-[11px] font-mono uppercase tracking-widest2 text-cream/40 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} Ms Bawarchi · Andheri, Mumbai</p>
          <p>FSSAI License #00000000000000 · GSTIN 27XXXXXXXXXXXX</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noreferrer"
        className="grid h-9 w-9 place-items-center rounded-full border border-brass/30 bg-night/50 text-cream/75 transition hover:border-saffron/60 hover:text-cream"
      >
        {icon}
      </a>
    </li>
  );
}
