import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CountUp } from "@/components/ui/count-up";
import {
  QrCode, Smartphone, BarChart3, CreditCard, Globe, Zap,
  RefreshCw, Star, MessageCircle, CheckCircle2, Clock,
  ArrowRight, ChevronRight, Sparkles,
} from "lucide-react";

const WA = "https://wa.me/21651523772?text=Bonjour%2C%20je%20voudrais%20cr%C3%A9er%20mon%20menu%20digital%20avec%20SmartMenu.";

/* ─────── data ─────── */

const steps = [
  { n: "01", title: "Creez votre compte",   desc: "Inscrivez-vous gratuitement, configurez votre restaurant en quelques clics." },
  { n: "02", title: "Ajoutez vos plats",    desc: "Importez categories, articles, prix et photos depuis votre tableau de bord." },
  { n: "03", title: "Telechargez le QR",    desc: "Obtenez votre QR code unique, pret a imprimer ou afficher sur vos tables." },
  { n: "04", title: "Vos clients scannent", desc: "En un scan, ils decouvrent votre carte complete sur leur smartphone." },
];

const services = [
  { label: "Menu Digital QR",       status: "available" },
  { label: "QR Code personnalise",  status: "available" },
  { label: "Site Web Restaurant",   status: "available" },
  { label: "Gestion en temps reel", status: "available" },
  { label: "Statistiques avancees", status: "soon" },
  { label: "Caisse / POS",          status: "soon" },
  { label: "Gestion des stocks",    status: "soon" },
  { label: "Facturation digitale",  status: "soon" },
];

const testimonials = [
  { name: "Karim B.",   resto: "Le Carthage, Tunis",         rating: 5, text: "SmartMenu a transforme l'experience de nos clients. Plus de menus papier abimes, tout est elegant et moderne." },
  { name: "Sonia M.",   resto: "Dar Zarrouk, Sidi Bou Said", rating: 5, text: "Mis en place en moins d'une heure. Nos clients adorent scanner le QR code. Je recommande vivement." },
  { name: "Yassine T.", resto: "Brasserie du Lac, Lac 2",    rating: 5, text: "Le design est vraiment premium. Ca correspond parfaitement a l'image de notre restaurant." },
];

/* ─────── sub-components ─────── */

function PhoneMockup() {
  const items = ["Foie gras poele", "Cote de boeuf wagyu", "Tarte tatin maison"];
  return (
    <div className="relative w-[220px] mx-auto">
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 pointer-events-none" />
      <div className="relative rounded-[32px] border border-primary/20 bg-card shadow-2xl overflow-hidden">
        <div className="flex justify-center pt-2.5 pb-1 bg-card/80">
          <div className="w-16 h-3.5 rounded-full bg-background/80" />
        </div>
        <div className="bg-background/90 px-3 py-3 text-center border-b border-border/40">
          <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-1.5">
            <span className="font-serif text-primary text-base">S</span>
          </div>
          <p className="font-serif text-foreground text-[11px] leading-tight">Le Gourmet</p>
          <p className="text-[9px] text-muted-foreground mt-0.5">Restaurant Gastronomique</p>
        </div>
        <div className="flex gap-1 px-2.5 py-2 bg-background/80 border-b border-border/30">
          {["Entrees", "Plats", "Desserts"].map((c, i) => (
            <span key={c} className={`px-2 py-0.5 rounded-full text-[8px] font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border/40"}`}>{c}</span>
          ))}
        </div>
        <div className="bg-background/90 divide-y divide-border/20">
          {items.map((item) => (
            <div key={item} className="flex gap-2 px-2.5 py-2 items-center">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-medium text-foreground truncate">{item}</p>
                <p className="text-[8px] text-primary font-semibold mt-0.5">24.500 DT</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-2 bg-card/80">
          <div className="w-16 h-1 rounded-full bg-border/50" />
        </div>
      </div>
    </div>
  );
}

function QRPreview() {
  return (
    <div className="w-28 h-28 rounded-2xl bg-white p-2 mx-auto">
      <div className="w-full h-full rounded-xl bg-background relative overflow-hidden">
        {/* fake QR pattern */}
        <div className="absolute inset-2 grid grid-cols-5 grid-rows-5 gap-0.5">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className={`rounded-[1px] ${[0,1,5,6,3,4,8,9,15,16,20,21,18,19,23,24,12,7,17,11,13].includes(i) ? "bg-primary" : "bg-transparent"}`} />
          ))}
        </div>
        {/* corner squares */}
        <div className="absolute top-1.5 left-1.5 w-5 h-5 border-2 border-primary rounded-sm" />
        <div className="absolute top-1.5 right-1.5 w-5 h-5 border-2 border-primary rounded-sm" />
        <div className="absolute bottom-1.5 left-1.5 w-5 h-5 border-2 border-primary rounded-sm" />
      </div>
    </div>
  );
}

