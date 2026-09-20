import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="overflow-x-clip">
        <Hero />
        {/* The hero footage is fixed to the viewport; this opaque layer slides up over it */}
        <div className="relative z-10 bg-background">
          {/* Same fade as the bottom of the hero scrim, carried on the layer's top edge */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full h-[28vh] bg-linear-to-t from-background to-transparent" />
          <Expertise />
          <About />
          <Projects />
          <Testimonials />
          <CTA />
          <Footer />
        </div>
      </main>
    </>
  );
}
