"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/section-heading";
import { Coffee, Music, Sparkles, MapPin } from "lucide-react";
import { useStoreStatus } from "@/hooks/useStoreStatus";

const FEATURES = [
  {
    num: "01",
    title: "Música Ambiente",
    desc: "Playlist selecionada para acompanhar o seu burger.",
    Icon: Music,
  },
  {
    num: "02",
    title: "Higiene e Padrão",
    desc: "Cozinha com rigor técnico de quem entende de carne.",
    Icon: Sparkles,
  },
  {
    num: "03",
    title: "Localização Privilegiada",
    desc: "Fácil acesso no coração de Tibiri II, Santa Rita.",
    Icon: MapPin,
  },
  {
    num: "04",
    title: "Espaço Aconchegante",
    desc: "O lugar perfeito para reunir amigos e família.",
    Icon: Coffee,
  },
];

export default function Atmosphere() {
  const { isOpen, closingTime, openingTime, nextOpenLabel } = useStoreStatus();

  return (
    <section className="bg-brand-charcoal">

      {/* ── MOBILE — Magazine Cover ── */}
      <div className="md:hidden bg-brand-gray">

        {/* Cover / hero photo */}
        <div className="relative h-[460px] overflow-hidden">
          <Image
            src="/images/interior.webp"
            alt="Interior do Soberano Burguer"
            fill
            className="object-cover object-center"
          />
          {/* Gradient overlays */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 55%, #121212 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(800px 400px at 50% 0%, rgba(234,88,12,0.15), transparent 60%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Kicker pill — top left */}
          <span className="absolute top-7 left-6 font-label text-[11px] font-bold tracking-[0.28em] uppercase text-brand-amber px-3 py-[7px] rounded bg-black/50 border border-brand-amber/20 backdrop-blur-md">
            Experiência Presencial
          </span>

          {/* Status pill — top right */}
          <span
            className={`absolute top-7 right-6 flex items-center gap-2 font-label text-[11px] font-bold tracking-[0.14em] uppercase px-3 py-[7px] rounded-full bg-black/50 border backdrop-blur-md ${
              isOpen
                ? "text-green-400 border-green-500/25"
                : "text-red-400 border-red-500/25"
            }`}
          >
            <span
              className={`w-[7px] h-[7px] rounded-full animate-pulse ${
                isOpen
                  ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                  : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              }`}
            />
            {isOpen ? `Aberto · ${closingTime}` : `Fechado · ${openingTime}`}
          </span>

          {/* Bottom — issue line + title */}
          <div className="absolute left-6 right-6 bottom-7">
            <div className="flex items-center gap-2.5 mb-3 font-mono text-[11px] text-white/40 tracking-[0.08em]">
              <span>Ed. 06</span>
              <span className="flex-1 h-px bg-white/15" />
              <span>Santa Rita — PB</span>
            </div>
            <h2
              className="font-heading text-[64px] leading-[0.88] uppercase text-white tracking-[0.01em] m-0"
            >
              O trono<br />
              <span className="text-soberano-gradient block">espera.</span>
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pt-6 pb-10">

          {/* Lede */}
          <p className="text-[15px] leading-relaxed text-white/70 border-l-2 border-brand-amber pl-4 mb-7">
            <strong className="text-white font-semibold">Mais que um hambúrguer, uma experiência completa.</strong>{" "}
            Nosso espaço foi pensado para o seu conforto — da trilha sonora ao último garfo.
          </p>

          {/* Features */}
          <div className="flex flex-col">
            {FEATURES.map(({ num, title, desc, Icon }, i) => (
              <div
                key={num}
                className={`grid gap-4 items-start py-[18px] border-t border-white/5 ${
                  i === FEATURES.length - 1 ? "border-b border-white/5" : ""
                }`}
                style={{ gridTemplateColumns: "34px 1fr auto" }}
              >
                <span
                  className="font-heading text-[26px] leading-none text-brand-amber tracking-[0.01em]"
                >
                  {num}
                </span>
                <div>
                  <h5 className="font-sans text-[14px] font-black uppercase tracking-[0.08em] text-white mb-1">
                    {title}
                  </h5>
                  <p className="text-[13px] leading-[1.55] text-white/60 m-0">
                    {desc}
                  </p>
                </div>
                <span className="w-8 h-8 rounded-lg bg-brand-amber/[0.08] border border-brand-amber/20 flex items-center justify-center text-brand-amber">
                  <Icon className="w-4 h-4" />
                </span>
              </div>
            ))}
          </div>

          {/* Address card */}
          <div
            className="mt-7 p-5 rounded-2xl border border-brand-amber/20 flex flex-col gap-3.5"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(234,88,12,0.04) 100%), rgba(26,26,26,0.6)",
            }}
          >
            <span className="font-label text-[10px] font-bold tracking-[0.24em] uppercase text-brand-amber">
              Onde encontrar
            </span>
            <h3 className="font-heading text-[20px] leading-[1.1] text-white uppercase tracking-[0.02em] m-0">
              R. Emb. Milton Cabral, 456 —<br />
              Tibiri II, Santa Rita — PB
            </h3>
            <p className="text-[12.5px] text-white/60 m-0">
              CEP 58302-510 · (83) 98625-6727
            </p>
            <p className="text-[12px] text-brand-amber font-semibold m-0">
              Delivery em toda Santa Rita e Bayeux
            </p>
            {/* Live status row */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isOpen ? "bg-green-400" : "bg-red-400"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isOpen ? "bg-green-400" : "bg-red-400"
                  }`}
                />
              </span>
              <span className={`text-[12px] font-bold ${isOpen ? "text-green-400" : "text-red-400"}`}>
                {isOpen
                  ? `Aberto agora · fecha às ${closingTime}`
                  : `Fechado · abre ${nextOpenLabel} às ${openingTime}`}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href="https://www.google.com/maps/search/?api=1&query=R.+Emb.+Milton+Cabral,+456,+Tibiri,+Santa+Rita,+PB,+58302-510"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-4 rounded-full bg-soberano-gradient text-brand-gray text-[13px] font-black uppercase tracking-[0.14em] shadow-[0_10px_30px_-5px_rgba(234,88,12,0.4)]"
            >
              <MapPin className="w-4 h-4" />
              Abrir no Waze / Maps
            </a>
            <a
              href="https://wa.me/5583986256727"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-transparent border border-white/10 text-white/70 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
              </svg>
              Reservar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── DESKTOP — original layout ── */}
      <div className="hidden md:block py-24 px-4 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-4 bg-soberano-gradient opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/interior.webp"
                alt="Ambiente Soberano Burguer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Status Badge */}
            <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-2xl flex items-center justify-between">
              <div>
                <span className={`font-bold text-sm block ${isOpen ? "text-brand-amber" : "text-red-400"}`}>
                  {isOpen ? "Aberto Agora" : "Fechado Agora"}
                </span>
                <span className="text-white text-xs opacity-60">
                  {isOpen ? `Até às ${closingTime}` : `Abre ${nextOpenLabel} às ${openingTime}`}
                </span>
              </div>
              <div className={`h-3 w-3 rounded-full animate-pulse ${isOpen ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"}`} />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              badge="Experiência Presencial"
              title="O Trono Espera por Você"
              description="Mais que um hambúrguer, uma experiência completa. Nosso espaço foi pensado para o seu conforto, unindo boa música, atendimento de mestre e o melhor blend da região."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 md:gap-8 md:mb-12">
              {FEATURES.map(({ title, desc, Icon }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-amber shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">{title}</h5>
                    <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center md:text-left">
              <p className="text-foreground/40 text-sm mb-1">
                R. Emb. Milton Cabral, 456 - Tibiri II, Santa Rita - PB, 58302-510
              </p>
              <p className="text-brand-amber text-xs font-semibold mb-4">
                Entregamos em toda a região de Santa Rita e Bayeux
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=R.+Emb.+Milton+Cabral,+456,+Tibiri,+Santa+Rita,+PB,+58302-510"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-bold transition-all"
              >
                Abrir no Waze / Maps
                <MapPin className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
