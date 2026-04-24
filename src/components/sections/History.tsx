"use client";

import { useEffect, useRef, useState } from "react";
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
    title: <>A Era da <span className="text-brand-amber">Eu</span>quipe</>,
    description: "Gustavo preparava, montava e subia na moto pra entregar. Na porta de cada cliente, o Soberano conquistava um fã.",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    year: "2023 - 2024",
    title: "O 'Corre' Virou Empresa",
    description: "A garagem ficou pequena — a ambição, não. Equipe montada, processos no lugar, padrão mantido.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    year: "2026",
    title: "6 Anos de Reinado",
    description: "Seis anos de brasa e dedicação. O açougueiro virou soberano. E o reinado apenas começa.",
    icon: <Crown className="w-6 h-6" />,
  },
];

const DESKTOP_CHAPTERS = [
  {
    chapter: "Cap. I",
    yearLines: ["Antes", "2020"],
    title: "A Lâmina",
    desc: "Anos de açougueiro antes de qualquer burguer. O olho clínico, os cortes certos. Esse conhecimento ninguém improvisa.",
    Icon: UtensilsCrossed,
    active: false,
  },
  {
    chapter: "Cap. II",
    yearLines: ["Mai", "2020"],
    title: "A Brasa",
    desc: "Garagem, chapa improvisada, zero investidor. Só raça, fé e o nome Soberano já escolhido antes de qualquer venda.",
    Icon: Rocket,
    active: false,
  },
  {
    chapter: "Cap. III",
    yearLines: ["2020", "2022"],
    title: "A Estrada",
    desc: "A 'euquipe' de um homem só. Gustavo preparava, montava e subia na moto para entregar. Na porta do cliente, o fã nascia.",
    Icon: Truck,
    active: false,
  },
  {
    chapter: "Cap. IV",
    yearLines: ["2023", "2024"],
    title: "O Reino",
    desc: "O 'corre' individual vira engrenagem. Rede de pessoas, processos, padrão. A garagem ficou pequena. A ambição, não.",
    Icon: Users,
    active: false,
  },
  {
    chapter: "Cap. V",
    yearLines: ["2026"],
    title: "O Legado",
    desc: "Seis anos. O açougueiro que começou numa garagem virou referência. E o reinado apenas começa.",
    Icon: Crown,
    active: true,
  },
] as const;

