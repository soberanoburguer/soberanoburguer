"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.pause();
    video.load();

    const ctx = gsap.context(() => {
      gsap.from(textRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        delay: 0.3,
      });
    });

    // ── Scroll-driven video com RAF contínuo + lerp ──
    let targetTime = 0;
    let currentTime = 0;
    let rafId = 0;
    let ready = false;

    const computeTargetFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      targetTime = progress * (video.duration || 0);
    };

    const tick = () => {
      if (ready && Number.isFinite(video.duration)) {
        const diff = targetTime - currentTime;
        if (Math.abs(diff) > 1 / 60) {
          currentTime += diff * 0.18;
          try {
            video.currentTime = currentTime;
          } catch {
            /* seek inválido antes do ready — ignora */
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => computeTargetFromScroll();

    const onMeta = () => {
      ready = true;
      computeTargetFromScroll();
      currentTime = targetTime;
      try { video.currentTime = targetTime; } catch { /* ignora */ }
    };

    if (video.readyState >= 1) {
      onMeta();
    } else {
      video.addEventListener("loadedmetadata", onMeta, { once: true });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover [object-position:70%_50%] md:object-center -z-10"
        />

        <div className="absolute inset-0 -z-10 bg-black/50" />

        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[150px] -z-10" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 pt-20">
          <div ref={textRef} className="flex flex-col text-left">
            <div className="self-start inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/20 text-brand-amber text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-brand-amber" />
              <span>O melhor de Santa Rita, PB</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 uppercase">
              O Reinado do <br />
              <span className="text-soberano-gradient">Sabor Soberano</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl">
              Esqueça o comum. Experimente blends artesanais criados por um mestre açougueiro que entende o DNA da carne.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-start">
              <Link
                href="https://wa.me/5583986256727"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-soberano-gradient text-white text-base md:text-lg font-bold px-8 py-4 md:px-10 md:py-5 shadow-xl shadow-brand-orange/20 hover:scale-105 transition-transform"
              >
                FAÇA SEU PEDIDO AGORA
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="#history"
                className="inline-flex items-center justify-center rounded-lg bg-black/50 border border-white/20 text-brand-amber text-base md:text-lg font-bold px-8 py-4 md:px-10 md:py-5 hover:bg-black/70 hover:text-white transition-all"
              >
                Nossa Origem
              </Link>
            </div>
          </div>

          <div />
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60 scale-110">
          <svg width="20" height="20" viewBox="0 0 24 14" fill="none">
            <path d="M2 2L12 12L22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
