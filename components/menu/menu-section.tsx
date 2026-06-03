"use client";

import type { CategoryWithItems } from "@/lib/types";
import { MenuItem } from "./menu-item";

interface MenuSectionProps {
  category: CategoryWithItems;
}

export function MenuSection({ category }: MenuSectionProps) {
  if (category.items.length === 0) return null;

  return (
    <section id={`category-${category.id}`} className="py-8">
      {/* Category header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl leading-none">{category.icon}</span>
        <h2 className="text-xl font-semibold text-foreground">{category.name}</h2>
        <div className="flex-1 h-px bg-linear-to-r from-border/60 to-transparent" />
        <span className="text-xs text-muted-foreground tabular-nums shrink-0">
          {category.items.length} {category.items.length === 1 ? "article" : "articles"}
        </span>
      </div>

      <div className="grid gap-3">
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
