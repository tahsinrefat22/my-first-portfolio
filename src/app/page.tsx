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
      <div className="bg-zinc-50 font-sans dark:bg-black w-full overflow-x-hidden">
        <Hero />
        <Expertise />
        <About />
        <Projects />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
