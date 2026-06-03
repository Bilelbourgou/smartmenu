"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Restaurant } from "@/lib/types";

interface MenuHeaderProps {
  restaurant: Restaurant;
}

export function MenuHeader({ restaurant }: MenuHeaderProps) {
  const scrollToMenu = () => {
    const nav = document.querySelector("[data-menu-nav]") as HTMLElement | null;
    if (nav) window.scrollTo({ top: nav.offsetTop - 1, behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden min-h-[65vh]">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-card to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[320px] rounded-full bg-primary/7 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-7">
          {restaurant.logo_url ? (
            <div className="relative w-28 h-28 rounded-full overflow-hidden ring-[3px] ring-primary/25 ring-offset-4 ring-offset-background gold-glow shadow-2xl">
              <Image src={restaurant.logo_url} alt={restaurant.name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/25 to-primary/5 ring-[3px] ring-primary/25 ring-offset-4 ring-offset-background flex items-center justify-center gold-glow shadow-2xl">
              <span className="font-serif text-5xl text-primary">{restaurant.name.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-10 h-px bg-primary/35" />
          <span className="text-[11px] uppercase tracking-widest text-primary font-medium">Menu Digital</span>
          <span className="w-10 h-px bg-primary/35" />
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl font-serif text-foreground tracking-tight mb-3 text-balance">
          {restaurant.name}
        </h1>

        {/* Description */}
        {restaurant.description && (
          <p className="text-muted-foreground text-sm sm:text-base max-w-xs leading-relaxed mb-8">
            {restaurant.description}
          </p>
        )}

        {/* Scroll CTA */}
        <button
          onClick={scrollToMenu}
          className="group flex flex-col items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mt-2"
        >
          <span className="font-medium tracking-wide">Voir le menu</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </div>
  );
}
