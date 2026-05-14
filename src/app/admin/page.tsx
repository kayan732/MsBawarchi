"use client";

import { useState } from "react";
import { AdminHeader, StatTile } from "@/components/admin/AdminHeader";
import { formatINR, cn } from "@/lib/utils";
import { Filter, Download, RefreshCw } from "lucide-react";

type Status = "received" | "cooking" | "delivering" | "delivered";

const MOCK_ORDERS: {
  id: string;
  customer: string;
  zone: string;
  items: string;
  total: number;
  slot: string;
  status: Status;
}[] = [
  {
    id: "MB-9182",
    customer: "Priya Mehta",
    zone: "Andheri W",
    items: "Full Tiffin · Suji Halwa",
    total: 404,
    slot: "Lunch 12 – 1 PM",
    status: "cooking",
  },
  {
    id: "MB-9181",
    customer: "Aman Gulati",
    zone: "Lokhandwala",
    items: "Dal Makhani Chawal · Lassi",
    total: 268,
    slot: "Lunch 1 – 2 PM",
    status: "received",
  },
  {
    id: "MB-9180",
    customer: "Riya K.",
    zone: "Versova",
    items: "Cream Chicken · Paratha × 2",
    total: 587,
    slot: "Dinner 8 – 9 PM",
    status: "delivering",
  },
  {
    id: "MB-9179",
    customer: "Saurabh D.",
    zone: "Jogeshwari",
    items: "Weekly subscription · Day 4",
    total: 0,
    slot: "Lunch 12 – 1 PM",
    status: "delivered",
  },
  {
    id: "MB-9178",
    customer: "Tanvi Shah",
    zone: "Oshiwara",
    items: "Aloo Paratha × 3 · Masala Tea",
    total: 416,
    slot: "Dinner 7 – 8 PM",
    status: "received",
  },
];

const STATUS_STYLES: Record<
  Status,
  { label: string; className: string }
> = {
  received: {
    label: "Received",
    className: "bg-cream/10 text-cream/70 border-cream/20",
  },
  cooking: {
    label: "Cooking",
    className:
      "bg-saffron/20 text-saffron border-saffron/40 shadow-[0_0_15px_rgba(232,163,61,0.3)]",
  },
  delivering: {
    label: "Out for delivery",
    className: "bg-rim-teal/20 text-rim-teal border-rim-teal/40",
  },
  delivered: {
    label: "Delivered",
    className: "bg-coriander/20 text-coriander border-coriander/40",
  },
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<Status | "all">("all");
  const orders = MOCK_ORDERS.filter(
    (o) => filter === "all" || o.status === filter,
  );

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Live kitchen"
        title="Orders"
        description="Real-time order feed. Status updates push to customers via SMS and the order tracking page."
        actions={
          <>
            <button className="btn-ghost">
              <Filter size={14} /> Filters
            </button>
            <button className="btn-ghost">
              <Download size={14} /> Export
            </button>
            <button className="btn-primary">
              <RefreshCw size={14} /> Refresh
            </button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatTile
          label="Today's revenue"
          value={formatINR(18420)}
          hint="vs ₹14,260 yesterday"
        />
        <StatTile label="Orders" value="42" hint="6 in kitchen now" />
        <StatTile label="Avg ticket" value={formatINR(438)} />
        <StatTile label="Top item" value="Full Tiffin" hint="17 today" />
      </section>

      <section className="glass rounded-3xl p-6 brass-edge">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(["all", "received", "cooking", "delivering", "delivered"] as const).map(
            (s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest2 transition",
                  filter === s
                    ? "border-saffron/70 bg-night/60 text-cream"
                    : "border-brass/25 bg-night/30 text-cream/55 hover:border-brass/55",
                )}
              >
                {s}
              </button>
            ),
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-brass/15 text-left font-mono text-[10px] uppercase tracking-widest2 text-cream/55">
                <th className="py-3 pr-4">Order</th>
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Items</th>
                <th className="py-3 pr-4">Slot</th>
                <th className="py-3 pr-4">Total</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody className="font-body text-cream/80">
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-brass/10 last:border-0 hover:bg-night/30"
                >
                  <td className="py-4 pr-4">
                    <span className="font-mono text-[12px] text-cream">
                      {o.id}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <p className="text-cream">{o.customer}</p>
                    <p className="font-mono text-[11px] text-cream/45">
                      {o.zone}
                    </p>
                  </td>
                  <td className="py-4 pr-4 text-cream/70">{o.items}</td>
                  <td className="py-4 pr-4 font-mono text-[12px] text-cream/65">
                    {o.slot}
                  </td>
                  <td className="py-4 pr-4 font-mono text-cream">
                    {o.total === 0 ? "—" : formatINR(o.total)}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2",
                        STATUS_STYLES[o.status].className,
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {STATUS_STYLES[o.status].label}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <button className="font-mono text-[11px] uppercase tracking-widest2 text-saffron/85 hover:text-saffron">
                      Advance →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
