import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import History from "@/components/sections/History";
import MenuHighlights from "@/components/sections/MenuHighlights";
import Reviews from "@/components/sections/Reviews";
import Atmosphere from "@/components/sections/Atmosphere";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="menu">
        <MenuHighlights />
      </div>
      <Reviews />
      <div id="location">
        <Atmosphere />
      </div>
      <div id="history">
        <History />
      </div>
      <Footer />
    </main>
  );
}
