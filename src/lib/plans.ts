export type Plan = {
  id: "daily" | "weekly" | "monthly";
  name: string;
  tagline: string;
  price: number;
  cadence: string;
  saves?: string;
  popular?: boolean;
  perks: string[];
  cta: string;
};

export const PLANS: Plan[] = [
  {
    id: "daily",
    name: "Daily Delight",
    tagline: "Pay per meal · zero commitment.",
    price: 179,
    cadence: "/meal",
    perks: [
      "Choose anytime, order by 10 AM",
      "Single tiffin per order",
      "Free delivery in Andheri zone",
    ],
    cta: "Order a Tiffin",
  },
  {
    id: "weekly",
    name: "Weekly Comfort",
    tagline: "Six tiffins, Mon–Sat. Skip days anytime.",
    price: 999,
    cadence: "/week",
    saves: "Save ₹254",
    popular: true,
    perks: [
      "6 tiffins delivered Mon–Sat",
      "Personalised weekly menu preview",
      "Skip days anytime",
      "Free delivery",
      "Priority kitchen slot",
    ],
    cta: "Subscribe Weekly",
  },
  {
    id: "monthly",
    name: "Monthly Ghar Ka Khaana",
    tagline: "Four weeks of dinner solved.",
    price: 3499,
    cadence: "/month",
    saves: "Save ₹1,200",
    perks: [
      "26 tiffins (Mon–Sat × 4 weeks)",
      "Dedicated WhatsApp concierge",
      "1 free dessert per week",
      "Birthday meal on us",
      "Free delivery across all zones",
      "First access to seasonal menus",
    ],
    cta: "Subscribe Monthly",
  },
];
