"use client";

import Image from "next/image";
import type { Item } from "@/lib/types";

interface MenuItemProps {
  item: Item;
}

export function MenuItem({ item }: MenuItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-TN", {
      style: "decimal",
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(price);
  };

  return (
    <article className="group relative flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300 gold-glow-hover">
      {item.image_url && (
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <span className="text-lg font-serif text-primary whitespace-nowrap">
            {formatPrice(item.price)} <span className="text-xs text-muted-foreground">TND</span>
          </span>
        </div>

        {item.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2 text-pretty">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}
