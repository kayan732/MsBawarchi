import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="text-center">
        <Logo size={56} />
        <h1 className="mt-10 font-display text-balance text-5xl font-light leading-tight text-cream md:text-7xl">
          That page slipped out of
          <span className="italic text-saffron-gradient"> the tiffin.</span>
        </h1>
        <p className="mt-5 font-body text-cream/55">
          Either the link is old, or the kitchen retired it. The rest of
          today&apos;s menu is still warm.
        </p>
        <Link href="/" className="btn-primary mt-10">
          Back to the menu
        </Link>
      </div>
    </div>
  );
}
