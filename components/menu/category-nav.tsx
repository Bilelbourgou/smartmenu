"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { CategoryWithItems } from "@/lib/types";

interface CategoryNavProps {
  categories: CategoryWithItems[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0]?.id || null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      for (let i = categories.length - 1; i >= 0; i--) {
        const el = document.getElementById(`category-${categories[i].id}`);
        if (el && el.offsetTop <= scrollY) {
          setActiveCategory(categories[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  // auto-scroll the active pill into view inside the nav bar
  useEffect(() => {
    if (!activeCategory || !scrollRef.current) return;
    const btn = scrollRef.current.querySelector(`[data-cat="${activeCategory}"]`) as HTMLElement | null;
    btn?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [activeCategory]);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(`category-${id}`);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
    setActiveCategory(id);
  };

  return (
    <nav data-menu-nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/30 shadow-sm">
      <div className="container mx-auto px-4">
        <div ref={scrollRef} className="flex gap-1.5 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <span className="text-base leading-none">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
