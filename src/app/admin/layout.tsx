import Link from "next/link";
import {
  LayoutDashboard,
  Utensils,
  Repeat,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const metadata = {
  title: "Admin · Ms Bawarchi",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Orders", icon: LayoutDashboard },
  { href: "/admin/menu", label: "Menu", icon: Utensils },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: Repeat },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-charcoal text-cream lg:grid-cols-[260px_1fr]">
      <aside className="border-r border-brass/15 bg-night/60 backdrop-blur-xl">
        <div className="sticky top-0 flex h-full max-h-screen flex-col">
          <div className="border-b border-brass/15 px-6 py-6">
            <Logo size={32} />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest2 text-cream/45">
              Admin · Andheri kitchen
            </p>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-5">
            <ul className="space-y-1">
              {NAV.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm text-cream/70 transition hover:bg-night/70 hover:text-cream"
                  >
                    <Icon size={16} strokeWidth={1.6} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-brass/15 px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-cream/45">
              Signed in as
            </p>
            <p className="font-body text-sm text-cream">kitchen@msbawarchi.in</p>
            <Link
              href="/"
              className="mt-3 inline-flex font-mono text-[11px] uppercase tracking-widest2 text-saffron/80 hover:text-saffron"
            >
              ← Back to site
            </Link>
          </div>
        </div>
      </aside>
      <main className="px-6 py-8 md:px-10">{children}</main>
    </div>
  );
}
