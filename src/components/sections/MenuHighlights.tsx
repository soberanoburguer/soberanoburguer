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

const SWEETS = [
  {
    title: "Milkshake Soberano",
    description: "Ninho premium com Nutella legítima, borda de chocolate e chantilly.",
    price: "24,00",
    image: "/images/shake-ninho.webp",
    isPopular: true,
  },
  {
    title: "Açaí Real (500ml)",
    description: "Açaí puro com Nutella, leite em pó, morango e pedaços de paçoca.",
    price: "26,00",
    image: "/images/acai-real.webp",
    isPopular: false,
  },
  {
    title: "Milkshake de Morango",
    description: "Morango fresco, calda artesanal e base cremosa de leite.",
    price: "21,00",
    image: "/images/shake-morango.webp",
    isPopular: false,
  },
];

export default function MenuHighlights() {
  return (
    <section id="menu" className="py-24 px-4 bg-brand-charcoal relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Escolha Sua Realeza"
          title="Os Mais Pedidos do Soberano"
          description="Do mestre açougueiro direto para sua mesa. Ingredientes selecionados e blends exclusivos que você só encontra aqui."
        />

        <Tabs defaultValue="burgers" className="w-full">
          <TabsList className="grid w-full max-w-[400px] mx-auto grid-cols-2 bg-brand-gray border border-white/5 p-1 mb-12 !h-auto">
            <TabsTrigger value="burgers" className="!h-auto py-2.5 data-[active]:bg-soberano-gradient data-[active]:!text-white data-[active]:shadow-none transition-all font-bold text-white/50">
              Burgers
            </TabsTrigger>
            <TabsTrigger value="sweets" className="!h-auto py-2.5 data-[active]:bg-soberano-gradient data-[active]:!text-white data-[active]:shadow-none transition-all font-bold text-white/50">
              Doces & Shakes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="burgers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 outline-none">
            {BURGERS.map((burger, index) => (
              <ProductCard key={index} {...burger} />
            ))}
          </TabsContent>

          <TabsContent value="sweets" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 outline-none">
            {SWEETS.map((sweet, index) => (
              <ProductCard key={index} {...sweet} />
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-20 text-center">
          <p className="text-foreground/40 text-sm mb-6">Quer ver o cardápio completo com todas as opções?</p>
          <a
            href="https://wa.me/5583986256727"
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
