import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";
import { ExternalLink, UtensilsCrossed, FolderOpen, Calendar, ToggleRight, ToggleLeft } from "lucide-react";
import Link from "next/link";
import { RestaurantActions } from "@/components/superadmin/restaurant-actions";

export default async function RestaurantsPage() {
  let restaurants: any[] = [];
  let serviceRoleError = false;

  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("restaurants")
      .select("id, name, description, email, created_at, is_active, categories:categories(id), items:items(id)")
      .order("created_at", { ascending: false });
    restaurants = data ?? [];
  } catch {
    serviceRoleError = true;
    const supabase = await createClient();
    const { data } = await supabase
      .from("restaurants")
      .select("id, name, description, email, created_at, is_active")
      .order("created_at", { ascending: false });
    restaurants = data ?? [];
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-TN", { day: "2-digit", month: "short", year: "numeric" });

  const total    = restaurants.length;
  const active   = restaurants.filter((r) => r.is_active !== false).length;
  const inactive = restaurants.filter((r) => r.is_active === false).length;
  const now      = new Date();
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
          dans vos variables Vercel pour la gestion complete.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total",          value: total,        color: "text-primary" },
          { label: "Actifs",         value: active,       color: "text-green-400" },
          { label: "Desactives",     value: inactive,     color: "text-muted-foreground" },
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
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 bg-card/20">
          <h2 className="text-sm font-semibold text-foreground">
            Tous les restaurants <span className="text-muted-foreground font-normal ml-1">({total})</span>
          </h2>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />{active} actifs</span>
            {inactive > 0 && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-border" />{inactive} desactives</span>}
          </div>
        </div>

        {restaurants.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">Aucun restaurant trouvé.</p>
        ) : (
          <>
            <div className="hidden sm:grid grid-cols-[2fr_1.5fr_70px_70px_100px_70px_auto] gap-3 px-5 py-2.5 border-b border-border/20 bg-card/10">
              {["Restaurant", "Email", "Cat.", "Plats", "Inscrit le", "Statut", "Actions"].map((h) => (
                <p key={h} className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{h}</p>
              ))}
            </div>

            <div className="divide-y divide-border/15">
              {restaurants.map((r: any) => {
                const isActive = r.is_active !== false;
                return (
                  <div
                    key={r.id}
                    className={`grid grid-cols-1 sm:grid-cols-[2fr_1.5fr_70px_70px_100px_70px_auto] gap-3 items-center px-5 py-3.5 transition-colors ${!isActive ? "opacity-50 bg-card/5" : "hover:bg-card/30"}`}
                  >
                    {/* Name */}
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${isActive ? "bg-primary/10 border-primary/20" : "bg-muted/20 border-border/30"}`}>
                        <span className={`font-serif text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`}>{r.name?.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                        <p className="sm:hidden text-xs text-muted-foreground truncate">{r.email ?? "—"}</p>
                      </div>
                    </div>

                    <p className="hidden sm:block text-sm text-muted-foreground truncate">{r.email ?? "—"}</p>

                    <div className="hidden sm:flex items-center gap-1.5 text-sm">
                      <FolderOpen className="w-3 h-3 text-muted-foreground" />
                      <span>{r.categories?.length ?? "—"}</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 text-sm">
                      <UtensilsCrossed className="w-3 h-3 text-muted-foreground" />
                      <span className={r.items?.length > 0 ? "text-green-400 font-medium" : "text-muted-foreground"}>
                        {r.items?.length ?? "—"}
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />{fmt(r.created_at)}
                    </div>

                    {/* Status */}
                    <div className="hidden sm:flex items-center">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          <ToggleRight className="w-3 h-3" /> Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-border/30 text-muted-foreground border border-border/30">
                          <ToggleLeft className="w-3 h-3" /> Inactif
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/menu/${r.id}`}
                        target="_blank"
                        className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-primary transition-colors"
                        title="Voir le menu"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <RestaurantActions
                        restaurant={{
                          id: r.id,
                          name: r.name,
                          description: r.description ?? null,
                          is_active: r.is_active !== false,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
