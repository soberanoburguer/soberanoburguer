"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    video.src = isMobile ? "/videos/hero-mobile.mp4" : "/videos/hero-desktop.mp4";
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

    // ── Mobile: play once, freeze at last frame ──
    if (isMobile) {
      section.style.height = "100vh";
      video.autoplay = true;

      // Pré-carrega a imagem quando o vídeo chega em 80% — sem delay no fade
      const POSTER_SRC = "/images/hero-bg.webp";
      let preloaded = false;
      const onTimeUpdate = () => {
        if (!preloaded && video.duration && video.currentTime / video.duration >= 0.8) {
          preloaded = true;
          const img = posterRef.current;
          if (img) img.src = POSTER_SRC;
        }
      };
      video.addEventListener("timeupdate", onTimeUpdate);

      // Ao terminar: fade in da imagem estática, fade out do vídeo
      const onEnded = () => {
        const poster = posterRef.current;
        if (poster) {
          if (!poster.src) poster.src = POSTER_SRC; // fallback se timeupdate não disparou
          poster.style.transition = "opacity 0.8s ease";
          poster.style.opacity = "1";
        }
        video.style.transition = "opacity 0.8s ease";
        video.style.opacity = "0";
      };
      video.addEventListener("ended", onEnded);

      const playOnReady = () => {
        video.play().catch(() => {/* autoplay bloqueado pelo browser — fica estático */});
      };
      if (video.readyState >= 1) {
        playOnReady();
      } else {
        video.addEventListener("loadedmetadata", playOnReady, { once: true });
      }
      return () => {
        ctx.revert();
        video.removeEventListener("loadedmetadata", playOnReady);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("ended", onEnded);
      };
    }

    // ── Desktop: scroll-driven video com RAF contínuo + lerp ──
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
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover [object-position:70%_50%] md:object-center -z-10"
        />
        {/* Mobile: imagem estática que substitui o vídeo após ele terminar */}
        {/* src setado dinamicamente em onTimeUpdate/onEnded — não baixa no load inicial */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={posterRef}
          alt=""
          aria-hidden="true"
          className="md:hidden absolute inset-0 w-full h-full object-cover [object-position:70%_50%] -z-10"
          style={{ opacity: 0 }}
        />

        <div className="absolute inset-0 -z-10 bg-black/50" />

        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[150px] -z-10" />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-12 md:items-center px-4 pt-20 pb-24 md:pb-0 self-stretch md:self-auto">
          <div ref={textRef} className="flex flex-col text-left flex-1 md:flex-none w-full justify-center md:justify-start">
            <div className="self-start inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/20 text-brand-amber text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-brand-amber" />
              <span>Santa Rita, PB — Desde 2020</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 uppercase">
              Aqui Reina o <br />
              <span className="text-soberano-gradient">Sabor Soberano</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 mb-8 md:mb-10 max-w-xl">
              Blends artesanais criados por um açougueiro que passou a vida inteira dominando a carne. Agora na sua mesa.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 justify-start">
              <Link
                href="https://app.cardapioweb.com/soberano_burguer"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-soberano-gradient text-white text-base md:text-lg font-bold px-8 py-4 md:px-10 md:py-5 shadow-xl shadow-brand-orange/20 hover:scale-105 transition-transform w-full sm:w-auto"
              >
                FAÇA SEU PEDIDO AGORA
                <ChevronRight className="ml-2 h-5 w-5" />
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