export default function History() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mobile refs
  const lineRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<HTMLDivElement[]>([]);

  // Desktop refs
  const activeLineRef = useRef<HTMLDivElement>(null);
  const bgLineRef = useRef<HTMLDivElement>(null);
  const desktopColRefs = useRef<HTMLDivElement[]>([]);

  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const activeDesktopIndexRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── MOBILE: vertical timeline ──
      mm.add("(max-width: 767px)", () => {
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

      // ── DESKTOP: horizontal rail (Option A) ──
      mm.add("(min-width: 768px)", () => {
        // Stagger each chapter column as section enters view
        const cols = desktopColRefs.current.filter(Boolean);
        if (cols.length) {
          gsap.from(cols, {
            y: 28,
            opacity: 0,
            duration: 0.7,
            stagger: 0.09,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Pin section at its bottom — scroll only continues after bar reaches 5th card
        gsap.fromTo(
          activeLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "bottom bottom",
              end: "+=2000",
              pin: true,
              anticipatePin: 1,
              scrub: 1,
              snap: {
                snapTo: 1 / 4,
                duration: { min: 0.4, max: 0.7 },
                delay: 0.05,
                ease: "power2.inOut",
              },
              onUpdate: (self) => {
                const newIndex = Math.min(4, Math.round(self.progress * 4));
                if (newIndex !== activeDesktopIndexRef.current) {
                  activeDesktopIndexRef.current = newIndex;
                  setActiveDesktopIndex(newIndex);
                }
              },
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-gray relative overflow-hidden"
    >
      {/* ─────────────────────────────────────────────
          MOBILE layout — untouched
      ───────────────────────────────────────────── */}
      <div className="md:hidden py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="font-label text-[12px] font-black tracking-[0.28em] text-brand-amber uppercase mb-5">// Como Tudo Começou</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-4 md:mb-6">
              De Açougueiro a <span className="text-soberano-gradient">Soberano</span>
            </h3>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Seis anos. Uma garagem, uma moto e muita carne boa. Veja como o Soberano nasceu.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-1 bg-white/5" />
            <div
              ref={lineRef}
              className="absolute left-5 top-0 bottom-0 w-1 bg-soberano-gradient origin-top scale-y-0"
            />

            <div className="space-y-8">
              {MILESTONES.map((item, index) => (
                <div
                  key={index}
                  className="milestone-row relative flex items-center pl-16"
                >
                  <div
                    ref={(el) => { if (el) markerRefs.current[index] = el; }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 shrink-0 rounded-full bg-brand-charcoal border-4 border-brand-gray flex items-center justify-center text-brand-amber shadow-xl"
                  >
                    {item.icon}
                  </div>
                  <div className="timeline-card w-full text-left bg-brand-charcoal/40 rounded-xl p-4 border border-white/5">
                    <span className="text-brand-amber font-mono font-bold text-base mb-1 block">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-black mb-2">{item.title}</h4>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          DESKTOP layout — Option A: Horizontal Rail
      ───────────────────────────────────────────── */}
      <div className="hidden md:block py-24 px-16">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 25% 50%, rgba(234,88,12,0.05), transparent 60%)",
          }}
        />

        {/* Section header */}
        <header className="relative text-center mb-[72px] max-w-[720px] mx-auto">
          <span className="block font-label text-[12px] font-black tracking-[0.28em] text-brand-amber uppercase mb-5">
            // Como Tudo Começou
          </span>
          <h3 className="text-[56px] leading-[0.95] uppercase mb-6">
            Cinco capítulos,<br />uma única{" "}
            <span className="text-soberano-gradient">brasa.</span>
          </h3>
          <p className="font-body text-base text-foreground/60 leading-relaxed max-w-xl mx-auto">
            Seis anos. Cinco capítulos. De açougueiro a soberano, cada etapa forjou o reinado que você conhece hoje.
          </p>
        </header>

        {/* Rail */}
        <div className="relative max-w-[1200px] mx-auto">

          {/* ── Row 1: Chapter labels + Years (fixed-height so markers align) ── */}
          <div className="relative z-10 grid grid-cols-5 gap-6">
            {DESKTOP_CHAPTERS.map((item, i) => (
              <div
                key={i}
                ref={(el) => { if (el) desktopColRefs.current[i] = el; }}
                className="flex flex-col items-center text-center"
              >
                <span className="font-label text-[11px] font-bold tracking-[0.22em] uppercase text-foreground/40 mb-[14px]">
                  {item.chapter}
                </span>
                {/* Fixed 72px height keeps all markers at the same Y */}
                <div className="h-[72px] flex flex-col items-center justify-end mb-[22px]">
                  {item.yearLines.map((line, li) => (
                    <span
                      key={li}
                      className={`block font-heading text-[36px] leading-none tracking-[0.01em] ${
                        activeDesktopIndex === i ? "text-soberano-gradient" : ""
                      }`}
                    >
                      {line}
                    </span>
                  ))}
                </div>

                {/* ── Marker ── */}
                <div className="relative z-10">
                  {/* Mascarador permanente: cobre a linha independente do estado ativo */}
                  <div className="absolute inset-0 rounded-full bg-brand-gray z-0" />

                  {activeDesktopIndex === i && (
                    <span className="absolute -inset-2 rounded-full animate-ping bg-brand-amber/20 z-[1]" />
                  )}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                      activeDesktopIndex === i
                        ? "text-brand-gray shadow-[0_10px_30px_-6px_rgba(234,88,12,0.5)]"
                        : "bg-brand-gray border-2 border-white/10 text-foreground/60"
                    }`}
                    style={
                      activeDesktopIndex === i
                        ? { background: "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)" }
                        : {}
                    }
                  >
                    <item.Icon className="w-[22px] h-[22px]" strokeWidth={2} />
                  </div>
                </div>

                {/* ── Card ── */}
                <div className="mt-8 px-2">
                  <h4 className="font-heading text-2xl leading-[1.05] uppercase tracking-[0.01em] mb-3">
                    {item.title}
                  </h4>
                  <p className="font-body text-[13.5px] leading-[1.55] text-foreground/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Horizontal lines — positioned at marker center
               chapter-label (~16px) + mb-14 + year-box (72px) + mb-22 + half-marker (28px) = ~152px ── */}
          <div
            ref={bgLineRef}
            className="absolute inset-x-0 h-[2px] pointer-events-none"
            style={{
              top: "152px",
              zIndex: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 8%, rgba(255,255,255,0.1) 92%, transparent 100%)",
            }}
          />
          <div
            ref={activeLineRef}
            className="absolute inset-x-0 h-[2px] pointer-events-none origin-left"
            style={{
              top: "152px",
              transform: "scaleX(0)",
              zIndex: 2,
              background: "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)",
            }}
          />
        </div>

        {/* Footer note */}
        <p className="relative mt-24 text-center font-heading text-xl tracking-[0.12em] uppercase text-foreground/40">
          O trono espera{" "}
          <span className="text-soberano-gradient">por você.</span>
        </p>
      </div>
    </section>
  );
}
