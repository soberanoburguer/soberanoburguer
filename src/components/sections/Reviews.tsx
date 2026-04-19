"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/section-heading";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";

const REVIEWS = [
  {
    name: "Edson Brito Leite Junior",
    role: "Cliente Google",
    content: "Ótimo atendimento e alimentos de 1° qualidade, é o melhor hambúrguer da cidade.",
    stars: 5,
  },
  {
    name: "Helena Farias",
    role: "Psicóloga",
    content: "O melhor hambúrguer com certeza, 5 estrelas é pouco, vale muito mais. ❤️🍔",
    stars: 5,
  },
  {
    name: "Bruno Silva",
    role: "Cliente Google",
    content: "Nunca vi um hambúrguer dessa qualidade. Estão de parabéns pela responsabilidade e sabor.",
    stars: 5,
  },
  {
    name: "Jonas Carvalho",
    role: "Cliente Google",
    content: "A melhor hamburgueria da região, sem dúvidas. Os blends são diferenciados.",
    stars: 5,
  },
  {
    name: "Ricardo Marinho",
    role: "Local Guide",
    content: "Ambiente muito organizado, atendimento de qualidade, produto nota 10 e preço acessível.",
    stars: 5,
  },
];

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!scrollRef.current) return;

      const cards = scrollRef.current.children;
      const totalWidth = scrollRef.current.scrollWidth;

      gsap.to(scrollRef.current, {
        x: -(totalWidth / 2),
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-brand-gray overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <SectionHeading
          badge="Prova Social"
          title="A Palavra de Quem Já Provou"
          description="Mais de 250 avaliações 5 estrelas no Google. Nossa maior autoridade é a satisfação de quem come."
        />
      </div>

      {/* Infinite Scroll Reviews */}
      <div className="relative flex">
        <div
          ref={scrollRef}
          className="flex gap-6 whitespace-nowrap py-10"
        >
          {[...REVIEWS, ...REVIEWS].map((review, index) => (
            <div
              key={index}
              className="inline-block glass-card p-8 rounded-3xl w-[350px] whitespace-normal relative overflow-hidden group shadow-xl border border-transparent hover:border-brand-orange/10 transition-colors"
            >
              <Quote strokeWidth={0.75} className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 group-hover:text-brand-orange/10 transition-colors" />

              <div className="flex text-brand-amber mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-foreground/80 italic mb-8 relative z-10">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-10 h-10 rounded-full bg-soberano-gradient flex items-center justify-center font-bold text-brand-gray">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-sm">{review.name}</h5>
                  <span className="text-xs text-foreground/40">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shaders */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-gray to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-gray to-transparent z-20" />
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <Image
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="Google"
            width={16}
            height={16}
          />
          <span className="text-sm font-bold">4.9/5 no Google Meu Negócio</span>
        </div>
      </div>
    </section>
  );
}
