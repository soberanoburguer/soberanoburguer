"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UtensilsCrossed, Rocket, Truck, Users, Crown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "Antes de 2020",
    title: "O DNA de Açougueiro",
    description: "Anos de experiência selecionando os melhores cortes. A expertise de quem entende a carne antes mesmo dela ir para a grelha.",
    icon: <UtensilsCrossed className="w-6 h-6" />,
  },
  {
    year: "Maio de 2020",
    title: "A Churrasqueira Porquinho",
    description: "O início na raça: uma garagem, uma churrasqueira pequena de ferro fundido e o sonho de criar algo soberano.",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    year: "2020 - 2022",
    title: "A Era da Euquipe",
    description: "Gustavo preparava, montava e entregava. O contato direto com cada cliente forjou uma base de fãs leais.",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    year: "2023 - 2024",
    title: "Consolidação da Marca",
    description: "O 'corre' individual virou empresa. Equipe formada e processos refinados para manter o padrão de excelência.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    year: "2026",
    title: "O Legado Soberano",
    description: "6 anos de história. Referência regional e o compromisso inabalável com o sabor que só um mestre açougueiro entrega.",
    icon: <Crown className="w-6 h-6" />,
  },
];

export default function History() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop: alternating left/right
        markerRefs.current.forEach((marker, index) => {
          if (!marker) return;

          gsap.from(marker, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: marker,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          const card = marker.parentElement?.querySelector(".timeline-card");
          if (card) {
            gsap.from(card, {
              x: index % 2 === 0 ? -50 : 50,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: all cards come from the left
        markerRefs.current.forEach((marker) => {
          if (!marker) return;

          gsap.from(marker, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: marker,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });

          const card = marker.closest(".milestone-row")?.querySelector(".timeline-card");
          if (card) {
            gsap.from(card, {
              x: -30,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="history"
      ref={sectionRef}
      className="py-24 px-4 bg-brand-gray relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-brand-amber uppercase tracking-widest text-sm font-bold mb-4">Nossa Origem</h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6">
            De Açougueiro a <span className="text-soberano-gradient">Soberano</span>
          </h3>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Uma jornada de 6 anos marcada pela coragem, técnica e o domínio total da carne. Conheça os passos que nos trouxeram até aqui.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line — left on mobile, center on desktop */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-white/5" />
          <div
            ref={lineRef}
            className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-soberano-gradient origin-top scale-y-0"
          />

          <div className="space-y-12 md:space-y-24">
            {MILESTONES.map((item, index) => (
              /* ── Mobile: linha à esquerda, card à direita (full width)
                 ── Desktop: alternating left/right */
              <div
                key={index}
                className={`milestone-row relative
                  flex items-center pl-16 md:pl-0
                  md:justify-between md:gap-8
                  ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
                `}
              >
                {/* Marker — absolute no mobile, in-flow no desktop */}
                <div
                  ref={(el) => { if (el) markerRefs.current[index] = el; }}
                  className="
                    absolute left-0 top-1/2 -translate-y-1/2
                    md:relative md:left-auto md:top-auto md:translate-y-0
                    z-10 w-10 h-10 md:w-12 md:h-12 shrink-0
                    rounded-full bg-brand-charcoal border-4 border-brand-gray
                    flex items-center justify-center text-brand-amber shadow-xl
                  "
                >
                  {item.icon}
                </div>

                {/* Card */}
                <div
                  className={`
                    timeline-card w-full md:w-[45%]
                    text-left ${index % 2 === 0 ? "md:text-right" : "md:text-left"}
                    bg-brand-charcoal/40 md:bg-transparent
                    rounded-xl md:rounded-none
                    p-4 md:p-0
                    border border-white/5 md:border-0
                  `}
                >
                  <span className="text-brand-amber font-mono font-bold text-base md:text-lg mb-1 md:mb-2 block">
                    {item.year}
                  </span>
                  <h4 className="text-xl md:text-2xl font-black mb-2 md:mb-3">{item.title}</h4>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Desktop spacer */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
