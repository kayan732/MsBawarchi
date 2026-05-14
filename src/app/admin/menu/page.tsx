"use client";

import { useState } from "react";
import { AdminHeader, StatTile } from "@/components/admin/AdminHeader";
import { MENU, CATEGORIES, type MenuCategoryId } from "@/lib/menu";
import { formatINR, cn } from "@/lib/utils";
import { Plus, Search } from "lucide-react";

export default function AdminMenuPage() {
  const [cat, setCat] = useState<MenuCategoryId | "all">("all");
  const [q, setQ] = useState("");

  const filtered = MENU.filter(
    (m) =>
      (cat === "all" || m.category === cat) &&
      m.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Today's pantry"
        title="Menu manager"
        description="Mark items sold-out, schedule seasonal dishes, edit pricing and dietary tags."
        actions={
          <button className="btn-primary">
            <Plus size={14} /> New item
          </button>
        }
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatTile label="Total items" value={MENU.length.toString()} />
        <StatTile
          label="Available today"
          value={(MENU.length - 3).toString()}
          hint="3 sold out"
        />
        <StatTile label="Most ordered" value="Full Tiffin" />
        <StatTile
          label="Avg price"
          value={formatINR(
            Math.round(MENU.reduce((s, m) => s + m.price, 0) / MENU.length),
          )}
        />
      </section>

      <section className="glass rounded-3xl p-6 brass-edge">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <label className="relative flex-1 min-w-[220px]">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes…"
              className="w-full rounded-full border border-brass/25 bg-night/40 py-2.5 pl-10 pr-4 font-body text-sm text-cream placeholder:text-cream/35 focus:border-saffron/70 focus:outline-none"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <CatBtn id="all" active={cat === "all"} onClick={() => setCat("all")}>
              All
            </CatBtn>
            {CATEGORIES.map((c) => (
              <CatBtn
                key={c.id}
                id={c.id}
                active={cat === c.id}
                onClick={() => setCat(c.id)}
              >
                {c.label}
              </CatBtn>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-brass/15 text-left font-mono text-[10px] uppercase tracking-widest2 text-cream/55">
                <th className="py-3 pr-4">Dish</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Type</th>
                <th className="py-3 pr-4">Price</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody className="font-body text-cream/80">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-brass/10 last:border-0 hover:bg-night/30"
                >
                  <td className="py-3.5 pr-4 text-cream">{item.name}</td>
                  <td className="py-3.5 pr-4 font-mono text-[12px] text-cream/65">
                    {CATEGORIES.find((c) => c.id === item.category)?.label}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span
                      className="veg-dot"
                      data-veg={item.veg ? "true" : "false"}
                    />
                  </td>
                  <td className="py-3.5 pr-4 font-mono text-cream">
                    {formatINR(item.price)}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-coriander/40 bg-coriander/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2 text-coriander">
                      <span className="h-1.5 w-1.5 rounded-full bg-coriander" />
                      Available
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-right">
                    <button className="font-mono text-[11px] uppercase tracking-widest2 text-saffron/85 hover:text-saffron">
                      Edit
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

function CatBtn({
  active,
  onClick,
  children,
}: {
  id: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest2 transition",
        active
          ? "border-saffron/70 bg-night/60 text-cream"
          : "border-brass/25 bg-night/30 text-cream/55 hover:border-brass/55",
      )}
    >
      {children}
    </button>
  );
}
