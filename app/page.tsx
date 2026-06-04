import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CountUp } from "@/components/ui/count-up";
import {
  QrCode,
  Smartphone,
  BarChart3,
  CreditCard,
  Globe,
  Zap,
  RefreshCw,
  Star,
  MessageCircle,
  CheckCircle2,
  Clock,
  Package,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const WA = "https://wa.me/21651523772?text=Bonjour%2C%20je%20voudrais%20cr%C3%A9er%20mon%20menu%20digital%20avec%20SmartMenu.";

/* ─── data ─────────────────────────────────────────────── */

const features = [
  { icon: QrCode,      title: "Menu Digital QR",   desc: "Vos clients scannent et explorent votre carte instantanement depuis leur telephone." },
  { icon: CreditCard,  title: "Cartes QR Premium",  desc: "Cartes imprimees en materiaux haut de gamme, livrees directement a votre restaurant." },
  { icon: BarChart3,   title: "Statistiques",       desc: "Suivez les scans, les pages vues et les plats les plus consultes en temps reel." },
  { icon: Globe,       title: "Site Web",            desc: "Une page web professionnelle et elegante pour votre etablissement." },
];

const concepts = [
  { icon: Smartphone,  title: "Sans installation",        desc: "Vos clients accedent au menu directement depuis leur appareil photo. Aucune application a telecharger." },
  { icon: RefreshCw,   title: "Mises a jour instantanees", desc: "Modifiez vos plats, prix et disponibilites en temps reel depuis votre tableau de bord." },
  { icon: Star,        title: "Image premium",             desc: "Un menu digital luxueux qui renforce la perception haut de gamme de votre etablissement." },
];

const steps = [
  { n: "01", title: "Creez votre compte",    desc: "Inscrivez-vous gratuitement et configurez votre restaurant en quelques minutes." },
  { n: "02", title: "Ajoutez vos plats",     desc: "Importez vos categories, articles, prix et photos depuis votre tableau de bord." },
  { n: "03", title: "Telechargez votre QR",  desc: "Obtenez votre QR code personnalise pret a imprimer ou afficher sur vos tables." },
  { n: "04", title: "Vos clients scannent",  desc: "En un scan, vos clients decouvrent votre carte complete sur leur smartphone." },
];

const services = [
  { label: "Menu Digital QR",          status: "available" },
  { label: "QR Code personnalise",      status: "available" },
  { label: "Site Web Restaurant",       status: "available" },
  { label: "Gestion en temps reel",     status: "available" },
  { label: "Statistiques avancees",     status: "soon" },
  { label: "Caisse / POS",              status: "soon" },
  { label: "Gestion des stocks",        status: "soon" },
  { label: "Facturation digitale",      status: "soon" },
];

const testimonials = [
  { name: "Karim B.",  resto: "Le Carthage, Tunis",          rating: 5, text: "SmartMenu a transforme l'experience de nos clients. Plus de menus papier abimes, tout est elegant et moderne." },
  { name: "Sonia M.",  resto: "Dar Zarrouk, Sidi Bou Said",  rating: 5, text: "Mis en place en moins d'une heure. Nos clients adorent scanner le QR code. Je recommande vivement." },
  { name: "Yassine T.", resto: "Brasserie du Lac, Lac 2",    rating: 5, text: "Le design est vraiment premium. Ca correspond parfaitement a l'image de notre restaurant." },
];

/* ─── phone mockup ──────────────────────────────────────── */

function PhoneMockup() {
  const items = ["Foie gras poele", "Cote de boeuf wagyu", "Tarte tatin maison"];
  return (
    <div className="relative mx-auto w-[260px]">
      {/* glow behind phone */}
      <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-110" />
      {/* phone frame */}
      <div className="relative rounded-[36px] border-2 border-border bg-card overflow-hidden shadow-2xl">
        {/* notch */}
        <div className="flex justify-center pt-3 pb-1 bg-card">
          <div className="w-20 h-4 rounded-full bg-background" />
        </div>
        {/* restaurant header */}
        <div className="bg-background px-4 py-4 text-center border-b border-border/50">
          <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-2">
            <span className="font-serif text-primary text-xl">S</span>
          </div>
          <p className="font-serif text-foreground text-sm">Le Gourmet</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Restaurant Gastronomique</p>
        </div>
        {/* category pills */}
        <div className="flex gap-1.5 px-3 py-2 bg-background border-b border-border/50">
          {["Entrees", "Plats", "Desserts"].map((c, i) => (
            <span key={c} className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border/50"}`}>{c}</span>
          ))}
        </div>
        {/* items */}
        <div className="bg-background divide-y divide-border/30">
          {items.map((item) => (
            <div key={item} className="flex gap-2.5 px-3 py-2.5 items-center">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-foreground truncate">{item}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">Description courte</p>
                <p className="text-[10px] text-primary font-semibold mt-1">24.500 DT</p>
              </div>
            </div>
          ))}
        </div>
        {/* bottom bar */}
        <div className="bg-card px-4 py-3 flex items-center justify-center gap-1.5 border-t border-border/50">
          <QrCode className="w-3 h-3 text-primary" />
          <span className="text-[9px] text-muted-foreground">SmartMenu</span>
        </div>
        {/* home bar */}
        <div className="flex justify-center py-2 bg-card">
          <div className="w-24 h-1 rounded-full bg-border" />
        </div>
      </div>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Image src="/logo.png" alt="SmartMenu" width={160} height={64} className="h-14 w-auto object-contain shrink-0" />

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#concept"     className="hover:text-foreground transition-colors">Le concept</a>
            <a href="#how"         className="hover:text-foreground transition-colors">Comment ca marche</a>
            <a href="#services"    className="hover:text-foreground transition-colors">Services</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Avis clients</a>
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hidden sm:flex">
                Connexion
              </Button>
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="gap-1.5 bg-green-600 hover:bg-green-700 text-white border-0">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Demo gratuite</span>
                <span className="sm:hidden">WhatsApp</span>
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* background orbs */}
        <div className="orb-1 absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="orb-2 absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full bg-primary/4 blur-3xl pointer-events-none" />
        <div className="orb-3 absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-primary/6 blur-2xl pointer-events-none" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* text */}
            <div>
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary font-medium mb-6">
                <span className="badge-pulse w-1.5 h-1.5 rounded-full bg-primary" />
                La solution n°1 pour les restaurants tunisiens
              </div>

              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-6">
                Votre menu,{" "}
                <span className="gradient-text">digitalisé</span>{" "}
                et accessible en un scan
              </h1>

              <p className="hero-sub text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Offrez a vos clients une experience moderne et elegante. Creez votre menu digital professionnel en quelques minutes — sans application, sans friction.
              </p>

              <div className="hero-ctas flex flex-col sm:flex-row gap-3">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="w-full sm:w-auto text-base px-8 gold-glow gap-2">
                    Commencer gratuitement
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={WA} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 gap-2">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    Demander une demo
                  </Button>
                </a>
              </div>

              <div className="hero-ctas mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                {["Installation gratuite", "Sans engagement", "Support WhatsApp"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* mockup */}
            <div className="hero-mockup flex justify-center lg:justify-end">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 50,   suffix: "+",  label: "Restaurants partenaires" },
              { value: 10,   suffix: "k+", label: "Scans par mois" },
              { value: 5,    suffix: " min", label: "Pour configurer" },
              { value: 4.9,  suffix: "/5", label: "Note moyenne" },
            ].map(({ value, suffix, label }) => (
              <ScrollReveal key={label} className="text-center">
                <p className="text-3xl md:text-4xl font-serif text-primary mb-1">
                  <CountUp end={value} suffix={suffix} />
                </p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 border-b border-border/40">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">Fonctionnalites</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Tout ce dont votre restaurant a besoin
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Une plateforme complete pour digitaliser et valoriser votre experience client
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <div className="group h-full p-6 rounded-2xl border border-border/50 bg-card/30 hover:border-primary/40 hover:bg-card/60 transition-all duration-300 cursor-default">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCEPT ── */}
      <section id="concept" className="py-24 border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">Le concept</p>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6 leading-tight">
                Pourquoi passer au menu digital?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Le menu papier appartient au passe. Vos clients sont connectes — votre restaurant doit l'etre aussi. SmartMenu vous donne un outil professionnel, moderne et sans friction.
              </p>
              <Link href="/auth/sign-up">
                <Button variant="outline" className="gap-2">
                  Creer mon menu <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </ScrollReveal>

            <div className="space-y-5">
              {concepts.map(({ icon: Icon, title, desc }, i) => (
                <ScrollReveal key={title} direction="right" delay={i * 100}>
                  <div className="flex gap-4 p-5 rounded-2xl border border-border/40 bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 border-b border-border/40 bg-card/10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">Processus</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Comment ca marche?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              De l'inscription a la mise en ligne, tout se fait en moins de 10 minutes
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ n, title, desc }, i) => (
              <ScrollReveal key={n} delay={i * 100}>
                <div className="relative text-center p-6">
                  {/* connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+28px)] right-0 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                  )}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif text-primary text-lg">{n}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link href="/auth/sign-up">
              <Button size="lg" className="gold-glow gap-2 px-8">
                Demarrer maintenant <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 border-b border-border/40">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">Ecosysteme</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Nos services
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Disponibles aujourd'hui et en cours de developpement pour vous offrir toujours plus
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(({ label, status }, i) => (
              <ScrollReveal key={label} delay={i * 60}>
                <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors duration-300 ${status === "available" ? "border-primary/20 bg-primary/5 hover:border-primary/40" : "border-border/30 bg-card/20 opacity-60"}`}>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  {status === "available" ? (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                      Disponible
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-border/50 text-muted-foreground border border-border/30 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> Bientot
                    </span>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 border-b border-border/40 bg-card/10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">Temoignages</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Ce que disent nos clients
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, resto, rating, text }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="h-full p-6 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 flex flex-col gap-4">
                  <div className="flex gap-1">
                    {Array.from({ length: rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    &ldquo;{text}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{name}</p>
                    <p className="text-xs text-primary mt-0.5">{resto}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ── */}
      <section className="py-24 border-b border-border/40">
        <div className="container mx-auto px-4">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Obtenez votre menu en 24h
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              Contactez-nous sur WhatsApp. Nous creeons votre menu digital professionnel et vous le livrons pret a l'emploi — rapidement et sans effort de votre cote.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto text-base px-10 gap-3 bg-green-600 hover:bg-green-700 text-white border-0">
                  <MessageCircle className="w-5 h-5" />
                  Contacter sur WhatsApp
                </Button>
              </a>
              <Link href="/auth/sign-up">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                  Creer moi-meme
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-5 flex items-center justify-center gap-1.5">
              <Zap className="w-3 h-3 text-primary" />
              Reponse garantie en moins de 2 heures
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <ScrollReveal className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
            Pret a moderniser<br />votre restaurant?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Rejoignez les restaurants qui ont deja choisi SmartMenu pour digitaliser leur experience client.
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="text-base px-10 gold-glow gap-2">
              Creer mon menu gratuitement
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </ScrollReveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <Image src="/logo.png" alt="SmartMenu" width={220} height={88} className="h-24 w-auto object-contain" />
            </div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href="#concept"      className="hover:text-foreground transition-colors">Le concept</a>
              <a href="#how"          className="hover:text-foreground transition-colors">Comment ca marche</a>
              <a href="#services"     className="hover:text-foreground transition-colors">Services</a>
              <Link href="/auth/login" className="hover:text-foreground transition-colors">Connexion</Link>
              <Link href="/auth/sign-up" className="hover:text-foreground transition-colors">Inscription</Link>
            </nav>

            <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors">
              <MessageCircle className="w-4 h-4" />
              +216 51 523 772
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>© 2026 SmartMenu. Tous droits reserves.</span>
            <span>Fait avec passion pour les restaurants tunisiens 🇹🇳</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
