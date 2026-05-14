"use client";

/**
 * Marker provider so that we initialize the persisted cart on the
 * client only. The Zustand store itself is global; this component
 * exists so the layout has a clean place to hang client-only state.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
