import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ItemList } from "@/components/admin/item-list";
import { CreateItemButton } from "@/components/admin/create-item-button";
import Link from "next/link";

export default async function ItemsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!restaurant) {
    redirect("/auth/login");
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("position", { ascending: true });

  const { data: items } = await supabase
    .from("items")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("position", { ascending: true });

  const hasCategories = categories && categories.length > 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground truncate">
            Articles
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Gerez les plats et boissons de votre menu
          </p>
        </div>
        {hasCategories ? (
          <CreateItemButton restaurantId={restaurant.id} categories={categories} />
        ) : null}
      </div>

      {!hasCategories ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-muted-foreground text-center mb-4">
            Vous devez d&apos;abord creer au moins une categorie avant d&apos;ajouter des articles.
          </p>
          <Link
            href="/admin/categories"
            className="text-primary hover:underline"
          >
            Creer une categorie
          </Link>
        </div>
      ) : (
        <ItemList items={items || []} categories={categories} restaurantId={restaurant.id} />
      )}
    </div>
  );
}
