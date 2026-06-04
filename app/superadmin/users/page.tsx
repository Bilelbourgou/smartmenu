import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";
import { Calendar, CheckCircle2, Clock, ShieldOff } from "lucide-react";
import { UserActions } from "@/components/superadmin/user-actions";

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
      id: r.user_id, email: r.email, created_at: r.created_at,
      email_confirmed_at: r.created_at, banned_until: null,
    }));
    restaurantMap = new Map((data ?? []).map((r: any) => [r.user_id, r]));
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-TN", { day: "2-digit", month: "short", year: "numeric" });

  const isBanned = (u: any) => u.banned_until && new Date(u.banned_until) > new Date();

  const active  = users.filter((u) => u.email_confirmed_at && !isBanned(u)).length;
  const banned  = users.filter((u) => isBanned(u)).length;
  const pending = users.filter((u) => !u.email_confirmed_at).length;
  const now     = new Date();
  const newThisMonth = users.filter((u) => {
    const d = new Date(u.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground mb-1">Utilisateurs</h1>
        <p className="text-sm text-muted-foreground">Gestion de tous les comptes de la plateforme</p>
      </div>

      {serviceRoleError && (
        <div className="mb-6 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 text-sm text-yellow-400">
          <strong>Configuration requise :</strong> Ajoutez{" "}
          <code className="bg-yellow-500/10 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
          dans vos variables Vercel pour la gestion complete des utilisateurs.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total",         value: users.length, color: "text-blue-400" },
          { label: "Actifs",        value: active,       color: "text-green-400" },
          { label: "Suspendus",     value: banned,       color: "text-destructive" },
          { label: "Ce mois",       value: newThisMonth, color: "text-primary" },
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
            Tous les utilisateurs <span className="text-muted-foreground font-normal ml-1">({users.length})</span>
          </h2>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />{active} actifs</span>
            {banned > 0 && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-destructive" />{banned} suspendus</span>}
          </div>
        </div>

        {users.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">Aucun utilisateur trouvé.</p>
        ) : (
          <>
            <div className="hidden sm:grid grid-cols-[2fr_1.5fr_100px_90px_auto] gap-4 px-5 py-2.5 border-b border-border/20 bg-card/10">
              {["Utilisateur", "Restaurant", "Inscrit le", "Statut", "Actions"].map((h) => (
                <p key={h} className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{h}</p>
              ))}
            </div>

            <div className="divide-y divide-border/15">
              {users.map((u: any) => {
                const resto    = restaurantMap.get(u.id);
                const banned_u = isBanned(u);
                return (
                  <div key={u.id} className={`grid grid-cols-1 sm:grid-cols-[2fr_1.5fr_100px_90px_auto] gap-3 items-center px-5 py-3.5 transition-colors ${banned_u ? "bg-destructive/3 hover:bg-destructive/5" : "hover:bg-card/30"}`}>
                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${banned_u ? "bg-destructive/10 border-destructive/20" : "bg-blue-400/10 border-blue-400/20"}`}>
                        <span className={`text-xs font-medium ${banned_u ? "text-destructive" : "text-blue-400"}`}>
                          {u.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">{u.email}</p>
                    </div>

                    {/* Restaurant */}
                    <p className="hidden sm:block text-sm text-muted-foreground truncate">
                      {resto?.name ?? <span className="italic">—</span>}
                    </p>

                    {/* Date */}
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />{fmt(u.created_at)}
                    </div>

                    {/* Status */}
                    <div className="hidden sm:block">
                      {banned_u ? (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                          <ShieldOff className="w-2.5 h-2.5" /> Suspendu
                        </span>
                      ) : u.email_confirmed_at ? (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          <Clock className="w-2.5 h-2.5" /> En attente
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <UserActions user={{ id: u.id, email: u.email, banned_until: u.banned_until ?? null }} />
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
