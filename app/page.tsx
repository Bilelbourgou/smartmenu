import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QrCode, Smartphone, Settings, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-12 h-px bg-primary/50" />
              <span className="text-xs uppercase tracking-widest text-primary font-medium">
                Menu Digital de Luxe
              </span>
              <span className="w-12 h-px bg-primary/50" />
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-6 tracking-tight text-balance">
              Smart<span className="text-primary">Menu</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto text-pretty leading-relaxed">
              Transformez l&apos;experience de vos clients avec un menu digital elegant, 
              accessible par QR code, et facile a gerer.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/sign-up">
                <Button size="lg" className="text-base px-8 gold-glow">
                  Commencer gratuitement
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Pourquoi SmartMenu?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Une solution complete pour moderniser votre restaurant
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">QR Code</h3>
              <p className="text-sm text-muted-foreground">
                Generez automatiquement un QR code elegant pour vos tables
              </p>
            </div>

            <div className="group p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Mobile First</h3>
              <p className="text-sm text-muted-foreground">
                Interface optimisee pour une experience mobile parfaite
              </p>
            </div>

            <div className="group p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Facile a gerer</h3>
              <p className="text-sm text-muted-foreground">
                Modifiez votre menu en temps reel depuis votre tableau de bord
              </p>
            </div>

            <div className="group p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Design Premium</h3>
              <p className="text-sm text-muted-foreground">
                Une presentation luxueuse qui met en valeur vos plats
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Pret a moderniser votre menu?
            </h2>
            <p className="text-muted-foreground mb-8">
              Creez votre menu digital en quelques minutes, gratuitement.
            </p>
            <Link href="/auth/sign-up">
              <Button size="lg" className="text-base px-8 gold-glow">
                Creer mon menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="font-serif text-primary">SmartMenu</span>
            <span>-</span>
            <span>Menu Digital de Luxe</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
