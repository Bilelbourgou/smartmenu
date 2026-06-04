import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";
import { Store, Users, UtensilsCrossed, TrendingUp, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function SuperAdminDashboard() {
  let stats = { restaurants: 0, users: 0, items: 0, activeRestaurants: 0, newThisMonth: 0 };
  let recentRestaurants: any[] = [];
  let recentUsers: any[] = [];
  let serviceRoleError = false;

  try {
    const admin = createAdminClient();

    const [
      { data: restaurants },
      { count: itemCount },
      { data: authData },
    ] = await Promise.all([
      admin.from("restaurants").select("id, name, email, created_at, items:items(id)").order("created_at", { ascending: false }),
      admin.from("items").select("*", { count: "exact", head: true }),
      admin.auth.admin.listUsers({ perPage: 1000 }),
    ]);

    const now = new Date();
    const rList = restaurants ?? [];
    const uList = authData?.users ?? [];

    stats = {
      restaurants: rList.length,
      users: uList.length,
      items: itemCount ?? 0,
      activeRestaurants: rList.filter((r: any) => r.items?.length > 0).length,
      newThisMonth: rList.filter((r: any) => {
        const d = new Date(r.created_at);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length,
    };

    recentRestaurants = rList.slice(0, 5);
    recentUsers = uList
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  } catch {
    serviceRoleError = true;
    const supabase = await createClient();
    const { data } = await supabase.from("restaurants").select("id, name, email, created_at").order("created_at", { ascending: false });
    recentRestaurants = data ?? [];
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-TN", { day: "2-digit", month: "short", year: "numeric" });

  const statCards = [
    { label: "Restaurants",           value: stats.restaurants,        icon: Store,           color: "text-primary",    bg: "bg-primary/10" },
    { label: "Utilisateurs",          value: stats.users,              icon: Users,           color: "text-blue-400",   bg: "bg-blue-400/10" },
    { label: "Plats au total",        value: stats.items,              icon: UtensilsCrossed, color: "text-amber-400",  bg: "bg-amber-400/10" },
    { label: "Restaurants actifs",    value: stats.activeRestaurants,  icon: TrendingUp,      color: "text-green-400",  bg: "bg-green-400/10" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground mb-1">Vue d&apos;ensemble</h1>
        <p className="text-sm text-muted-foreground">
          Plateforme SmartMenu — {stats.newThisMonth} nouveau{stats.newThisMonth !== 1 ? "x" : ""} restaurant ce mois
        </p>
      </div>

      {serviceRoleError && (
        <div className="mb-6 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 text-sm text-yellow-400">
          <strong>Configuration requise :</strong> Ajoutez{" "}
          <code className="bg-yellow-500/10 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
          dans vos variables Vercel pour acceder a toutes les fonctionnalites.
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="p-5 rounded-2xl border border-border/40 bg-card/30">
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className={`text-2xl font-serif font-semibold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent restaurants */}
        <div className="rounded-2xl border border-border/40 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 bg-card/20">
            <h2 className="text-sm font-semibold text-foreground">Derniers restaurants</h2>
            <Link href="/superadmin/restaurants" className="text-xs text-primary hover:underline flex items-center gap-1">
              Voir tout <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentRestaurants.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Aucun restaurant</p>
          ) : (
            <div className="divide-y divide-border/20">
              {recentRestaurants.map((r: any) => (
                <div key={r.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="font-serif text-primary text-xs">{r.name?.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{fmt(r.created_at)}</p>
                  </div>
                  <Link href={`/menu/${r.id}`} target="_blank" className="text-primary hover:text-primary/70 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent users */}
        <div className="rounded-2xl border border-border/40 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 bg-card/20">
            <h2 className="text-sm font-semibold text-foreground">Derniers utilisateurs</h2>
            <Link href="/superadmin/users" className="text-xs text-primary hover:underline flex items-center gap-1">
              Voir tout <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentUsers.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              {serviceRoleError ? "Clé service requise" : "Aucun utilisateur"}
            </p>
          ) : (
            <div className="divide-y divide-border/20">
              {recentUsers.map((u: any) => (
                <div key={u.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-8 h-8 rounded-full bg-blue-400/10 border border-blue-400/20 flex items-center justify-center shrink-0">
                    <span className="text-blue-400 text-xs font-medium">{u.email?.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{u.email}</p>
                    <p className="text-xs text-muted-foreground">{fmt(u.created_at)}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${u.email_confirmed_at ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"}`}>
                    {u.email_confirmed_at ? "Actif" : "En attente"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
