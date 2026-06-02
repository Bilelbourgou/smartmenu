"use client";

export function MenuFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border/50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Propulse par</span>
          <span className="font-serif text-primary font-medium">SmartMenu</span>
        </div>
      </div>
    </footer>
  );
}
