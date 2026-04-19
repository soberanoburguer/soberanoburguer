import type { Metadata } from "next";
import { Montserrat, Teko, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/smooth-scroll";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export const metadata: Metadata = {
  title: "Soberano Burguer | O Reinado do Sabor",
  description: "Blends artesanais criados por quem entende de carne. O melhor hambúrguer de Santa Rita, PB.",
  keywords: ["hambúrguer artesanal", "delivery santa rita", "soberano burguer", "melhor hambúrguer", "tibiri"],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${teko.variable} ${barlowCondensed.variable} dark h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
