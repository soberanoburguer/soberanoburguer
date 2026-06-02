import { notFound } from "next/navigation";
import { UNIDADES } from "@/lib/unidades";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import History from "@/components/sections/History";
import MenuHighlights from "@/components/sections/MenuHighlights";
import Reviews from "@/components/sections/Reviews";
import Atmosphere from "@/components/sections/Atmosphere";
import Footer from "@/components/sections/Footer";

interface PageProps {
  params: Promise<{ unidade: string }>;
}

export async function generateStaticParams() {
  return [
    { unidade: "santa-rita" },
    { unidade: "joao-pessoa" },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { unidade } = await params;
  const info = UNIDADES[unidade];

  if (!info) {
    return {};
  }

  return {
    title: info.seo.title,
    description: info.seo.description,
    keywords: info.seo.keywords,
    openGraph: {
      title: info.seo.title,
      description: info.seo.description,
      url: `/${info.slug}`,
    },
    twitter: {
      title: info.seo.title,
      description: info.seo.description,
    }
  };
}

export default async function Page({ params }: PageProps) {
  const { unidade } = await params;
  const info = UNIDADES[unidade];

  if (!info) {
    notFound();
  }

  // Schema local estruturado para o Google (SEO Local)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FastFoodRestaurant",
    "@id": `https://soberanoburguer.com.br/${info.slug}`,
    "name": `Soberano Burguer - ${info.cidade}`,
    "image": "https://soberanoburguer.com.br/images/og-image.png", // OG padrão
    "telephone": info.telefone,
    "url": `https://soberanoburguer.com.br/${info.slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": info.endereco.split(" - ")[0],
      "addressLocality": info.cidade,
      "addressRegion": "PB",
      "postalCode": info.cep,
      "addressCountry": "BR"
    },
    "servesCuisine": "Burgers, Fast Food, Artisanal Burgers",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "17:30",
        "closes": "00:00"
      }
    ]
  };

  return (
    <main className="relative min-h-screen">
      {/* Dados Estruturados de SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar unidade={info} />
      <div id="home">
        <Hero unidade={info} />
      </div>
      <div id="menu">
        <MenuHighlights unidade={info} />
      </div>
      <Reviews />
      <div id="location">
        <Atmosphere unidade={info} />
      </div>
      <div id="history">
        <History />
      </div>
      <Footer unidade={info} />
    </main>
  );
}
