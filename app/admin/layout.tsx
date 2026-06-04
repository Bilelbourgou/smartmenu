import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { isSuperAdmin } from "@/lib/utils/is-superadmin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (isSuperAdmin(user.email)) {
    redirect("/superadmin");
  }

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!restaurant) {
    // User has no restaurant, create one
    const { data: newRestaurant, error } = await supabase
      .from("restaurants")
      .insert({
        user_id: user.id,
        name: user.user_metadata?.restaurant_name || "Mon Restaurant",
        email: user.email,
      })
      .select()
      .single();

    if (error || !newRestaurant) {
      redirect("/auth/login");
    }

    return (
      <div className="min-h-screen bg-background flex">
        <AdminSidebar restaurant={newRestaurant} />
        <main className="flex-1 overflow-auto pt-16 lg:pt-0">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar restaurant={restaurant} />
      <main className="flex-1 overflow-auto pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
