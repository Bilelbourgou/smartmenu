"use client";

import Image from "next/image";
import type { Restaurant } from "@/lib/types";

interface MenuHeaderProps {
  restaurant: Restaurant;
}

export function MenuHeader({ restaurant }: MenuHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="flex flex-col items-center text-center gap-6">
          {restaurant.logo_url ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 gold-glow">
              <Image
                src={restaurant.logo_url}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center gold-glow">
              <span className="text-3xl font-serif text-primary">
                {restaurant.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-serif text-foreground tracking-tight text-balance">
              {restaurant.name}
            </h1>
            {restaurant.description && (
              <p className="text-muted-foreground text-lg max-w-md text-pretty">
                {restaurant.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-12 h-px bg-primary/30" />
            <span className="uppercase tracking-widest text-xs text-primary">Notre Carte</span>
            <span className="w-12 h-px bg-primary/30" />
          </div>
        </div>
      </div>
    </header>
  );
}
