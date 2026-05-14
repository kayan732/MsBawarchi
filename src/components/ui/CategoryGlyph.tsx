import type { MenuCategory } from "@/lib/menu";

/**
 * Custom 3D-styled glyphs for each menu category. Rendered as SVG with
 * a brass-gradient fill so the category tab feels like an icon you'd
 * find on a vintage menu plate.
 */
export function CategoryGlyph({
  kind,
  size = 36,
}: {
  kind: MenuCategory["glyph"];
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`gly-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD27A" />
          <stop offset="55%" stopColor="#E8A33D" />
          <stop offset="100%" stopColor="#8B6420" />
        </linearGradient>
      </defs>
      <g stroke={`url(#gly-${kind})`} strokeWidth="1.4" fill="none">
        {renderGlyph(kind)}
      </g>
    </svg>
  );
}

function renderGlyph(kind: MenuCategory["glyph"]) {
  switch (kind) {
    case "tiffin":
      return (
        <>
          <rect x="14" y="10" width="20" height="8" rx="2" />
          <rect x="14" y="20" width="20" height="8" rx="2" />
          <rect x="14" y="30" width="20" height="8" rx="2" />
          <path d="M14 14h-3a2 2 0 0 0 0 4h3M34 14h3a2 2 0 0 1 0 4h-3" />
          <path d="M24 6v4" />
        </>
      );
    case "thali":
      return (
        <>
          <ellipse cx="24" cy="30" rx="16" ry="5" />
          <path d="M8 30c0-8 7-14 16-14s16 6 16 14" />
          <circle cx="18" cy="24" r="2" />
          <circle cx="30" cy="24" r="2" />
          <path d="M21 32c1 2 4 2 6 0" />
        </>
      );
    case "rolling-pin":
      return (
        <>
          <rect x="8" y="22" width="32" height="6" rx="3" />
          <line x1="6" y1="25" x2="2" y2="25" />
          <line x1="42" y1="25" x2="46" y2="25" />
          <circle cx="36" cy="14" r="3" />
          <circle cx="40" cy="18" r="2" />
          <circle cx="32" cy="11" r="2" />
        </>
      );
    case "sandwich":
      return (
        <>
          <path d="M8 30 L24 14 L40 30 Z" />
          <line x1="14" y1="26" x2="34" y2="26" />
          <line x1="20" y1="22" x2="28" y2="22" />
          <path d="M30 8c0 0-1 4 1 4M34 6c0 0-1 4 1 4" />
        </>
      );
    case "soup":
      return (
        <>
          <ellipse cx="24" cy="30" rx="14" ry="3" />
          <path d="M10 30c2 5 7 8 14 8s12-3 14-8" />
          <path d="M18 18c-2-3 2-5 0-8M24 18c-2-3 2-5 0-8M30 18c-2-3 2-5 0-8" />
        </>
      );
    case "mug":
      return (
        <>
          <path d="M14 14h18v18a6 6 0 0 1-6 6h-6a6 6 0 0 1-6-6Z" />
          <path d="M32 18h4a4 4 0 0 1 0 8h-4" />
          <line x1="18" y1="10" x2="18" y2="6" />
          <line x1="24" y1="10" x2="24" y2="6" />
        </>
      );
    case "egg":
      return (
        <>
          <path d="M24 8c8 0 14 10 14 18s-6 14-14 14-14-6-14-14S16 8 24 8Z" />
          <path d="M14 28c4-2 6 2 10 0s6-2 10 0" />
        </>
      );
    case "chicken":
      return (
        <>
          <path d="M16 32c-4 0-8-4-8-8a8 8 0 0 1 8-8c2 0 4 1 5 3l3-5 3 5c1-2 3-3 5-3a8 8 0 0 1 8 8c0 4-4 8-8 8Z" />
          <line x1="16" y1="32" x2="16" y2="40" />
          <line x1="32" y1="32" x2="32" y2="40" />
          <circle cx="20" cy="22" r="1" fill="#FFD27A" />
          <ellipse cx="24" cy="10" rx="3" ry="2" />
        </>
      );
    case "halwa":
      return (
        <>
          <ellipse cx="24" cy="30" rx="14" ry="4" />
          <path d="M10 30c0-4 6-8 14-8s14 4 14 8" />
          <path d="M16 24c2-2 6-4 8-4M28 22c2 0 4 1 6 3" />
          <circle cx="20" cy="20" r="1" />
          <circle cx="28" cy="18" r="1" />
        </>
      );
  }
}
