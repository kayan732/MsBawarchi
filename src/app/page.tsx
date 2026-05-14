import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MenuCarousel } from "@/components/sections/MenuCarousel";
import { Subscription } from "@/components/sections/Subscription";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <HowItWorks />
      <MenuCarousel />
      <Subscription />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
