import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ms-brass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD27A" />
            <stop offset="50%" stopColor="#E8A33D" />
            <stop offset="100%" stopColor="#8B6420" />
          </linearGradient>
        </defs>
        {/* handi body */}
        <path
          d="M10 22c0-2 2-4 4-4h20c2 0 4 2 4 4v4c0 6-5 12-14 12s-14-6-14-12v-4Z"
          fill="url(#ms-brass)"
        />
        {/* rim */}
        <rect
          x="8"
          y="18"
          width="32"
          height="3"
          rx="1.5"
          fill="url(#ms-brass)"
        />
        {/* steam */}
        <path
          d="M20 12c0-3 2-4 2-7M28 12c0-2 2-3 2-6"
          stroke="#F5EDD9"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
      <span className="font-display text-[1.05rem] tracking-wide leading-none">
        <span className="text-cream">Ms</span>{" "}
        <span className="text-saffron-gradient">Bawarchi</span>
      </span>
    </span>
  );
}
