"use client";

import { useCart, cartTotal } from "@/lib/cart";
import { formatINR } from "@/lib/utils";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export function CartDrawer() {
  const open = useCart((s) => s.drawerOpen);
  const close = useCart((s) => s.closeDrawer);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const total = cartTotal(lines);
  const deliveryFee = total > 0 && total < 199 ? 29 : 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-night/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-brass/30 bg-charcoal/95 backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-brass/20 px-6 py-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-saffron/80">
                  Your Tiffin
                </p>
                <h2 className="font-display text-2xl text-cream">
                  Cart{" "}
                  <span className="text-cream/40">
                    ({lines.reduce((s, l) => s + l.qty, 0)})
                  </span>
                </h2>
              </div>
              <button
                onClick={close}
                aria-label="Close cart"
                className="rounded-full p-2 text-cream/70 hover:bg-night/40 hover:text-cream"
              >
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border border-brass/30 bg-night/40">
                    <ShoppingBag className="text-saffron" />
                  </div>
                  <p className="font-display text-xl text-cream">
                    Your tiffin is empty.
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-cream/55">
                    Browse the menu and add a couple of ghar-jaisa dishes.
                  </p>
                  <Link
                    href="/#menu"
                    onClick={close}
                    className="btn-primary mt-8"
                  >
                    Open menu
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <li
                      key={line.itemId}
                      className="glass rounded-2xl p-4 brass-edge"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="veg-dot mt-1"
                          data-veg={line.veg ? "true" : "false"}
                          aria-label={line.veg ? "Vegetarian" : "Non-vegetarian"}
                        />
                        <div className="flex-1">
                          <p className="font-display text-base text-cream">
                            {line.name}
                          </p>
                          <p className="mt-0.5 font-mono text-xs text-cream/55">
                            {formatINR(line.price)} each
                          </p>
                        </div>
                        <div className="text-right font-mono text-sm text-cream">
                          {formatINR(line.price * line.qty)}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-night/40 p-1">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.itemId, line.qty - 1)}
                            className="grid h-7 w-7 place-items-center rounded-full text-cream/80 hover:bg-night/70"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center font-mono text-sm">
                            {line.qty}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.itemId, line.qty + 1)}
                            className="grid h-7 w-7 place-items-center rounded-full text-cream/80 hover:bg-night/70"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(line.itemId)}
                          className="text-xs uppercase tracking-widest2 text-cream/50 hover:text-terracotta"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-brass/20 bg-night/40 px-6 py-5">
                <dl className="space-y-1.5 font-mono text-sm">
                  <div className="flex justify-between text-cream/65">
                    <dt>Subtotal</dt>
                    <dd>{formatINR(total)}</dd>
                  </div>
                  <div className="flex justify-between text-cream/65">
                    <dt>Delivery</dt>
                    <dd>
                      {deliveryFee === 0 ? "Free" : formatINR(deliveryFee)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-brass/15 pt-2 text-cream">
                    <dt className="text-cream">Total</dt>
                    <dd className="text-saffron-gradient text-base">
                      {formatINR(total + deliveryFee)}
                    </dd>
                  </div>
                </dl>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="btn-primary mt-5 w-full"
                >
                  Continue to checkout
                </Link>
                <p className="mt-3 text-center text-[11px] uppercase tracking-widest2 text-cream/35">
                  Pre-order by 10 AM for lunch · 5 PM for dinner
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
