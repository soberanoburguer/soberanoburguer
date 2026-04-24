"use client";

import SectionHeading from "@/components/ui/section-heading";
import ProductCard from "@/components/ui/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BURGERS = [
  {
    title: "Soberano Sertanejo",
    description: "Pão brioche 130g, carne de sol suculenta, queijo coalho derretido, cream cheese, maionese e salada fresca.",
    price: "29,99",
    image: "/images/menu/sertanejo.webp",
    isPopular: true,
  },
  {
    title: "Soberano Camarão",
    description: "A joia do mar na brasa. Blend especial coroado com filés de camarão, muçarela derretida, creme de queijo e nossa maionese secreta.",
    price: "29,99",
    image: "/images/menu/camarao.webp",
    isPopular: false,
  },
  {
    title: "Soberanão",
    description: "O rei da fome! Dois blends suculentos de 130g, bacon crocante, muito cheddar cremoso e barbecue artesanal no pão brioche.",
    price: "29,99",
    image: "/images/menu/soberanao.webp",
    isPopular: false,
  },
];

const SIDES = [
  {
    title: "Batata Frita Soberana",
    description: "Crocante por fora, macia por dentro. Frita na hora e temperada com o toque certo — o acompanhamento que todo reinado merece.",
    price: "14,99",
    image: "/images/menu/batatafrita.png",
    isPopular: true,
  },
  {
    title: "Milkshake do Trono",
    description: "Cremoso, gelado e feito pra durar até o último gole. O complemento perfeito pra qualquer burger soberano.",
    price: "14,99",
    image: "/images/menu/milkshakes.webp",
    isPopular: false,
  },
  {
    title: "Onion Rings",
    description: "Anéis de cebola empanados na casquinha crocante, dourados na medida certa. Impossível comer só um.",
    price: "14,99",
    image: "/images/menu/onionrings.webp",
    isPopular: false,
  },
];

export default function MenuHighlights() {
  return (
    <section id="menu" className="py-14 md:py-24 px-4 bg-brand-charcoal relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Escolha Sua Realeza"
          title="Os Mais Pedidos do Soberano"
          description="Do mestre açougueiro direto para sua mesa. Ingredientes selecionados e blends exclusivos que você só encontra aqui."
        />

        <Tabs defaultValue="burgers" className="w-full">
          <TabsList className="grid w-full max-w-[400px] mx-auto grid-cols-2 bg-brand-gray border border-white/5 p-1 mb-8 md:mb-12 !h-auto">
            <TabsTrigger value="burgers" className="!h-auto py-2.5 data-[active]:bg-soberano-gradient data-[active]:!text-white data-[active]:shadow-none transition-all font-bold text-white/50">
              Burgers
            </TabsTrigger>
            <TabsTrigger value="sweets" className="!h-auto py-2.5 data-[active]:bg-soberano-gradient data-[active]:!text-white data-[active]:shadow-none transition-all font-bold text-white/50">
              Acompanhamentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="burgers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 outline-none">
            {BURGERS.map((burger, index) => (
              <ProductCard key={index} {...burger} />
            ))}
          </TabsContent>

          <TabsContent value="sweets" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 outline-none">
            {SIDES.map((side, index) => (
              <ProductCard key={index} {...side} />
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-12 md:mt-20 text-center">
          <p className="text-foreground/40 text-sm mb-4 md:mb-6">Quer ver o cardápio completo com todas as opções?</p>
          <a
            href="https://app.cardapioweb.com/soberano_burguer"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 text-brand-amber font-black uppercase tracking-widest hover:translate-x-2 transition-transform"
          >
            Acessar Cardápio Completo
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
