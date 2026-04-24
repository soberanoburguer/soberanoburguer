"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Início", href: "#home" },
  { name: "Nossa História", href: "#history" },
  { name: "Cardápio", href: "#menu" },
  { name: "Localização", href: "#location" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Desktop: Hero tem 300vh — só opaca após sair do vídeo
    // Mobile: Hero tem 100vh — threshold pequeno
    const getThreshold = () =>
      window.matchMedia("(min-width: 768px)").matches
        ? window.innerHeight * 3
        : 60;

    let threshold = getThreshold();

    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    const handleResize = () => { threshold = getThreshold(); };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4",
        isScrolled 
          ? "bg-brand-gray/80 backdrop-blur-lg py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="relative h-10 w-40 sm:h-12 sm:w-48 transition-transform hover:scale-105">
          <Image
            src="/brand/wordmark+logo.svg"
            alt="Soberano Burguer"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-brand-amber transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="https://wa.me/5583986256727" 
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg bg-soberano-gradient text-white text-sm font-bold px-4 py-2 hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Pedir Agora
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-gray border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top duration-300">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="https://wa.me/5583986256727" 
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg bg-soberano-gradient text-white text-lg font-bold w-full py-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pedir Agora
          </Link>
        </div>
      )}
    </nav>
  );
}
