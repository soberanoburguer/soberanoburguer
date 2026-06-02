"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { UNIDADES, UnidadeInfo } from "@/lib/unidades";

const NAV_LINKS = [
  { name: "Início", href: "#home" },
  { name: "Nossa História", href: "#history" },
  { name: "Cardápio", href: "#menu" },
  { name: "Localização", href: "#location" },
];

interface NavbarProps {
  unidade: UnidadeInfo;
}

export default function Navbar({ unidade }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getThreshold = () =>
      window.matchMedia("(min-width: 768px)").matches
        ? window.innerHeight * 3
        : 60;

    let threshold = getThreshold();

    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    const handleResize = () => { threshold = getThreshold(); };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Fechar dropdown ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectUnit = (slug: string) => {
    localStorage.setItem("soberano-unidade", slug);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4",
        isScrolled 
          ? "bg-brand-gray/80 backdrop-blur-lg py-3 border-b border-white/5"
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

        {/* Desktop Links & Unit Selector */}
        <div className="hidden md:flex items-center gap-6">
          {/* Seletor de Unidade */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-amber/30 text-white/90 text-xs font-semibold hover:text-white transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-amber" />
              <span>{unidade.cidade}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 opacity-60 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 rounded-xl bg-brand-gray border border-white/10 p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                <span className="block px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-white/40">
                  Mudar de unidade
                </span>
                {Object.values(UNIDADES).map((unit) => (
                  <Link
                    key={unit.id}
                    href={`/${unit.slug}`}
                    onClick={() => handleSelectUnit(unit.slug)}
                    className={cn(
                      "flex flex-col px-3 py-2 rounded-lg text-left text-xs transition-colors hover:bg-white/5",
                      unit.id === unidade.id ? "text-brand-amber bg-white/[0.02]" : "text-white/70"
                    )}
                  >
                    <span className="font-bold">{unit.cidade}</span>
                    <span className="text-[10px] text-white/40">{unit.bairro}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 border-l border-white/10 pl-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-bold text-foreground/80 hover:text-brand-amber transition-colors uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <a 
            href={unidade.whatsappLink} 
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg bg-soberano-gradient text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="mr-2 h-3.5 w-3.5" />
            Pedir Agora
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {/* Seletor Mobile Rápido */}
          <div className="relative">
            <Link
              href="/"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/90 text-[10px] font-bold uppercase tracking-wider"
            >
              <MapPin className="w-3 h-3 text-brand-amber" />
              <span>{unidade.sigla}</span>
            </Link>
          </div>

          <button
            className="text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-gray border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2 pb-4 border-b border-white/5">
            <span className="text-[9px] font-black uppercase tracking-wider text-white/40">
              Selecione a Filial:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(UNIDADES).map((unit) => (
                <Link
                  key={unit.id}
                  href={`/${unit.slug}`}
                  onClick={() => handleSelectUnit(unit.slug)}
                  className={cn(
                    "flex flex-col p-2.5 rounded-xl border text-center text-xs",
                    unit.id === unidade.id
                      ? "border-brand-amber/30 bg-brand-amber/5 text-brand-amber"
                      : "border-white/5 bg-white/[0.02] text-white/70"
                  )}
                >
                  <span className="font-bold">{unit.cidade}</span>
                  <span className="text-[9px] text-white/40">{unit.bairro}</span>
                </Link>
              ))}
            </div>
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-bold uppercase tracking-widest text-white/80 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href={unidade.whatsappLink} 
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg bg-soberano-gradient text-white text-base font-bold w-full py-4 uppercase tracking-wider mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pedir Agora
          </a>
        </div>
      )}
    </nav>
  );
}
