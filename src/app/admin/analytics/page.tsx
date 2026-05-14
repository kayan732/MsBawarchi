"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AdminHeader, StatTile } from "@/components/admin/AdminHeader";
import { formatINR } from "@/lib/utils";

const REVENUE = [
  { day: "Mon", value: 14200 },
  { day: "Tue", value: 16880 },
  { day: "Wed", value: 13990 },
  { day: "Thu", value: 18420 },
  { day: "Fri", value: 21200 },
  { day: "Sat", value: 24800 },
  { day: "Sun", value: 11240 },
];

const TOP_ITEMS = [
  { name: "Full Tiffin", count: 162 },
  { name: "Dal Makhani", count: 124 },
  { name: "Aloo Paratha", count: 102 },
  { name: "Bhurji Pav", count: 87 },
  { name: "Suji Halwa", count: 71 },
  { name: "Ghar ka Murgh", count: 58 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="The kitchen pulse"
        title="Analytics"
        description="Revenue, retention, and the dishes that pay the rent."
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatTile
          label="Revenue · 7d"
          value={formatINR(120730)}
          hint="+18% vs prior"
        />
        <StatTile label="Orders · 7d" value="284" />
        <StatTile label="AOV" value={formatINR(425)} />
        <StatTile label="Retention · 30d" value="62%" />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="glass rounded-3xl p-6 brass-edge md:col-span-2">
          <h2 className="font-display text-xl text-cream">Daily revenue</h2>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
            Last 7 days · INR
          </p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E8A33D" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#E8A33D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(212,162,74,0.12)" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#F5EDD9"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#F5EDD9"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={64}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  cursor={{ stroke: "#E8A33D", strokeWidth: 1, opacity: 0.3 }}
                  contentStyle={{
                    background: "#0A0A0A",
                    border: "1px solid rgba(212,162,74,0.4)",
                    borderRadius: 12,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                  }}
                  formatter={(value: number) => [formatINR(value), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#E8A33D"
                  strokeWidth={2}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 brass-edge">
          <h2 className="font-display text-xl text-cream">Top dishes</h2>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
            By order count · 7d
          </p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_ITEMS} layout="vertical">
                <CartesianGrid stroke="rgba(212,162,74,0.12)" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#F5EDD9"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#F5EDD9"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={110}
                />
                <Tooltip
                  cursor={{ fill: "rgba(232,163,61,0.08)" }}
                  contentStyle={{
                    background: "#0A0A0A",
                    border: "1px solid rgba(212,162,74,0.4)",
                    borderRadius: 12,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" fill="#E8A33D" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
