import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isSuperAdmin } from "@/lib/utils/is-superadmin";

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !isSuperAdmin(user.email)) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-primary text-lg">SmartMenu</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
              Super Admin
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
