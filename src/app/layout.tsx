import type { Metadata } from "next";
import { Montserrat, Teko, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/smooth-scroll";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["600"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baseUrl = "https://www.soberanoburguerpb.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Soberano Burguer | Hambúrguer Artesanal & Delivery em Santa Rita e Bayeux",
  description: "Blends artesanais criados por quem entende de carne. Peça o melhor hambúrguer de Santa Rita (Tibiri II) e Bayeux. Entrega rápida e sabor soberano!",
  keywords: [
    "hambúrguer artesanal",
    "delivery santa rita",
    "delivery bayeux",
    "soberano burguer",
    "melhor hambúrguer",
    "tibiri ii",
    "hamburgueria santa rita",
    "hamburgueria bayeux",
    "artesanal santa rita",
    "soberano burguer santa rita",
    "soberano burguer bayeux"
  ],
  icons: {
    icon: "/brand/monogram.svg",
    apple: "/brand/monogram.svg",
  },
  openGraph: {
    title: "Soberano Burguer | Hambúrguer Artesanal & Delivery em Santa Rita e Bayeux",
    description: "Blends artesanais criados por quem entende de carne. Peça o melhor hambúrguer de Santa Rita (Tibiri II) e Bayeux. Entrega rápida e sabor soberano!",
    siteName: "Soberano Burguer",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Soberano Burguer" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soberano Burguer | Hambúrguer Artesanal & Delivery em Santa Rita e Bayeux",
    description: "Blends artesanais criados por quem entende de carne. Peça o melhor hambúrguer de Santa Rita (Tibiri II) e Bayeux. Entrega rápida e sabor soberano!",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${baseUrl}/#restaurant`,
    "name": "Soberano Burguer",
    "image": `${baseUrl}/images/og-image.png`,
    "url": baseUrl,
    "telephone": "+5583986256727",
    "priceRange": "$$",
    "servesCuisine": "Hambúrguer, Burger, Artesanal",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R. Emb. Milton Cabral, 456",
      "addressLocality": "Tibiri II, Santa Rita",
      "addressRegion": "PB",
      "postalCode": "58302-510",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-7.1356",
      "longitude": "-34.9789"
    },
    "openingHoursSpecification": {
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
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Santa Rita",
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": "Paraíba"
        }
      },
      {
        "@type": "AdministrativeArea",
        "name": "Tibiri II",
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": "Santa Rita"
        }
      },
      {
        "@type": "AdministrativeArea",
        "name": "Bayeux",
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": "Paraíba"
        }
      }
    ],
    "hasMap": "https://www.google.com/maps/search/?api=1&query=R.+Emb.+Milton+Cabral,+456,+Tibiri,+Santa+Rita,+PB,+58302-510",
    "acceptsReservations": "false"
  };

  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${teko.variable} ${barlowCondensed.variable} dark h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
