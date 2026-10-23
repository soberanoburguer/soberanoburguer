# Soberano Burguer — Site Oficial

Site institucional da **Soberano Burguer**, hamburgueria artesanal com unidades em Santa Rita e João Pessoa, PB.

## Stack

- **Next.js 16** (App Router, páginas de unidade geradas estaticamente)
- **Tailwind CSS v4**
- **GSAP** e **Lenis** — animações de entrada e scroll-driven video
- **Base UI** — componentes headless (Tabs)
- **Lucide React** — ícones

## Estrutura

```
src/
├── app/                  # Layout, globals, [unidade] (santa-rita, joao-pessoa), sitemap, robots
├── lib/                  # unidades.ts (dados e SEO de cada unidade), utils.ts
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

## Publicação

Push na branch `master` publica em produção na Vercel pelo GitHub Actions (`.github/workflows/deploy.yml`). Instruções para agentes de IA: `AGENTS.md`.

## Desenvolvido por

**Richard G. — Soluções Digitais**
