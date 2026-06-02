import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CategoryList } from "@/components/admin/category-list";
import { CreateCategoryButton } from "@/components/admin/create-category-button";

export default async function CategoriesPage() {
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

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground truncate">
            Categories
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Organisez votre menu en categories
          </p>
        </div>
        <CreateCategoryButton restaurantId={restaurant.id} />
      </div>

      <CategoryList categories={categories || []} restaurantId={restaurant.id} />
    </div>
  );
}
