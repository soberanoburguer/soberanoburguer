"use client";

import { useState } from "react";
import Image from "next/image";
import { useStoreStatus } from "@/hooks/useStoreStatus";
import Link from "next/link";
import { ArrowUp, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "Início", href: "#home" },
  { label: "Nossa História", href: "#history" },
  { label: "Cardápio", href: "#menu" },
  { label: "Localização", href: "#location" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/soberano_burguer",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F07B0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F07B0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5583986256727",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F07B0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
      </svg>
    ),
  },
];

function AccordionItem({
  number,
  title,
  children,
  defaultOpen = false,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="flex items-center gap-3 text-[11px] font-black tracking-[0.2em] uppercase text-white">
          <span className="text-brand-amber">{number}</span>
          {title}
        </span>
        <span
          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
            open ? "border-brand-amber text-brand-amber rotate-180" : "border-white/10 text-white/40"
          }`}
        >
          <ChevronDown className="w-3 h-3" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const { isOpen, closingTime, openingTime, nextOpenLabel } = useStoreStatus();

  return (
    <footer className="bg-brand-gray border-t border-white/5">

      {/* ── MOBILE FOOTER (variation B) ── */}
      <div className="md:hidden px-6 pt-8 pb-7">

        {/* Hero status card */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-amber/20 bg-gradient-to-br from-brand-amber/8 to-brand-orange/4 p-5 mb-7">
          {/* Glow */}
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-brand-orange/20 blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? "bg-green-400" : "bg-red-400"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? "bg-green-400" : "bg-red-400"}`} />
            </span>
            <span className={`text-[11px] font-black tracking-[0.2em] uppercase ${isOpen ? "text-green-400" : "text-red-400"}`}>
              {isOpen ? "Aberto agora" : "Fechado agora"}
            </span>
          </div>

          <p className="font-black text-white uppercase leading-none" style={{ fontFamily: "var(--font-heading, Teko, Impact, sans-serif)", fontSize: "42px", letterSpacing: "0.01em" }}>
            {isOpen ? (
              <>Hoje até{" "}<span className="text-soberano-gradient">{closingTime}</span></>
            ) : (
              <>Abre {nextOpenLabel} às{" "}<span className="text-soberano-gradient">{openingTime}</span></>
            )}
          </p>

          <p className="text-[13px] text-white/50 mt-3">
            Terça · Tibiri, Santa Rita — PB
          </p>
        </div>

        {/* Accordion sections */}
        <div className="mb-7">
          <AccordionItem number="01" title="Navegação" defaultOpen>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.label} className="border-b border-white/5 last:border-none">
                  <Link
                    href={l.href}
                    className="flex items-center justify-between py-3.5 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {l.label}
                    <span className="text-white/30 text-lg leading-none">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionItem>

          <AccordionItem number="02" title="Funcionamento">
            <ul className="space-y-0">
              <li className="flex justify-between items-center py-2.5 text-[13.5px] font-bold text-white/90">
                <span>Segunda a Domingo</span>
                <span className="tabular-nums">17h30 – 00h</span>
              </li>
            </ul>
          </AccordionItem>

          <AccordionItem number="03" title="Contato">
            <p className="text-[13.5px] text-white/60 leading-relaxed mb-3">
              R. Emb. Milton Cabral, 456<br />
              Tibiri, Santa Rita — PB, 58302-510
            </p>
            <p className="text-[20px] font-black text-white">(83) 98625-6727</p>
          </AccordionItem>

          {/* Bottom border */}
          <div className="border-b border-white/5" />
        </div>

        {/* Brand bottom */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Image src="/brand/wordmark+logo.svg" alt="Soberano Burguer" width={140} height={40} className="opacity-90" />
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-brand-amber hover:text-brand-amber transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[13px] text-white/50 leading-relaxed">
            A verdadeira experiência soberana em Santa Rita. Blends criados com maestria técnica e amor pela brasa.
          </p>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                aria-label={s.label}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="border-t border-white/5 pt-4 flex flex-col items-center gap-2 text-center">
            <p className="text-[10.5px] text-white/30">© 2026 Soberano Burguer · Todos os direitos reservados</p>
            <p className="text-[10px] text-white/30 tracking-[0.04em]">
              Desenvolvido por <span className="text-white/50 font-semibold">Richard G. - Soluções Digitais</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP FOOTER (original 4-col) ── */}
      <div className="hidden md:block px-4 pt-20 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Image src="/brand/wordmark+logo.svg" alt="Soberano Burguer" width={180} height={50} className="mb-6 opacity-90" />
              <p className="text-sm text-foreground/50 leading-relaxed mb-6">
                A verdadeira experiência soberana em Santa Rita. Blends criados com maestria técnica e amor pela brasa.
              </p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" aria-label={s.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navegação */}
            <div>
              <h5 className="font-black uppercase tracking-widest text-sm mb-6 text-brand-amber">Navegação</h5>
              <ul className="space-y-4">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-foreground/60 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Funcionamento */}
            <div>
              <h5 className="font-black uppercase tracking-widest text-sm mb-6 text-brand-amber">Funcionamento</h5>
              <ul className="space-y-4 text-sm text-foreground/60">
                <li className="flex justify-between font-bold text-white/90">
                  <span>Segunda a Domingo</span>
                  <span>17h30 – 00h</span>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h5 className="font-black uppercase tracking-widest text-sm mb-6 text-brand-amber">Contato</h5>
              <p className="text-sm text-foreground/60 mb-4">
                R. Emb. Milton Cabral, 456<br />
                Tibiri, Santa Rita - PB, 58302-510
              </p>
              <p className="text-lg font-black text-white">(83) 98625-6727</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-foreground/30">© 2026 Soberano Burguer. Todos os direitos reservados.</p>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-foreground/40 hover:text-brand-amber transition-colors"
            >
              Voltar ao topo
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-amber transition-colors">
                <ArrowUp className="w-3 h-3" />
              </div>
            </button>
            <p className="text-xs text-foreground/30">
              Desenvolvido por <span className="text-foreground/60 font-medium">Richard G. - Soluções Digitais</span>
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
