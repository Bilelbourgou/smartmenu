"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, Grid2x2, List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryWithItems, Item } from "@/lib/types";
import { MenuItem } from "./menu-item";
import { MenuItemGrid } from "./menu-item-grid";

interface MenuControlsProps {
  categories: CategoryWithItems[];
}

export function MenuControls({ categories }: MenuControlsProps) {
  const [search, setSearch]           = useState("");
  const [view, setView]               = useState<"grid" | "list">("grid");
  const [activeCategory, setActive]   = useState<string | null>(categories[0]?.id ?? null);
  const navRef                        = useRef<HTMLDivElement>(null);

  /* ── scroll → update active category ── */
  useEffect(() => {
    const handleScroll = () => {
      const offset = 130;
      for (let i = categories.length - 1; i >= 0; i--) {
        const el = document.getElementById(`category-${categories[i].id}`);
        if (el && el.offsetTop <= window.scrollY + offset) {
          setActive(categories[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  /* ── auto-scroll active pill into view ── */
  useEffect(() => {
    if (!activeCategory || !navRef.current) return;
    const btn = navRef.current.querySelector(`[data-cat="${activeCategory}"]`) as HTMLElement | null;
    btn?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [activeCategory]);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(`category-${id}`);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 110, behavior: "smooth" });
    setActive(id);
  };

  /* ── search filtering ── */
  const allItems = useMemo(
    () => categories.flatMap((c) => c.items),
    [categories]
  );

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    );
  }, [search, allItems]);

  /* ── render items ── */
  const renderItems = (items: Item[]) =>
    view === "grid" ? (
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => <MenuItemGrid key={item.id} item={item} />)}
      </div>
    ) : (
      <div className="grid gap-3">
        {items.map((item) => <MenuItem key={item.id} item={item} />)}
      </div>
    );

  return (
    <>
      {/* ── Sticky controls bar ── */}
      <div className="sticky top-0 z-40 bg-background/92 backdrop-blur-xl border-b border-border/30 shadow-sm">
        {/* Search + toggle */}
        <div className="container mx-auto max-w-2xl px-4 pt-3 pb-2 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-sm bg-card/60 border border-border/40 rounded-full focus:outline-none focus:border-primary/50 focus:bg-card transition-colors placeholder:text-muted-foreground/60"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-card/60 border border-border/30 shrink-0">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              title="Vue grille"
            >
              <Grid2x2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              title="Vue liste"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category pills */}
        {!searchResults && (
          <div ref={navRef} className="container mx-auto max-w-2xl px-4 pt-2 pb-3 flex gap-1.5 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                data-cat={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card/60 text-muted-foreground border border-border/30 hover:text-foreground hover:bg-card"
                )}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 pb-16 max-w-2xl">
        {searchResults !== null ? (
          /* Search results */
          <div className="py-6">
            <p className="text-xs text-muted-foreground mb-4">
              {searchResults.length} resultat{searchResults.length !== 1 ? "s" : ""} pour &ldquo;{search}&rdquo;
            </p>
            {searchResults.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-muted-foreground text-sm">Aucun plat trouve pour cette recherche</p>
              </div>
            ) : renderItems(searchResults)}
          </div>
        ) : (
          /* Category sections */
          categories.map((category) => {
            if (category.items.length === 0) return null;
            return (
              <section key={category.id} id={`category-${category.id}`} className="py-8">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl leading-none">{category.icon}</span>
                  <h2 className="text-base font-bold text-foreground uppercase tracking-wide">{category.name}</h2>
                  <span className="text-xs text-muted-foreground font-medium">· {category.items.length}</span>
                  <div className="flex-1 h-px bg-linear-to-r from-border/60 to-transparent" />
                </div>
                {renderItems(category.items)}
              </section>
            );
          })
        )}
      </div>
    </>
  );
}
