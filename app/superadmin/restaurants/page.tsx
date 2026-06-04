import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";
import { ExternalLink, UtensilsCrossed, FolderOpen, Calendar } from "lucide-react";
import Link from "next/link";

export default async function RestaurantsPage() {
  let restaurants: any[] = [];
  let serviceRoleError = false;

  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("restaurants")
      .select("id, name, email, created_at, categories:categories(id), items:items(id)")
      .order("created_at", { ascending: false });
    restaurants = data ?? [];
  } catch {
    serviceRoleError = true;
    const supabase = await createClient();
    const { data } = await supabase
      .from("restaurants")
      .select("id, name, email, created_at")
      .order("created_at", { ascending: false });
    restaurants = data ?? [];
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-TN", { day: "2-digit", month: "short", year: "numeric" });

  const total = restaurants.length;
  const active = restaurants.filter((r) => r.items?.length > 0).length;
  const now = new Date();
  const newThisMonth = restaurants.filter((r) => {
    const d = new Date(r.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground mb-1">Restaurants</h1>
        <p className="text-sm text-muted-foreground">Gestion de tous les restaurants de la plateforme</p>
      </div>

      {serviceRoleError && (
        <div className="mb-6 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 text-sm text-yellow-400">
          <strong>Configuration requise :</strong> Ajoutez{" "}
          <code className="bg-yellow-500/10 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
          dans vos variables Vercel pour acceder a toutes les donnees.
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total", value: total, color: "text-primary" },
          { label: "Actifs (avec plats)", value: active, color: "text-green-400" },
          { label: "Nouveaux ce mois", value: newThisMonth, color: "text-blue-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-4 rounded-2xl border border-border/40 bg-card/30 text-center">
            <p className={`text-2xl font-serif font-semibold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-border/30 bg-card/20">
          <h2 className="text-sm font-semibold text-foreground">
            Tous les restaurants <span className="text-muted-foreground font-normal ml-1">({total})</span>
          </h2>
        </div>

        {restaurants.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">Aucun restaurant trouvé.</p>
        ) : (
          <>
            {/* Header row */}
            <div className="hidden sm:grid grid-cols-[2fr_1.5fr_80px_80px_120px_48px] gap-4 px-5 py-2.5 border-b border-border/20 bg-card/10">
              {["Restaurant", "Email", "Categories", "Plats", "Inscrit le", ""].map((h) => (
                <p key={h} className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{h}</p>
              ))}
            </div>

            <div className="divide-y divide-border/15">
              {restaurants.map((r: any) => (
                <div key={r.id} className="grid grid-cols-1 sm:grid-cols-[2fr_1.5fr_80px_80px_120px_48px] gap-4 items-center px-5 py-4 hover:bg-card/30 transition-colors">
                  {/* Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <span className="font-serif text-primary text-sm">{r.name?.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                      <p className="sm:hidden text-xs text-muted-foreground truncate">{r.email ?? "—"}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <p className="hidden sm:block text-sm text-muted-foreground truncate">{r.email ?? "—"}</p>

                  {/* Categories */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <FolderOpen className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm text-foreground">{r.categories?.length ?? "—"}</span>
                  </div>

                  {/* Items */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className={`text-sm font-medium ${r.items?.length > 0 ? "text-green-400" : "text-muted-foreground"}`}>
                      {r.items?.length ?? "—"}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {fmt(r.created_at)}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 justify-end">
                    <Link
                      href={`/menu/${r.id}`}
                      target="_blank"
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary/70 transition-colors"
                      title="Voir le menu"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
