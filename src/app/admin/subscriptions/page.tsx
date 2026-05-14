import { AdminHeader, StatTile } from "@/components/admin/AdminHeader";
import { formatINR } from "@/lib/utils";

const SUBS = [
  {
    name: "Priya Mehta",
    plan: "Monthly",
    nextBill: "May 27",
    zone: "Andheri W",
    mrr: 3499,
    state: "active",
  },
  {
    name: "Aman Gulati",
    plan: "Weekly",
    nextBill: "May 19",
    zone: "Lokhandwala",
    mrr: 999 * 4,
    state: "active",
  },
  {
    name: "Riya K.",
    plan: "Weekly",
    nextBill: "May 20",
    zone: "Versova",
    mrr: 999 * 4,
    state: "paused",
  },
  {
    name: "Saurabh D.",
    plan: "Monthly",
    nextBill: "Jun 02",
    zone: "Jogeshwari",
    mrr: 3499,
    state: "active",
  },
  {
    name: "Tanvi Shah",
    plan: "Weekly",
    nextBill: "May 21",
    zone: "Oshiwara",
    mrr: 999 * 4,
    state: "active",
  },
];

export default function AdminSubscriptionsPage() {
  const totalMrr = SUBS.filter((s) => s.state === "active").reduce(
    (sum, s) => sum + s.mrr,
    0,
  );
  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Recurring revenue"
        title="Subscriptions"
        description="Manage tiffin subscribers — pause, refund, swap plans, and watch churn."
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatTile label="Active subscribers" value="48" hint="+6 this week" />
        <StatTile label="MRR" value={formatINR(totalMrr)} />
        <StatTile label="Avg tenure" value="7.4 wks" />
        <StatTile label="Churn (30d)" value="3.1%" hint="vs 4.8% last 30" />
      </section>

      <section className="glass rounded-3xl p-6 brass-edge">
        <h2 className="font-display text-xl text-cream">All subscribers</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-brass/15 text-left font-mono text-[10px] uppercase tracking-widest2 text-cream/55">
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Plan</th>
                <th className="py-3 pr-4">Next bill</th>
                <th className="py-3 pr-4">Zone</th>
                <th className="py-3 pr-4">Monthly value</th>
                <th className="py-3 pr-4">State</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody className="font-body text-cream/80">
              {SUBS.map((s) => (
                <tr
                  key={s.name}
                  className="border-b border-brass/10 last:border-0 hover:bg-night/30"
                >
                  <td className="py-3.5 pr-4 text-cream">{s.name}</td>
                  <td className="py-3.5 pr-4">{s.plan}</td>
                  <td className="py-3.5 pr-4 font-mono text-[12px] text-cream/65">
                    {s.nextBill}
                  </td>
                  <td className="py-3.5 pr-4 text-cream/65">{s.zone}</td>
                  <td className="py-3.5 pr-4 font-mono text-cream">
                    {formatINR(s.mrr)}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={
                        s.state === "active"
                          ? "inline-flex items-center gap-1.5 rounded-full border border-coriander/40 bg-coriander/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2 text-coriander"
                          : "inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2 text-cream/65"
                      }
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {s.state}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-right font-mono text-[11px] uppercase tracking-widest2">
                    <button className="text-saffron/85 hover:text-saffron">
                      Manage
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
