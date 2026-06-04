import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isSuperAdmin } from "@/lib/utils/is-superadmin";
import { SuperAdminSidebar } from "@/components/superadmin/superadmin-sidebar";

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !isSuperAdmin(user.email)) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background flex">
      <SuperAdminSidebar email={user.email!} />
      <main className="flex-1 overflow-auto pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
