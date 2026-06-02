"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit2, Trash2, ImageIcon } from "lucide-react";
import type { Item, Category } from "@/lib/types";
import { EditItemDialog } from "./edit-item-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ItemListProps {
  items: Item[];
  categories: Category[];
  restaurantId: string;
}

export function ItemList({ items, categories, restaurantId }: ItemListProps) {
  const router = useRouter();
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-TN", {
      style: "decimal",
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(price);
  };

  const handleToggleAvailability = async (item: Item) => {
    const supabase = createClient();
    await supabase
      .from("items")
      .update({ available: !item.available })
      .eq("id", item.id);

    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const supabase = createClient();
    await supabase.from("items").delete().eq("id", deleteId);

    setDeleteId(null);
    router.refresh();
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? `${category.icon} ${category.name}` : "Sans categorie";
  };

  if (items.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground text-center">
            Aucun article pour le moment.
            <br />
            Commencez par en creer un!
          </p>
        </CardContent>
      </Card>
    );
  }

  // Group items by category
  const itemsByCategory = categories.map((category) => ({
    category,
    items: items.filter((item) => item.category_id === category.id),
  }));

  return (
    <>
      <div className="space-y-8">
        {itemsByCategory.map(({ category, items: categoryItems }) => {
          if (categoryItems.length === 0) return null;

          return (
            <div key={category.id}>
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-sm text-muted-foreground">
                  ({categoryItems.length})
                </span>
              </h2>

              <div className="space-y-3">
                {categoryItems.map((item) => (
                  <Card key={item.id} className="border-border/50 bg-card/50">
                    <CardContent className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-3 md:p-4">
                      {/* Image */}
                      {item.image_url ? (
                        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                          <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate text-sm md:text-base">{item.name}</h3>
                        {item.description && (
                          <p className="text-xs md:text-sm text-muted-foreground truncate">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Price - visible on all sizes */}
                      <span className="font-serif text-primary text-sm md:text-base whitespace-nowrap">
                        {formatPrice(item.price)} TND
                      </span>

                      {/* Right section - stack on mobile */}
                      <div className="flex items-center gap-2 md:gap-3 flex-wrap md:flex-nowrap justify-end md:justify-start">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-muted-foreground hidden sm:inline">
                            {item.available ? "Disponible" : "Indisponible"}
                          </span>
                          <Switch
                            checked={item.available}
                            onCheckedChange={() => handleToggleAvailability(item)}
                            className="scale-75 md:scale-100"
                          />
                        </div>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingItem(item)}
                          className="h-8 w-8 md:h-10 md:w-10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteId(item.id)}
                          className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {editingItem && (
        <EditItemDialog
          item={editingItem}
          categories={categories}
          onClose={() => setEditingItem(null)}
        />
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet article?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irreversible. L&apos;article sera definitivement supprime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
