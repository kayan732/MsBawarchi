import { AdminHeader, StatTile } from "@/components/admin/AdminHeader";
import { formatINR } from "@/lib/utils";

const CUSTOMERS = [
  {
    name: "Priya Mehta",
    phone: "+91 98XXXXXX12",
    orders: 42,
    ltv: 8420,
    favorite: "Dal Makhani",
    tag: "VIP",
  },
  {
    name: "Aman Gulati",
    phone: "+91 98XXXXXX34",
    orders: 28,
    ltv: 5236,
    favorite: "Full Tiffin",
    tag: "Subscriber",
  },
  {
    name: "Riya K.",
    phone: "+91 98XXXXXX56",
    orders: 19,
    ltv: 4112,
    favorite: "Cream Chicken",
    tag: "Subscriber",
  },
  {
    name: "Saurabh D.",
    phone: "+91 98XXXXXX78",
    orders: 14,
    ltv: 2680,
    favorite: "Kadhi Chawal",
    tag: "New",
  },
  {
    name: "Tanvi Shah",
    phone: "+91 98XXXXXX90",
    orders: 6,
    ltv: 1840,
    favorite: "Aloo Paratha",
    tag: "At-risk",
  },
];

const TAG_STYLES: Record<string, string> = {
  VIP: "border-saffron/55 bg-saffron/15 text-saffron",
  Subscriber: "border-rim-teal/45 bg-rim-teal/15 text-rim-teal",
  New: "border-coriander/40 bg-coriander/15 text-coriander",
  "At-risk": "border-terracotta/45 bg-terracotta/15 text-terracotta",
};

export default function AdminCustomersPage() {
  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Database"
        title="Customers"
        description="Every Bawarchi household. Tag, segment and broadcast — all from here."
        actions={<button className="btn-primary">Broadcast on WhatsApp</button>}
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatTile label="Total customers" value="312" />
        <StatTile label="VIPs" value="24" hint="LTV > ₹6,000" />
        <StatTile label="At-risk" value="9" hint="No order in 21d" />
        <StatTile label="Repeat rate" value="68%" />
      </section>

      <section className="glass rounded-3xl p-6 brass-edge">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-brass/15 text-left font-mono text-[10px] uppercase tracking-widest2 text-cream/55">
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Phone</th>
                <th className="py-3 pr-4">Orders</th>
                <th className="py-3 pr-4">LTV</th>
                <th className="py-3 pr-4">Favourite</th>
                <th className="py-3 pr-4">Tag</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody className="font-body text-cream/80">
              {CUSTOMERS.map((c) => (
                <tr
                  key={c.name}
                  className="border-b border-brass/10 last:border-0 hover:bg-night/30"
                >
                  <td className="py-3.5 pr-4 text-cream">{c.name}</td>
                  <td className="py-3.5 pr-4 font-mono text-[12px] text-cream/65">
                    {c.phone}
                  </td>
                  <td className="py-3.5 pr-4 font-mono">{c.orders}</td>
                  <td className="py-3.5 pr-4 font-mono text-cream">
                    {formatINR(c.ltv)}
                  </td>
                  <td className="py-3.5 pr-4 text-cream/65">{c.favorite}</td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2 ${TAG_STYLES[c.tag]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {c.tag}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-right font-mono text-[11px] uppercase tracking-widest2">
                    <button className="text-saffron/85 hover:text-saffron">
                      View →
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
