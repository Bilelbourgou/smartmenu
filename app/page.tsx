import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  QrCode,
  Smartphone,
  Settings,
  Sparkles,
  Star,
  MessageCircle,
  ChevronRight,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react";

const WHATSAPP_NUMBER = "21651523772";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%2C%20je%20voudrais%20cr%C3%A9er%20mon%20menu%20digital%20avec%20SmartMenu.`;

const testimonials = [
  {
    name: "Karim B.",
    restaurant: "Le Carthage, Tunis",
    text: "SmartMenu a transforme l'experience de nos clients. Plus de menus papier abimes, tout est elegant et moderne.",
    rating: 5,
  },
  {
    name: "Sonia M.",
    restaurant: "Dar Zarrouk, Sidi Bou Said",
    text: "Mis en place en moins d'une heure. Nos clients scannent le QR code et adorent la presentation. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Yassine T.",
    restaurant: "Brasserie du Lac, Lac 2",
    text: "Le design est vraiment premium, ca correspond parfaitement a l'image de notre restaurant. Excellent service.",
    rating: 5,
  },
];

const menuExamples = [
  {
    name: "Le Gourmet",
    type: "Restaurant Gastronomique",
    items: ["Foie gras poele", "Cote de boeuf", "Tarte tatin"],
    accent: "from-amber-900/30 to-amber-950/10",
  },
  {
    name: "Sushi Zen",
    type: "Restaurant Japonais",
    items: ["Sashimi premium", "Dragon Roll", "Miso ramen"],
    accent: "from-red-900/30 to-red-950/10",
  },
  {
    name: "Casa Mia",
    type: "Trattoria Italienne",
    items: ["Burrata truffe", "Tagliatelle au saumon", "Tiramisu"],
    accent: "from-green-900/30 to-green-950/10",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-serif text-primary">SmartMenu</span>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Se connecter
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm" className="gold-glow">
                Commencer
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-24 md:py-36 relative">
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
              Offrez a vos clients une experience unique avec un menu digital elegant, accessible par QR code en quelques secondes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/sign-up">
                <Button size="lg" className="text-base px-8 gold-glow">
                  Creer mon menu gratuitement
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-base px-8 gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Nous contacter
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: QrCode, title: "QR Code", desc: "Generez automatiquement un QR code elegant pour vos tables" },
              { icon: Smartphone, title: "Mobile First", desc: "Interface optimisee pour une experience mobile parfaite" },
              { icon: Settings, title: "Facile a gerer", desc: "Modifiez votre menu en temps reel depuis votre tableau de bord" },
              { icon: Sparkles, title: "Design Premium", desc: "Une presentation luxueuse qui met en valeur vos plats" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Examples */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-px bg-primary/50" />
              <span className="text-xs uppercase tracking-widest text-primary font-medium">Exemples</span>
              <span className="w-8 h-px bg-primary/50" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Des menus pour tous les restaurants
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Gastronomique, traditionnel ou tendance — SmartMenu s'adapte a votre identite
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {menuExamples.map((example) => (
              <div
                key={example.name}
                className={`relative rounded-2xl border border-border/50 bg-gradient-to-br ${example.accent} p-6 overflow-hidden group hover:border-primary/30 transition-all duration-300`}
              >
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs uppercase tracking-widest text-primary mb-1">{example.type}</p>
                <h3 className="text-2xl font-serif text-foreground mb-4">{example.name}</h3>
                <ul className="space-y-2 mb-6">
                  {example.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                  <span>Voir ce style</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/auth/sign-up">
              <Button variant="outline" className="gap-2">
                Creer le votre <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-px bg-primary/50" />
              <span className="text-xs uppercase tracking-widest text-primary font-medium">Temoignages</span>
              <span className="w-8 h-px bg-primary/50" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Ce que disent nos clients
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border border-border/50 bg-card/30 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-primary">{t.restaurant}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Obtenez votre menu en 24h
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Envoyez-nous un message sur WhatsApp. Nous creeons votre menu digital professionnel et vous le livrons pret a l&apos;emploi.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-base px-10 gap-3 bg-green-600 hover:bg-green-700 text-white border-0">
                <MessageCircle className="w-5 h-5" />
                Contacter sur WhatsApp
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-4">
              Reponse garantie en moins de 2 heures
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <span className="font-serif text-primary text-base">SmartMenu</span>
            <span>Menu Digital de Luxe pour restaurants</span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
