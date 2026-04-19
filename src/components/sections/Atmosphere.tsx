"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/section-heading";
import { Coffee, Music, Sparkles, MapPin } from "lucide-react";
import { useStoreStatus } from "@/hooks/useStoreStatus";

export default function Atmosphere() {
  const { isOpen, closingTime, openingTime, nextOpenLabel } = useStoreStatus();
  return (
    <section id="location" className="py-14 md:py-24 px-4 relative bg-brand-charcoal">
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
          <div className="hidden md:flex absolute bottom-6 left-6 right-6 glass-card p-6 rounded-2xl items-center justify-between">
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
            <div className="flex gap-4 max-md:bg-white/5 max-md:border max-md:border-white/5 max-md:rounded-2xl max-md:p-4 max-md:items-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-amber shrink-0">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold mb-1">Música Ambiente</h5>
                <p className="text-xs text-white/50 leading-relaxed">Playlist selecionada para acompanhar o seu burger.</p>
              </div>
            </div>
            
            <div className="flex gap-4 max-md:bg-white/5 max-md:border max-md:border-white/5 max-md:rounded-2xl max-md:p-4 max-md:items-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-amber shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold mb-1">Higiene e Padrão</h5>
                <p className="text-xs text-white/50 leading-relaxed">Cozinha com rigor técnico de quem entende de carne.</p>
              </div>
            </div>

            <div className="flex gap-4 max-md:bg-white/5 max-md:border max-md:border-white/5 max-md:rounded-2xl max-md:p-4 max-md:items-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-amber shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold mb-1">Localização Privilegiada</h5>
                <p className="text-xs text-white/50 leading-relaxed">Fácil acesso no coração de Tibiri, Santa Rita.</p>
              </div>
            </div>

            <div className="flex gap-4 max-md:bg-white/5 max-md:border max-md:border-white/5 max-md:rounded-2xl max-md:p-4 max-md:items-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-amber shrink-0">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold mb-1">Espaço Aconchegante</h5>
                <p className="text-xs text-white/50 leading-relaxed">O lugar perfeito para reunir amigos e família.</p>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="text-foreground/40 text-sm mb-10 md:mb-2">R. Emb. Milton Cabral, 456 - Tibiri, Santa Rita - PB, 58302-510</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Soberano+Burguer+Santa+Rita+PB"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-bold transition-all"
            >
              Abrir no Waze / Maps
              <MapPin className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
