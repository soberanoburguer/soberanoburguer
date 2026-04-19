"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  isPopular?: boolean;
}

export default function ProductCard({ title, description, price, image, isPopular }: ProductCardProps) {
  return (
    <div className="group relative glass-card rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-orange/20">
      {isPopular && (
        <Badge className="absolute top-4 left-4 z-10 bg-soberano-gradient border-none font-bold uppercase text-[10px]">
          Best Seller
        </Badge>
      )}
      
      <div className="relative h-64 w-full overflow-hidden bg-white/5">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xl font-black">{title}</h4>
          <div className="flex items-center text-brand-amber gap-1">
            <Star className="w-4 h-4 fill-brand-amber" />
            <span className="text-xs font-bold">4.9</span>
          </div>
        </div>
        
        <p className="text-sm text-foreground/60 mb-6 line-clamp-2 h-10">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-brand-amber font-bold block uppercase tracking-tighter">A partir de</span>
            <span className="text-2xl font-black">R$ {price}</span>
          </div>
          
          <Button size="icon" className="rounded-full h-12 w-12 bg-white/5 hover:bg-soberano-gradient hover:text-white transition-all">
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
