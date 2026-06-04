"use client";

import Image from "next/image";
import type { Item } from "@/lib/types";

interface MenuItemGridProps {
  item: Item;
}

export function MenuItemGrid({ item }: MenuItemGridProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-TN", {
      style: "decimal",
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(price);

  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border/30 hover:border-primary/25 transition-all duration-200 group">
      {/* Image */}
      <div className="relative aspect-square">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-primary/5 flex items-center justify-center">
            <span className="text-5xl opacity-15">🍽️</span>
          </div>
        )}
        {/* Price badge */}
        <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
          {formatPrice(item.price)} DT
        </div>
      </div>

      {/* Text */}
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground leading-tight group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
