"use client";

import Image from "next/image";
import type { Item } from "@/lib/types";

interface MenuItemProps {
  item: Item;
}

export function MenuItem({ item }: MenuItemProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-TN", {
      style: "decimal",
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(price);

  return (
    <article className="group flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/30 hover:border-primary/25 hover:bg-card/80 transition-all duration-200">
      {/* Text — left */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <h3 className="font-semibold text-foreground text-[15px] leading-snug group-hover:text-primary transition-colors duration-200">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}

        <p className="mt-1.5 font-serif text-primary font-semibold text-base leading-none">
          {formatPrice(item.price)}{" "}
          <span className="text-xs font-sans text-muted-foreground font-normal">DT</span>
        </p>
      </div>

      {/* Image — right */}
      {item.image_url ? (
        <div className="relative w-22 h-22 rounded-xl overflow-hidden shrink-0 ring-1 ring-border/20">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="w-22 h-22 rounded-xl bg-primary/5 border border-border/20 shrink-0 flex items-center justify-center">
          <span className="text-2xl opacity-25">🍽️</span>
        </div>
      )}
    </article>
  );
}
