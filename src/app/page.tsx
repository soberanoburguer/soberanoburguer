"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { UNIDADES, UnidadeInfo } from "@/lib/unidades";

function getBranchStatus() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = minutes >= 17 * 60 + 30; // 17:30h
  return {
    isOpen,
    openingTime: "17h30",
    closingTime: "00h",
  };
}

export default function HomeSeletor() {
  const [lastVisited, setLastVisited] = useState<UnidadeInfo | null>(null);
  const [status, setStatus] = useState({ isOpen: false, openingTime: "17h30", closingTime: "00h" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStatus(getBranchStatus());
    const saved = localStorage.getItem("soberano-unidade");
    if (saved && UNIDADES[saved]) {
      setLastVisited(UNIDADES[saved]);
    }

    const id = setInterval(() => {
      setStatus(getBranchStatus());
    }, 60_000);

    return () => clearInterval(id);
  }, []);

  const handleSelect = (slug: string) => {
    localStorage.setItem("soberano-unidade", slug);
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-brand-charcoal text-white flex flex-col justify-between overflow-hidden">
      {/* Glow de fundo */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-orange/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-amber/10 blur-[120px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(234,88,12,0.03) 0%, transparent 70%)"
          }}
        />
      </div>

      {/* Header — compacto no mobile */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 md:py-6 flex items-center justify-between z-10">
        <div className="relative h-9 w-36 md:h-12 md:w-48">
          <Image
            src="/brand/wordmark+logo.svg"
            alt="Soberano Burguer"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className="font-label text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase text-brand-amber bg-black/40 border border-brand-amber/20 px-3 py-1 md:px-3.5 md:py-1.5 rounded backdrop-blur-md">
          O Reinado
        </span>
      </header>

      {/* Toast de Visita Anterior — muito mais compacto no mobile */}
      {lastVisited && (
        <div className="w-full max-w-xl mx-auto px-4 z-20 animate-in fade-in slide-in-from-top duration-500 my-1 md:my-0">
          <div className="bg-black/60 border border-brand-amber/20 backdrop-blur-xl rounded-xl p-2.5 md:p-4 flex items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </span>
              <p className="text-[11px] md:text-sm text-white/80">
                Unidade recente: <strong className="text-white">{lastVisited.cidade}</strong>
              </p>
            </div>
            <Link
              href={`/${lastVisited.slug}`}
              onClick={() => handleSelect(lastVisited.slug)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-soberano-gradient text-white text-[10px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Entrar
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 md:py-12 z-10 max-w-5xl mx-auto w-full">
        {/* Título principal — Reduzido e otimizado no mobile */}
        <div className="text-center mb-6 md:mb-10 max-w-2xl">
          <h1 className="font-heading text-4xl md:text-7xl leading-none uppercase tracking-[0.01em] mb-2 md:mb-4">
            Escolha seu <span className="text-soberano-gradient">Reinado</span>
          </h1>
          <p className="text-white/60 text-[12px] md:text-base leading-relaxed px-4 md:px-0">
            Selecione a unidade para acessar o cardápio local e fazer seu pedido.
          </p>
        </div>

        {/* ── DESIGN MOBILE: Cards Horizontais Compactos (Sem Scroll) ── */}
        <div className="flex flex-col gap-3 w-full md:hidden px-2">
          {Object.values(UNIDADES).map((unidade) => {
            const isSR = unidade.id === "santa-rita";

            return (
              <div
                key={unidade.id}
                className="relative rounded-2xl border border-white/10 bg-brand-gray/60 p-4 overflow-hidden flex items-center justify-between gap-4 h-[135px] shadow-lg"
              >
                {/* Background overlay escuro */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0 pointer-events-none" />

                {/* Imagem de fundo com opacidade sutil */}
                <div className="absolute inset-0 w-full h-full -z-10 opacity-20">
                  <Image
                    src={isSR ? "/images/interior.webp" : "/images/hero-bg.webp"}
                    alt={unidade.nome}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Conteúdo textual (Esquerda) */}
                <div className="z-10 flex flex-col justify-between h-full py-0.5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] text-white/40 tracking-[0.08em] uppercase">
                        Unidade {isSR ? "01" : "02"}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-[9px] font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 rounded-full bg-black/60 border ${
                          status.isOpen
                            ? "text-green-400 border-green-500/20"
                            : "text-red-400 border-red-500/20"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${
                            status.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"
                          }`}
                        />
                        {status.isOpen ? "Aberto" : "Fechado"}
                      </span>
                    </div>

                    <h3 className="font-heading text-3xl uppercase leading-none text-white">
                      {unidade.cidade}
                    </h3>
                    <p className="text-brand-amber font-sans text-[10px] font-black uppercase tracking-widest mt-0.5">
                      {unidade.bairro}
                    </p>
                  </div>

                  <div className="flex gap-1.5 items-center text-white/40 text-[10px] leading-none">
                    <MapPin className="w-3 h-3 text-brand-amber shrink-0" />
                    <span className="line-clamp-1 max-w-[170px]">{unidade.endereco.split(" - ")[0]}</span>
                  </div>
                </div>

                {/* Ações Verticais (Direita) */}
                <div className="z-10 flex flex-col gap-2 shrink-0 justify-center h-full">
                  <Link
                    href={`/${unidade.slug}`}
                    onClick={() => handleSelect(unidade.slug)}
                    className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl bg-soberano-gradient text-white text-[10px] font-black uppercase tracking-[0.1em] transition-transform active:scale-95 shadow-md shadow-brand-orange/15 w-[110px]"
                  >
                    Entrar
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex gap-1.5">
                    <a
                      href={unidade.cardapioLink}
                      target="_blank"
                      aria-label="Cardápio"
                      className="flex-1 flex items-center justify-center py-2 rounded-lg border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-brand-amber" />
                    </a>
                    <a
                      href={unidade.whatsappLink}
                      target="_blank"
                      aria-label="WhatsApp"
                      className="flex-1 flex items-center justify-center py-2 rounded-lg border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-green-400" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.387 1.97 13.916.94 11.287.94c-5.442 0-9.87 4.372-9.874 9.802-.001 2.015.528 3.987 1.533 5.728L1.87 21.05l4.777-1.896zm12.39-4.833c-.327-.162-1.924-.941-2.227-1.05-.303-.11-.523-.162-.742.162-.22.325-.85.162-1.04-.162-.19-.324-.766-1.096-1.459-1.708-.54-.479-.904-1.07-1.01-1.233-.107-.164-.013-.253.07-.335.074-.074.162-.189.243-.284.082-.095.109-.162.164-.27.055-.11.027-.205-.014-.287-.04-.082-.742-1.77-.993-2.396-.245-.595-.494-.51-.678-.52l-.578-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.076 2.876 1.226 3.078.149.202 2.117 3.208 5.13 4.502.716.31 1.275.495 1.708.633.72.227 1.378.195 1.9.117.58-.088 1.924-.78 2.195-1.535.27-.754.27-1.4.19-1.535-.08-.135-.297-.216-.623-.378z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── DESIGN DESKTOP: Cards Tradicionais Imersivos (Grid) ── */}
        <div className="hidden md:grid grid-cols-2 gap-8 w-full">
          {Object.values(UNIDADES).map((unidade) => {
            const isSR = unidade.id === "santa-rita";

            return (
              <div
                key={unidade.id}
                className="group relative rounded-3xl border border-white/10 bg-brand-gray/50 hover:border-brand-amber/30 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl"
              >
                {/* Background overlay de hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0 pointer-events-none" />

                {/* Imagem representativa da unidade (escura) */}
                <div className="absolute inset-0 w-full h-full -z-10 opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700">
                  <Image
                    src={isSR ? "/images/interior.webp" : "/images/hero-bg.webp"}
                    alt={unidade.nome}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Top: Status Badges */}
                <div className="p-6 flex items-center justify-between z-10">
                  <span className="font-mono text-xs text-white/40 tracking-[0.08em] uppercase">
                    Unidade {isSR ? "01" : "02"}
                  </span>

                  <span
                    className={`flex items-center gap-1.5 font-label text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full bg-black/60 border backdrop-blur-md ${
                      status.isOpen
                        ? "text-green-400 border-green-500/20"
                        : "text-red-400 border-red-500/20"
                    }`}
                  >
                    <span
                      className={`w-[6px] h-[6px] rounded-full ${
                        status.isOpen
                          ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"
                          : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                      }`}
                    />
                    {status.isOpen ? "Aberto" : "Fechado"}
                  </span>
                </div>

                {/* Bottom: Info e Ações */}
                <div className="p-6 md:p-8 z-10 mt-20">
                  <h3 className="font-heading text-4xl md:text-5xl uppercase leading-none mb-2 text-white">
                    {unidade.cidade}
                  </h3>
                  <p className="text-brand-amber font-sans text-xs font-black uppercase tracking-widest mb-4">
                    {unidade.bairro}
                  </p>

                  <div className="flex gap-2.5 items-center mb-6 text-white/50 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-brand-amber shrink-0" />
                    <span className="line-clamp-1">{unidade.endereco}</span>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/${unidade.slug}`}
                      onClick={() => handleSelect(unidade.slug)}
                      className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-soberano-gradient text-white text-xs font-black uppercase tracking-[0.15em] transition-transform hover:scale-[1.02] shadow-lg shadow-brand-orange/15"
                    >
                      Acessar Site
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Quick Actions (Ações Rápidas) */}
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <a
                        href={unidade.cardapioLink}
                        target="_blank"
                        className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-brand-amber" />
                        Cardápio
                      </a>
                      <a
                        href={unidade.whatsappLink}
                        target="_blank"
                        className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 fill-green-400" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.387 1.97 13.916.94 11.287.94c-5.442 0-9.87 4.372-9.874 9.802-.001 2.015.528 3.987 1.533 5.728L1.87 21.05l4.777-1.896zm12.39-4.833c-.327-.162-1.924-.941-2.227-1.05-.303-.11-.523-.162-.742.162-.22.325-.85.162-1.04-.162-.19-.324-.766-1.096-1.459-1.708-.54-.479-.904-1.07-1.01-1.233-.107-.164-.013-.253.07-.335.074-.074.162-.189.243-.284.082-.095.109-.162.164-.27.055-.11.027-.205-.014-.287-.04-.082-.742-1.77-.993-2.396-.245-.595-.494-.51-.678-.52l-.578-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.076 2.876 1.226 3.078.149.202 2.117 3.208 5.13 4.502.716.31 1.275.495 1.708.633.72.227 1.378.195 1.9.117.58-.088 1.924-.78 2.195-1.535.27-.754.27-1.4.19-1.535-.08-.135-.297-.216-.623-.378z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer — compacto no mobile */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 md:py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 z-10 text-center md:text-left">
        <p className="text-[10px] md:text-[11px] text-white/30">
          © 2026 Soberano Burguer · Todos os direitos reservados
        </p>
        <p className="text-[9px] md:text-[10px] text-white/30 tracking-[0.04em]">
          Desenvolvido por <span className="text-white/50 font-semibold">Richard G. - Soluções Digitais</span>
        </p>
      </footer>
    </div>
  );
}
