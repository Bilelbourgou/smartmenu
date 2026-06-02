import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, UtensilsCrossed, Eye, QrCode } from "lucide-react";
import Link from "next/link";
import { QRCodeCard } from "@/components/admin/qr-code-card";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!restaurant) {
    redirect("/auth/login");
  }

  const { count: categoriesCount } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true })
    .eq("restaurant_id", restaurant.id);

  const { count: itemsCount } = await supabase
    .from("items")
    .select("*", { count: "exact", head: true })
    .eq("restaurant_id", restaurant.id);

  const menuUrl = `/menu/${restaurant.id}`;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground truncate">
          Bienvenue, {restaurant.name}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Gerez votre menu digital depuis ce tableau de bord
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
            <FolderOpen className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoriesCount || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Articles
            </CardTitle>
            <UtensilsCrossed className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{itemsCount || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Menu Public
            </CardTitle>
            <Eye className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Link 
              href={menuUrl} 
              target="_blank"
              className="text-sm text-primary hover:underline"
            >
              Voir le menu
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              QR Code
            </CardTitle>
            <QrCode className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Disponible ci-dessous</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="font-serif">Demarrage rapide</CardTitle>
            <CardDescription>
              Suivez ces etapes pour configurer votre menu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link
              href="/admin/categories"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="font-medium">Creer des categories</h3>
                <p className="text-sm text-muted-foreground">
                  Entrees, Plats, Desserts, Boissons...
                </p>
              </div>
            </Link>

            <Link
              href="/admin/items"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium">Ajouter des articles</h3>
                <p className="text-sm text-muted-foreground">
                  Noms, descriptions, prix et images
                </p>
              </div>
            </Link>

            <Link
              href={menuUrl}
              target="_blank"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium">Partager votre menu</h3>
                <p className="text-sm text-muted-foreground">
                  Via QR code ou lien direct
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <QRCodeCard restaurantId={restaurant.id} restaurantName={restaurant.name} />
      </div>
    </div>
  );
}
