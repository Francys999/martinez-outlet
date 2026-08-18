import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Catalog from "@/components/Catalog";
import Benefits from "@/components/Benefits";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import WhatsAppFab from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Catalog />
        <Benefits />
        <About />
        <Contact />
      </main>
      <Footer />
      <Cart />
      <WhatsAppFab />
    </>
  );
}
