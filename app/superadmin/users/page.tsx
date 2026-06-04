import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";
import { ExternalLink, Calendar, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default async function UsersPage() {
  let users: any[] = [];
  let restaurantMap: Map<string, any> = new Map();
  let serviceRoleError = false;

  try {
    const admin = createAdminClient();

    const [{ data: authData }, { data: restaurants }] = await Promise.all([
      admin.auth.admin.listUsers({ perPage: 1000 }),
      admin.from("restaurants").select("id, name, user_id"),
    ]);

    restaurantMap = new Map((restaurants ?? []).map((r: any) => [r.user_id, r]));
    users = (authData?.users ?? []).sort(
      (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch {
    serviceRoleError = true;
    const supabase = await createClient();
    const { data } = await supabase.from("restaurants").select("id, name, user_id, email, created_at");
    users = (data ?? []).map((r: any) => ({
      id: r.user_id,
      email: r.email,
      created_at: r.created_at,
      email_confirmed_at: r.created_at,
    }));
    restaurantMap = new Map((data ?? []).map((r: any) => [r.user_id, r]));
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-TN", { day: "2-digit", month: "short", year: "numeric" });

  const active = users.filter((u) => u.email_confirmed_at).length;
  const pending = users.filter((u) => !u.email_confirmed_at).length;
  const now = new Date();
  const newThisMonth = users.filter((u) => {
    const d = new Date(u.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground mb-1">Utilisateurs</h1>
        <p className="text-sm text-muted-foreground">Tous les comptes inscrits sur la plateforme</p>
      </div>

      {serviceRoleError && (
        <div className="mb-6 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 text-sm text-yellow-400">
          <strong>Configuration requise :</strong> Ajoutez{" "}
          <code className="bg-yellow-500/10 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
          dans vos variables Vercel pour acceder a la liste complete.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total inscrits",    value: users.length, color: "text-blue-400" },
          { label: "Comptes actifs",    value: active,       color: "text-green-400" },
          { label: "Nouveaux ce mois",  value: newThisMonth, color: "text-primary" },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-4 rounded-2xl border border-border/40 bg-card/30 text-center">
            <p className={`text-2xl font-serif font-semibold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-border/30 bg-card/20 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Tous les utilisateurs <span className="text-muted-foreground font-normal ml-1">({users.length})</span>
          </h2>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />{active} actifs</span>
            {pending > 0 && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />{pending} en attente</span>}
          </div>
        </div>

        {users.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">Aucun utilisateur trouvé.</p>
        ) : (
          <>
            {/* Header */}
            <div className="hidden sm:grid grid-cols-[2fr_1.5fr_100px_80px] gap-4 px-5 py-2.5 border-b border-border/20 bg-card/10">
              {["Utilisateur", "Restaurant", "Inscrit le", "Statut"].map((h) => (
                <p key={h} className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{h}</p>
              ))}
            </div>

            <div className="divide-y divide-border/15">
              {users.map((u: any) => {
                const resto = restaurantMap.get(u.id);
                return (
                  <div key={u.id} className="grid grid-cols-1 sm:grid-cols-[2fr_1.5fr_100px_80px] gap-3 items-center px-5 py-4 hover:bg-card/30 transition-colors">
                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-400/10 border border-blue-400/20 flex items-center justify-center shrink-0">
                        <span className="text-blue-400 text-sm font-medium">{u.email?.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{u.email}</p>
                        {resto && (
                          <p className="sm:hidden text-xs text-muted-foreground truncate">{resto.name}</p>
                        )}
                      </div>
                    </div>

                    {/* Restaurant */}
                    <div className="hidden sm:flex items-center gap-2 min-w-0">
                      {resto ? (
                        <>
                          <span className="text-sm text-foreground truncate">{resto.name}</span>
                          <Link href={`/menu/${resto.id}`} target="_blank" className="text-primary hover:text-primary/70 transition-colors shrink-0">
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {fmt(u.created_at)}
                    </div>

                    {/* Status */}
                    <div className="hidden sm:block">
                      {u.email_confirmed_at ? (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          <Clock className="w-3 h-3" /> En attente
                        </span>
                      )}
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
