"use client";

import type { CategoryWithItems } from "@/lib/types";
import { MenuItem } from "./menu-item";

interface MenuSectionProps {
  category: CategoryWithItems;
}

export function MenuSection({ category }: MenuSectionProps) {
  if (category.items.length === 0) {
    return null;
  }

  return (
    <section id={`category-${category.id}`} className="py-10">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-3xl">{category.icon}</span>
        <h2 className="text-2xl md:text-3xl font-serif text-foreground">
          {category.name}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </div>

      <div className="grid gap-4">
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
