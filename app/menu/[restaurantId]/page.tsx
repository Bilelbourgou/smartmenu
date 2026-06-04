import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { MenuHeader } from "@/components/menu/menu-header";
import { MenuControls } from "@/components/menu/menu-controls";
import { MenuFooter } from "@/components/menu/menu-footer";
import type { CategoryWithItems, Restaurant } from "@/lib/types";

interface PageProps {
  params: Promise<{ restaurantId: string }>;
}

const BASE_URL = 'https://smartmenu.tn';

export async function generateMetadata({ params }: PageProps) {
  const { restaurantId } = await params;
  const supabase = await createClient();
  const { data: r } = await supabase
    .from("restaurants")
    .select("name, description, logo_url")
    .eq("id", restaurantId)
    .single();

  if (!r) return { title: "Menu non trouve" };

  const title = `${r.name} — Menu Digital`;
  const description = r.description || `Consultez le menu de ${r.name} directement depuis votre telephone.`;
  const url = `${BASE_URL}/menu/${restaurantId}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'SmartMenu',
      images: r.logo_url ? [{ url: r.logo_url, alt: r.name }] : [{ url: '/logo.png', alt: 'SmartMenu' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: r.logo_url ? [r.logo_url] : ['/logo.png'],
    },
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

  if (!restaurant || restaurant.is_active === false) {
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

      {categoriesWithItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <p className="text-lg">Le menu est en cours de preparation...</p>
        </div>
      ) : (
        <MenuControls categories={categoriesWithItems} />
      )}

      <MenuFooter />
    </main>
  );
}
