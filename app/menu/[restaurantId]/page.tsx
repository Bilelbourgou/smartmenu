import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { MenuHeader } from "@/components/menu/menu-header";
import { CategoryNav } from "@/components/menu/category-nav";
import { MenuSection } from "@/components/menu/menu-section";
import { MenuFooter } from "@/components/menu/menu-footer";
import type { CategoryWithItems, Restaurant } from "@/lib/types";

interface PageProps {
  params: Promise<{ restaurantId: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { restaurantId } = await params;
  const supabase = await createClient();
  
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("name, description")
    .eq("id", restaurantId)
    .single();

  if (!restaurant) {
    return { title: "Menu non trouve" };
  }

  return {
    title: `${restaurant.name} - Menu`,
    description: restaurant.description || `Decouvrez le menu de ${restaurant.name}`,
  };
}

export default async function MenuPage({ params }: PageProps) {
  const { restaurantId } = await params;
  const supabase = await createClient();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", restaurantId)
    .single();

  if (!restaurant) {
    notFound();
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .eq("visible", true)
    .order("position", { ascending: true });

  const { data: items } = await supabase
    .from("items")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .eq("available", true)
    .order("position", { ascending: true });

  const categoriesWithItems: CategoryWithItems[] = (categories || []).map((category) => ({
    ...category,
    items: (items || []).filter((item) => item.category_id === category.id),
  }));

  return (
    <main className="min-h-screen bg-background">
      <MenuHeader restaurant={restaurant as Restaurant} />
      
      {categoriesWithItems.length > 0 && (
        <CategoryNav categories={categoriesWithItems} />
      )}

      <div className="container mx-auto px-4 pb-24">
        {categoriesWithItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-muted-foreground text-lg">
              Le menu est en cours de preparation...
            </p>
          </div>
        ) : (
          categoriesWithItems.map((category) => (
            <MenuSection key={category.id} category={category} />
          ))
        )}
      </div>

      <MenuFooter />
    </main>
  );
}