/* ─────── page ─────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ══ NAV ══ */}
      <header className="sticky top-0 z-50 bg-background/75 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <span className="text-xl font-serif text-primary flex-shrink-0">SmartMenu</span>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {[["#concept","Le concept"],["#how","Comment ca marche"],["#services","Services"],["#testimonials","Avis"]].map(([href, label]) => (
              <a key={href} href={href} className="nav-link hover:text-foreground transition-colors pb-0.5">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-foreground">Connexion</Button>
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="gap-1.5 bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg shadow-green-900/30">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Demo gratuite</span>
                <span className="sm:hidden">Demo</span>
              </Button>
            </a>
          </div>
        </div>
        <div className="gradient-line" />
      </header>

      {/* ══ HERO ══ */}
      <section className="spotlight grid-pattern relative min-h-[92vh] flex items-center overflow-hidden">
        {/* orbs */}
        <div className="orb-1 pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[100px]" />
        <div className="orb-2 pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px]" />

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* left */}
            <div className="max-w-xl">
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-xs text-primary font-medium mb-8 glass">
                <span className="badge-pulse w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                Nouveau — Menu digital pour restaurants tunisiens
              </div>

              <h1 className="hero-title font-serif leading-[1.05] tracking-tight mb-6">
                <span className="block text-5xl sm:text-6xl lg:text-7xl text-foreground">Votre menu,</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl gradient-text text-glow">digitalisé.</span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl text-muted-foreground/70 mt-1">En un scan.</span>
              </h1>

              <p className="hero-sub text-base sm:text-lg text-muted-foreground mb-9 leading-relaxed">
                Creez un menu digital luxueux accessible par QR code — sans application, sans friction. Vos clients scannent, vous brillez.
              </p>

              <div className="hero-ctas flex flex-wrap gap-3 mb-8">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="cta-glow gold-glow gap-2 px-7 text-base font-semibold">
                    Commencer gratuitement <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={WA} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2 px-7 text-base border-border/60 hover:border-primary/40">
                    <MessageCircle className="w-4 h-4 text-green-400" /> Voir une demo
                  </Button>
                </a>
              </div>

              <div className="hero-ctas flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                {["Gratuit pour commencer", "Aucune carte requise", "Support WhatsApp 7j/7"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary/70" />{t}
                  </span>
                ))}
              </div>
            </div>

            {/* right — phone mockup */}
            <div className="hero-mockup flex justify-center lg:justify-end">
              <div className="relative">
                {/* floating badge */}
                <div className="absolute -top-4 -left-6 z-20 glass grad-border rounded-2xl px-3 py-2 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-foreground">Nouveau scan</p>
                      <p className="text-[9px] text-muted-foreground">Table 4 — 14:32</p>
                    </div>
                  </div>
                </div>
                {/* floating stat */}
                <div className="absolute -bottom-2 -right-4 z-20 glass grad-border rounded-2xl px-3 py-2 shadow-xl">
                  <p className="text-[9px] text-muted-foreground mb-0.5">Ce mois-ci</p>
                  <p className="text-lg font-serif stat-num font-bold leading-none">847</p>
                  <p className="text-[9px] text-muted-foreground">scans</p>
                </div>
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="border-y border-border/30 bg-card/20 glass">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/30">
            {[
              { end: 50,  suf: "+",   label: "Restaurants" },
              { end: 10,  suf: "k+",  label: "Scans / mois" },
              { end: 5,   suf: " min", label: "Configuration" },
              { end: 98,  suf: "%",   label: "Satisfaction" },
            ].map(({ end, suf, label }, i) => (
              <ScrollReveal key={label} delay={i * 80} className="py-8 px-6 text-center">
                <p className="text-3xl sm:text-4xl font-serif stat-num font-bold mb-1 tabular-nums">
                  <CountUp end={end} suffix={suf} />
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BENTO FEATURES ══ */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal className="mb-14">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">Fonctionnalites</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight max-w-xl">
              Tout ce dont votre restaurant a besoin
            </h2>
          </ScrollReveal>

          {/* bento grid */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[168px]">

            {/* Large: QR Menu */}
            <ScrollReveal className="col-span-12 md:col-span-7 row-span-2 grad-border glass rounded-3xl p-7 relative overflow-hidden group card-inner-glow flex flex-col justify-between">
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-primary/5 blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
              <div>
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <QrCode className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Menu Digital QR</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  Vos clients scannent et explorent votre carte complete instantanement depuis leur telephone. Aucune application requise.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary font-medium group-hover:gap-3 transition-all">
                <span>Creer le mien</span><ChevronRight className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-6 right-7 opacity-60 group-hover:opacity-100 transition-opacity">
                <QRPreview />
              </div>
            </ScrollReveal>

            {/* Stat card */}
            <ScrollReveal delay={80} className="col-span-6 md:col-span-5 row-span-1 grad-border glass rounded-3xl p-6 relative overflow-hidden card-inner-glow">
              <div className="flex items-start justify-between h-full">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Scans aujourd'hui</p>
                  <p className="text-4xl font-serif stat-num font-bold tabular-nums leading-none">128</p>
                  <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                    <span>↑ 24%</span><span className="text-muted-foreground">vs hier</span>
                  </p>
                </div>
                <BarChart3 className="w-5 h-5 text-primary/50 mt-0.5" />
              </div>
            </ScrollReveal>

            {/* Speed */}
            <ScrollReveal delay={120} className="col-span-6 md:col-span-5 row-span-1 grad-border glass rounded-3xl p-6 relative overflow-hidden card-inner-glow group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Configuration</span>
              </div>
              <p className="text-3xl font-serif stat-num font-bold tabular-nums">&lt; 5<span className="text-lg"> min</span></p>
              <p className="text-xs text-muted-foreground mt-1">De l'inscription a la mise en ligne</p>
            </ScrollReveal>

            {/* Cartes QR */}
            <ScrollReveal delay={60} className="col-span-12 sm:col-span-6 md:col-span-4 row-span-1 grad-border glass rounded-3xl p-6 relative overflow-hidden card-inner-glow group">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Cartes QR Premium</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Materiaux haut de gamme, livrees directement a votre restaurant.</p>
            </ScrollReveal>

            {/* Site Web */}
            <ScrollReveal delay={100} className="col-span-12 sm:col-span-6 md:col-span-4 row-span-1 grad-border glass rounded-3xl p-6 relative overflow-hidden card-inner-glow group">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Site Web Restaurant</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Une page professionnelle et elegante pour votre etablissement.</p>
            </ScrollReveal>

            {/* Updates */}
            <ScrollReveal delay={140} className="col-span-12 md:col-span-4 row-span-1 grad-border glass rounded-3xl p-6 relative overflow-hidden card-inner-glow group">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <RefreshCw className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Mises a jour en direct</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Modifiez prix et disponibilites instantanement, en temps reel.</p>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══ CONCEPT ══ */}
      <section id="concept" className="py-28 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <ScrollReveal direction="left">
              <p className="text-xs uppercase tracking-widest text-primary font-medium mb-4">Le concept</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-6">
                Pourquoi passer<br />au menu digital?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base">
                Le menu papier appartient au passe. Vos clients sont connectes — votre restaurant doit l'etre aussi. SmartMenu vous donne un outil moderne, professionnel et sans friction.
              </p>
              <Link href="/auth/sign-up">
                <Button variant="outline" className="gap-2 border-border/50 hover:border-primary/50">
                  Creer mon menu <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </ScrollReveal>

            <div className="space-y-3">
              {[
                { icon: Smartphone, title: "Sans installation",          desc: "Vos clients accedent au menu depuis leur appareil photo. Aucune application a telecharger, zero friction." },
                { icon: RefreshCw,  title: "Mises a jour instantanees",  desc: "Modifiez plats, prix et disponibilites en temps reel depuis votre tableau de bord. Partout, tout le temps." },
                { icon: Sparkles,   title: "Image premium",              desc: "Un menu digital luxueux renforce la perception haut de gamme de votre etablissement et fidelise vos clients." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <ScrollReveal key={title} direction="right" delay={i * 100}>
                  <div className="flex gap-4 p-5 rounded-2xl glass grad-border card-inner-glow hover:border-primary/30 transition-colors duration-300 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how" className="py-28 border-t border-border/30 spotlight">
        <div className="container relative z-10 mx-auto px-4">
          <ScrollReveal className="text-center mb-20">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">Processus</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">Comment ca marche?</h2>
          </ScrollReveal>

          <div className="relative">
            {/* connecting line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map(({ n, title, desc }, i) => (
                <ScrollReveal key={n} delay={i * 90}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="relative w-20 h-20 rounded-3xl grad-border glass flex items-center justify-center mb-6 card-inner-glow group-hover:bg-primary/8 transition-colors duration-300">
                      <span className="font-serif text-2xl stat-num font-bold">{n}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal className="text-center mt-16">
            <Link href="/auth/sign-up">
              <Button size="lg" className="cta-glow gold-glow gap-2 px-9 text-base font-semibold">
                Demarrer maintenant <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section id="services" className="py-28 border-t border-border/30">
        <div className="container mx-auto px-4">
          <ScrollReveal className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">Ecosysteme</p>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight mb-4">Nos services</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Disponibles aujourd'hui et en developpement pour vous offrir toujours plus de valeur.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {services.map(({ label, status }, i) => (
                <ScrollReveal key={label} delay={i * 50}>
                  <div className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 ${status === "available" ? "glass grad-border card-inner-glow hover:border-primary/35" : "border-border/20 bg-card/10 opacity-50"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${status === "available" ? "bg-primary" : "bg-muted-foreground"}`} />
                      <span className="text-sm font-medium text-foreground">{label}</span>
                    </div>
                    {status === "available" ? (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/12 text-primary border border-primary/20">Live</span>
                    ) : (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-border/30 text-muted-foreground flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> Bientot
                      </span>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section id="testimonials" className="py-28 border-t border-border/30 bg-card/10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">Temoignages</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">Ce que disent nos clients</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map(({ name, resto, rating, text }, i) => (
              <ScrollReveal key={name} delay={i * 90}>
                <div className="h-full p-6 rounded-2xl glass grad-border card-inner-glow flex flex-col gap-5 hover:border-primary/30 transition-colors duration-300">
                  <div className="flex gap-1">
                    {Array.from({ length: rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border/20">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-primary text-xs">{name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{name}</p>
                      <p className="text-[10px] text-primary">{resto}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHATSAPP CTA ══ */}
      <section className="py-28 border-t border-border/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden glass grad-border card-inner-glow p-10 sm:p-16 text-center max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-green-950/20 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-green-500/12 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Obtenez votre menu en 24h</h2>
                <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                  Contactez-nous sur WhatsApp. Nous creeons votre menu digital professionnel et vous le livrons pret a l'emploi.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={WA} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full sm:w-auto px-9 gap-2 bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg shadow-green-900/30">
                      <MessageCircle className="w-4 h-4" /> Contacter sur WhatsApp
                    </Button>
                  </a>
                  <Link href="/auth/sign-up">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 border-border/50 hover:border-primary/40">
                      Creer moi-meme
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground mt-5 flex items-center justify-center gap-1.5">
                  <Zap className="w-3 h-3 text-primary" /> Reponse garantie en moins de 2 heures
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-32 border-t border-border/30 spotlight grid-pattern relative overflow-hidden">
        <div className="orb-3 pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
        <ScrollReveal className="container relative z-10 mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">Rejoignez-nous</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground mb-6 leading-tight">
            Pret a moderniser<br />votre restaurant?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            Rejoignez les restaurants qui ont choisi SmartMenu pour digitaliser leur experience client.
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="cta-glow gold-glow px-12 text-base font-semibold gap-2">
              Creer mon menu gratuitement <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </ScrollReveal>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-border/30 py-10 bg-card/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
            <div>
              <span className="font-serif text-primary text-xl">SmartMenu</span>
              <p className="text-xs text-muted-foreground mt-1.5 max-w-[200px] leading-relaxed">Menu digital de luxe pour restaurants tunisiens</p>
            </div>
            <div className="grid grid-cols-2 sm:flex gap-x-10 gap-y-3 text-sm text-muted-foreground">
              <a href="#concept"       className="hover:text-foreground transition-colors">Le concept</a>
              <a href="#how"           className="hover:text-foreground transition-colors">Processus</a>
              <a href="#services"      className="hover:text-foreground transition-colors">Services</a>
              <a href="#testimonials"  className="hover:text-foreground transition-colors">Avis clients</a>
              <Link href="/auth/login"    className="hover:text-foreground transition-colors">Connexion</Link>
              <Link href="/auth/sign-up"  className="hover:text-foreground transition-colors">Inscription</Link>
            </div>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-green-500/20 bg-green-500/5 text-green-400 hover:bg-green-500/10 transition-colors text-sm font-medium">
              <MessageCircle className="w-4 h-4" /> +216 51 523 772
            </a>
          </div>
          <div className="gradient-line mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>© 2026 SmartMenu. Tous droits reserves.</span>
            <span>Fait avec passion en Tunisie 🇹🇳</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
