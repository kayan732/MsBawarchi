-- ─────────────────────────────────────────────────────────────────────
-- Ms Bawarchi · Supabase schema
-- ─────────────────────────────────────────────────────────────────────
-- Run this once against a fresh Supabase project. Row-Level Security
-- is on for every table; policies grant minimal access to the
-- authenticated user and full access to the service role.
-- ─────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- USERS ──────────────────────────────────────────────────────────────
-- Mirrors auth.users with the profile fields we care about.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  birthday date,
  is_admin boolean not null default false,
  dietary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_self_read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_self_update"
  on public.profiles for update
  using (auth.uid() = id);

-- ADDRESSES ──────────────────────────────────────────────────────────
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  label text,
  line_1 text not null,
  line_2 text,
  landmark text,
  zone text not null,
  pincode text,
  lat double precision,
  lng double precision,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.addresses enable row level security;

create policy "addresses_owner_all"
  on public.addresses for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- MENU ───────────────────────────────────────────────────────────────
create table if not exists public.menu_items (
  id text primary key,
  name text not null,
  description text,
  category text not null,
  price_inr integer not null check (price_inr > 0),
  veg boolean not null,
  spicy smallint check (spicy between 0 and 3),
  popular boolean not null default false,
  available boolean not null default true,
  sold_out_until date,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.menu_items enable row level security;

create policy "menu_public_read"
  on public.menu_items for select using (true);

-- ORDERS ─────────────────────────────────────────────────────────────
create type order_status as enum (
  'received',
  'cooking',
  'packed',
  'delivering',
  'delivered',
  'cancelled'
);

create type payment_status as enum (
  'pending',
  'paid',
  'failed',
  'refunded'
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  short_id text not null unique,
  user_id uuid references public.profiles (id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  address jsonb not null,
  slot text not null,
  status order_status not null default 'received',
  payment_status payment_status not null default 'pending',
  payment_method text,
  razorpay_order_id text,
  razorpay_payment_id text,
  subtotal_inr integer not null,
  delivery_fee_inr integer not null default 0,
  total_inr integer not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_idx on public.orders (user_id);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_idx on public.orders (created_at desc);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  menu_item_id text not null,
  name text not null,
  qty integer not null check (qty > 0),
  price_inr integer not null
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "orders_owner_read"
  on public.orders for select using (auth.uid() = user_id);

create policy "order_items_owner_read"
  on public.order_items for select
  using (exists (
    select 1 from public.orders o
    where o.id = order_id and o.user_id = auth.uid()
  ));

-- SUBSCRIPTIONS ──────────────────────────────────────────────────────
create type subscription_plan as enum ('daily', 'weekly', 'monthly');
create type subscription_state as enum ('active', 'paused', 'cancelled');

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  plan subscription_plan not null,
  state subscription_state not null default 'active',
  razorpay_subscription_id text,
  current_period_start date not null,
  current_period_end date not null,
  next_billing_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "subscriptions_owner_all"
  on public.subscriptions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- TIMESTAMPS ─────────────────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

create trigger orders_touch
  before update on public.orders
  for each row execute function public.touch_updated_at();
