<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Soberano Burguer: instruções do projeto

Site institucional da hamburgueria Soberano Burguer, com duas unidades (Santa Rita e João Pessoa, PB). Domínio: `www.soberanoburguerpb.com.br`.

## Stack
- Next.js 16.2.4 (App Router) · React 19 · TypeScript · Tailwind 4 · GSAP · Lenis · Base UI · Lucide
- Sem banco e sem login: conteúdo estático. As duas páginas de unidade são geradas por `generateStaticParams`.

## Comandos
- `npm run dev` (porta 3000) · `npm run build` · `npm run lint`

## Estrutura que importa
- `src/lib/unidades.ts`: dados e SEO de cada unidade (`santa-rita`, `joao-pessoa`). Mudou endereço, texto ou SEO de uma unidade, é aqui.
- `src/app/[unidade]/page.tsx`: página da unidade, montada com as seções de `src/components/sections/`.
- `src/app/sitemap.ts` e `robots.ts`: ao criar uma rota nova, incluir no sitemap.
- Imagens remotas só dos hosts liberados em `next.config.ts` (`www.google.com`, `upload.wikimedia.org`); `next/image` com qualidades 75 e 90.

## Publicação (atenção)
- A branch é **`master`**, não `main`. Push na `master` publica em produção: o GitHub Actions (`.github/workflows/deploy.yml`) roda `vercel --prod`. Publicar com `git push origin HEAD:master`, só depois de `npm run build` e `npm run lint` passarem.
- O repositório remoto é do cliente (`soberanoburguer/soberanoburguer`). Nunca exibir o `VERCEL_TOKEN`.

## Regras
- Fotos em WebP no tamanho de exibição; nada de base64. Mídia de origem (vídeos, prints, fotos brutas) não deve entrar no repositório; hoje há mídia em `content_source/` (decisão de mover para fora do repo ainda pendente).
- Texto do site em português (pt-BR).
- Antes de remover ou trocar algo, procurar quem usa. Depois do push, acompanhar o deploy até "Ready" e testar as duas páginas de unidade no site publicado.
