"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "./menu";

export type CartLine = {
  itemId: string;
  name: string;
  price: number;
  qty: number;
  veg: boolean;
};

type CartState = {
  lines: CartLine[];
  drawerOpen: boolean;
  add: (item: MenuItem, qty?: number) => void;
  remove: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      drawerOpen: false,
      add: (item, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.itemId === item.id);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.itemId === item.id ? { ...l, qty: l.qty + qty } : l,
              ),
              drawerOpen: true,
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                itemId: item.id,
                name: item.name,
                price: item.price,
                qty,
                veg: item.veg,
              },
            ],
            drawerOpen: true,
          };
        }),
      remove: (itemId) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.itemId !== itemId),
        })),
      setQty: (itemId, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((l) => l.itemId !== itemId)
              : state.lines.map((l) =>
                  l.itemId === itemId ? { ...l, qty } : l,
                ),
        })),
      clear: () => set({ lines: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
    }),
    {
      name: "msbawarchi-cart",
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.price * l.qty, 0);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}
