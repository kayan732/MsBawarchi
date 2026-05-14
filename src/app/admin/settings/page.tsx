import { AdminHeader } from "@/components/admin/AdminHeader";

const ZONES = [
  { name: "Andheri West", fee: 0, eta: "20 min" },
  { name: "Lokhandwala", fee: 0, eta: "25 min" },
  { name: "Versova", fee: 29, eta: "30 min" },
  { name: "Oshiwara", fee: 29, eta: "30 min" },
  { name: "Jogeshwari", fee: 49, eta: "40 min" },
];

const SLOTS = [
  { label: "Lunch · 12 – 1 PM", capacity: 60, booked: 42 },
  { label: "Lunch · 1 – 2 PM", capacity: 60, booked: 31 },
  { label: "Dinner · 7 – 8 PM", capacity: 80, booked: 58 },
  { label: "Dinner · 8 – 9 PM", capacity: 80, booked: 36 },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Operations"
        title="Settings"
        description="Delivery zones, time slots, hours of operation, and notification templates."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass rounded-3xl p-6 brass-edge">
          <h2 className="font-display text-xl text-cream">Delivery zones</h2>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
            Where we ship · what we charge
          </p>
          <ul className="mt-5 divide-y divide-brass/15 border-y border-brass/15">
            {ZONES.map((z) => (
              <li
                key={z.name}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div>
                  <p className="text-cream">{z.name}</p>
                  <p className="font-mono text-[11px] text-cream/45">{z.eta}</p>
                </div>
                <p className="font-mono text-cream">
                  {z.fee === 0 ? "Free" : `₹${z.fee}`}
                </p>
              </li>
            ))}
          </ul>
          <button className="btn-ghost mt-5">Edit zones</button>
        </section>

        <section className="glass rounded-3xl p-6 brass-edge">
          <h2 className="font-display text-xl text-cream">Slot capacity</h2>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
            How many tiffins per window
          </p>
          <ul className="mt-5 space-y-4">
            {SLOTS.map((s) => {
              const pct = Math.round((s.booked / s.capacity) * 100);
              return (
                <li key={s.label}>
                  <div className="flex items-center justify-between font-mono text-[12px] text-cream/75">
                    <span>{s.label}</span>
                    <span>
                      {s.booked} / {s.capacity}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-night/50">
                    <div
                      className="h-full rounded-full bg-saffron-gradient"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <button className="btn-ghost mt-5">Edit slots</button>
        </section>

        <section className="glass rounded-3xl p-6 brass-edge">
          <h2 className="font-display text-xl text-cream">Hours of operation</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-sm">
            {[
              ["Mon – Fri", "11 AM – 10 PM"],
              ["Sat", "11 AM – 11 PM"],
              ["Sun", "12 PM – 9 PM"],
              ["Holidays", "Closed (Diwali, Holi)"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col rounded-xl bg-night/30 p-3">
                <dt className="text-[11px] uppercase tracking-widest2 text-cream/45">
                  {k}
                </dt>
                <dd className="mt-1 text-cream">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="glass rounded-3xl p-6 brass-edge">
          <h2 className="font-display text-xl text-cream">Notifications</h2>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
            SMS · Email · WhatsApp
          </p>
          <ul className="mt-5 space-y-3 font-body text-sm">
            {[
              "Order received → SMS + email",
              "Cooking started → SMS",
              "Out for delivery → SMS + WhatsApp",
              "Delivered → SMS + 'how was it?' email",
              "Subscription renewal → Email · 24h before",
            ].map((row) => (
              <li
                key={row}
                className="flex items-center justify-between rounded-xl bg-night/30 px-4 py-3 text-cream/80"
              >
                {row}
                <span className="font-mono text-[10px] uppercase tracking-widest2 text-coriander">
                  Active
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
