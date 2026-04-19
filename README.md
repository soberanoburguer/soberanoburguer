# Soberano Burguer — Site Oficial

Site institucional da **Soberano Burguer**, hamburgueria artesanal de Santa Rita, PB.

## Stack

- **Next.js 15** (App Router, static export)
- **Tailwind CSS v4**
- **GSAP** — animações de entrada e scroll-driven video
- **Base UI** — componentes headless (Tabs)
- **Lucide React** — ícones

## Estrutura

```
src/
├── app/                  # Layout, globals, página principal
├── components/
│   ├── sections/         # Hero, Navbar, History, MenuHighlights, Reviews, Atmosphere, Footer
│   └── ui/               # ProductCard, SectionHeading, Badge, Tabs
public/
├── brand/                # Logotipo e monograma
├── images/               # Fotos de produtos e seções
└── videos/               # hero.mp4 (scroll-driven, all-keyframe 1080p)
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Desenvolvido por

**Richard G. — Soluções Digitais**
