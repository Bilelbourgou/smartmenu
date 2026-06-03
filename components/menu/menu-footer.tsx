"use client";

export function MenuFooter() {
  return (
    <footer className="py-8 border-t border-border/20 mt-8">
      <div className="container mx-auto px-4 flex flex-col items-center gap-1 text-center">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground/60">Propulse par</p>
        <span className="font-serif text-primary text-lg font-medium">SmartMenu</span>
        <p className="text-[11px] text-muted-foreground/50">Menu Digital de Luxe</p>
      </div>
    </footer>
  );
}
