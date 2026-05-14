# Ms Bawarchi

> _Ghar Jaisa Swaad, Har Bite Mein._
>
> Mumbai's premium homestyle tiffin & classic Indian cuisine, delivered on
> pre-order — built as a production-grade 3D website with a full admin
> dashboard.

This is a Next.js 15 codebase that pairs cinematic React Three Fiber
3D with a real ordering / subscription stack: Supabase for data and
auth, Razorpay for India-native payments, Resend / MSG91 for
notifications, Cloudinary for assets, and Upstash Redis for sessions.

---

## Stack

| Layer              | Tech                                                                       |
| ------------------ | -------------------------------------------------------------------------- |
| Framework          | Next.js 15 (App Router) · React 19 · TypeScript                            |
| 3D & motion        | React Three Fiber · Drei · Three.js · GSAP · Framer Motion · Lenis         |
| Styling            | Tailwind CSS · custom design tokens · Fraunces / Inter / JetBrains Mono    |
| State              | Zustand (persisted cart)                                                   |
| Data               | Supabase Postgres (`supabase/schema.sql`)                                  |
| Payments           | Razorpay one-time + subscriptions                                          |
| Notifications      | Resend (email) · MSG91 / Twilio (SMS) · WhatsApp Business                  |
| Assets             | Cloudinary                                                                 |
| Sessions / limits  | Upstash Redis                                                              |
| Hosting            | Vercel (frontend) · Supabase (DB) · Cloudflare (CDN)                       |

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in keys as you wire each service
pnpm dev                     # http://localhost:3000
```

Other scripts:

```bash
pnpm build       # production build (currently passes with 16 routes generated)
pnpm typecheck   # strict TypeScript
pnpm start       # serve the production build
pnpm lint        # next lint
```

## Project structure

```
src/
├── app/                       # Next.js App Router
│   ├── page.tsx               # marketing home (hero → menu → subscribe → …)
│   ├── checkout/              # 3-step Address → Time → Pay flow
│   ├── orders/[id]/           # real-time order tracking page
│   ├── admin/                 # protected admin dashboard
│   │   ├── page.tsx           #   live order feed
│   │   ├── menu/              #   menu manager (CRUD scaffolding)
│   │   ├── subscriptions/     #   subscriber roster
│   │   ├── customers/         #   customer DB with tags
│   │   ├── analytics/         #   recharts dashboards
│   │   └── settings/          #   zones, slots, hours, notifications
│   ├── api/
│   │   ├── orders/            #   create / list orders
│   │   ├── razorpay/          #   create Razorpay payment order
│   │   └── webhook/razorpay/  #   payment-confirmation webhook
│   ├── sitemap.ts · robots.ts # SEO basics
│   ├── globals.css            # design tokens, glass, brass-edge, god-rays
│   └── layout.tsx             # root layout, fonts, providers, navbar, cart
├── components/
│   ├── 3d/                    # BrassHandi · Spices · GodRays · HeroScene
│   ├── sections/              # Hero · Story · HowItWorks · MenuCarousel
│   │                          # Subscription · WhyUs · Testimonials · FAQ · Footer
│   ├── ui/                    # Navbar · CartDrawer · MenuCard · CategoryGlyph · …
│   ├── admin/                 # AdminHeader · StatTile
│   └── providers/             # SmoothScrollProvider (Lenis) · CartProvider
├── lib/
│   ├── menu.ts                # 60+ items, 9 categories — source of truth
│   ├── plans.ts               # Daily / Weekly / Monthly subscription tiers
│   ├── cart.ts                # Zustand persisted store + helpers
│   ├── supabase.ts            # browser / server / service-role clients
│   ├── razorpay.ts            # order creation + webhook signature check
│   └── utils.ts               # cn() · formatINR() · slugify()
└── …
supabase/
└── schema.sql                 # full DB schema with RLS policies
```

## The 3D hero

The brass handi in the hero is a procedural `LatheGeometry` profile,
post-processed with a radial-ripple displacement that gives it the
hand-hammered patina described in the brief. Ingredients orbit at a
mix of radii, speeds, and tilts; the parent group lerps toward the
mouse pointer for the requested parallax. God-rays are a stack of
additive cones (warm amber from upper-right, cool teal from lower-left)
— cheap and convincing without the EffectComposer pipeline.

Tone-mapping is set to `ACESFilmicToneMapping` on the renderer to keep
the brass reflections in the cinematic warm range. The whole scene is
loaded with `next/dynamic` and `ssr: false`, so the page is fully
crawlable and serves a graceful fallback before the WebGL canvas mounts.

`prefers-reduced-motion` is respected at the CSS layer (and in Lenis).

## Menu data

The single source of truth lives in
[`src/lib/menu.ts`](src/lib/menu.ts) — 56 dishes across 9 categories,
each tagged with veg/non-veg, optional spice level, an accent tone, and
a popularity flag. The admin "Menu" view and the public carousel both
read from the same array; in production they'll read from the
`menu_items` Supabase table (schema mirrors the TypeScript shape).

## Cart and checkout

- The cart is a Zustand store persisted in `localStorage` under the
  key `msbawarchi-cart`. Add-to-cart from anywhere opens the slide-in
  cart drawer with a soft motion.
- `/checkout` is a 3-step flow: **Address → Time → Pay**. The "Pay"
  step posts to `/api/orders`, which (in production) creates a
  Razorpay order via `/api/razorpay` and returns the `razorpay_order_id`
  for the Checkout modal. On successful payment, the webhook at
  `/api/webhook/razorpay` flips the order to `paid`.
- After submit, the user lands on `/orders/[id]` — a tracker that
  walks through the five statuses (`received → cooking → packed →
  delivering → delivered`) and, in production, listens to Supabase
  Realtime for status updates.

## Admin dashboard

Mounted at `/admin`. The shell uses a sidebar layout with six pages —
Orders, Menu, Subscriptions, Customers, Analytics, Settings. In
production it should be gated by Supabase Auth and an `ADMIN_EMAILS`
allowlist (see `.env.example`); a middleware checking
`session.user.email ∈ ADMIN_EMAILS` is the simplest first cut.

Analytics charts use Recharts with the brass-and-cream palette.

## Backend wiring

The API routes are deliberately thin and idempotent. To go live:

1. Create the Supabase project and run `supabase/schema.sql`.
2. Fill in `.env.local` from `.env.example`.
3. In `src/app/api/orders/route.ts`, uncomment the
   `supabase.from("orders").insert(...)` block.
4. From the browser, after `POST /api/orders` succeeds, call
   `POST /api/razorpay` with the total in paise and open the Checkout
   script with the returned `id` as `order_id`.
5. Point Razorpay's webhook at `/api/webhook/razorpay` and set
   `RAZORPAY_WEBHOOK_SECRET`.

## Brand tokens

```
--saffron-gold: #E8A33D
--brass:        #B8862F
--terracotta:   #C84B31
--maroon:       #7A2E2E
--cream:        #F5EDD9
--ivory:        #F8F1E4
--coriander:    #4A7C3A
--charcoal:     #2C2620
--night:        #0A0A0A
--god-ray:      #FFB347
--rim-teal:     #2B5F75

--ease-cinematic:  cubic-bezier(0.65, 0, 0.35, 1)
--duration-slow:   1.2s
--duration-medium: 0.6s
--duration-fast:   0.25s
```

Typography: **Fraunces** for display, **Inter** for body,
**JetBrains Mono** for prices and data. All loaded via `next/font/google`,
zero layout shift.

## Performance notes

- The 3D scene is code-split and lazy-loaded, so the marketing copy
  paints before the WebGL initialises.
- Tone-mapping is ACES with exposure 1.15; DPR is capped at 1.8 for
  laptop battery and mobile.
- All section-level data is static — only `/api/*` and `/orders/[id]`
  are dynamic.
- Build output: 16 routes, ~99 kB shared first-load JS; home is 177 kB
  first-load (incl. dynamic Three import).

## Deployment

The frontend is designed for Vercel — Edge runtime is fine for the
marketing pages; `/api/orders`, `/api/razorpay`, and the webhook
need the Node runtime (default). Don't forget to set the env vars
listed in `.env.example` in the Vercel project settings.

## License

Proprietary © Ms Bawarchi. All rights reserved.
