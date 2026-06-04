import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";
import { Users, Store, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";

export default async function SuperAdminPage() {
  let restaurants: any[] = [];
  let userCount = 0;
  let serviceRoleError = false;

  try {
    const admin = createAdminClient();

    const [{ data: rData }, { count }] = await Promise.all([
      admin.from("restaurants").select("*").order("created_at", { ascending: false }),
      admin.from("restaurants").select("*", { count: "exact", head: true }),
    ]);

    restaurants = rData ?? [];
    userCount = count ?? 0;
  } catch {
    serviceRoleError = true;
    // Fallback: show restaurants visible to the current user
    const supabase = await createClient();
    const { data } = await supabase.from("restaurants").select("*").order("created_at", { ascending: false });
    restaurants = data ?? [];
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-TN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground mb-1">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">Vue globale de tous les restaurants SmartMenu</p>
      </div>

      {serviceRoleError && (
        <div className="mb-6 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 text-sm text-yellow-400">
          <strong>Astuce :</strong> Ajoutez <code className="bg-yellow-500/10 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> dans vos variables Vercel pour voir tous les restaurants.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-2xl border border-border/40 bg-card/30">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
            <Store className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-serif text-primary font-semibold">{restaurants.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Restaurants</p>
        </div>
        <div className="p-5 rounded-2xl border border-border/40 bg-card/30">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-serif text-primary font-semibold">{userCount || restaurants.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Comptes</p>
        </div>
        <div className="col-span-2 md:col-span-1 p-5 rounded-2xl border border-border/40 bg-card/30">
          <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
            <Calendar className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-serif text-green-400 font-semibold">
            {restaurants.filter(r => {
              const d = new Date(r.created_at);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Nouveaux ce mois</p>
        </div>
      </div>

      {/* Restaurants table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-border/30 bg-card/20">
          <h2 className="text-sm font-semibold text-foreground">Tous les restaurants</h2>
        </div>

        {restaurants.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground text-sm">Aucun restaurant trouvé.</div>
        ) : (
          <div className="divide-y divide-border/20">
            {restaurants.map((r) => (
              <div key={r.id} className="flex items-center gap-4 px-5 py-4 hover:bg-card/30 transition-colors">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="font-serif text-primary text-sm">{r.name?.charAt(0) ?? "?"}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.email ?? "—"}</p>
                </div>

                {/* Date */}
                <p className="text-xs text-muted-foreground hidden sm:block shrink-0">
                  {formatDate(r.created_at)}
                </p>

                {/* Menu link */}
                <Link
                  href={`/menu/${r.id}`}
                  target="_blank"
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Menu</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
