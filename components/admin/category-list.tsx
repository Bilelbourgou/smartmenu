"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Edit2, Trash2, GripVertical, Check, X } from "lucide-react";
import type { Category } from "@/lib/types";
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

interface CategoryListProps {
  categories: Category[];
  restaurantId: string;
}

export function CategoryList({ categories, restaurantId }: CategoryListProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditIcon(category.icon);
  };

  const handleSave = async (categoryId: string) => {
    const supabase = createClient();
    await supabase
      .from("categories")
      .update({ name: editName, icon: editIcon })
      .eq("id", categoryId);

    setEditingId(null);
    router.refresh();
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName("");
    setEditIcon("");
  };

  const handleToggleVisibility = async (category: Category) => {
    const supabase = createClient();
    await supabase
      .from("categories")
      .update({ visible: !category.visible })
      .eq("id", category.id);

    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const supabase = createClient();
    await supabase.from("categories").delete().eq("id", deleteId);

    setDeleteId(null);
    router.refresh();
  };

  if (categories.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground text-center">
            Aucune categorie pour le moment.
            <br />
            Commencez par en creer une!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {categories.map((category) => (
          <Card key={category.id} className="border-border/50 bg-card/50">
            <CardContent className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4">
              <GripVertical className="hidden sm:block w-5 h-5 text-muted-foreground cursor-grab flex-shrink-0" />

              {editingId === category.id ? (
                <>
                  <Input
                    value={editIcon}
                    onChange={(e) => setEditIcon(e.target.value)}
                    className="w-full sm:w-16 text-center text-sm sm:text-base"
                    placeholder="Icon"
                  />
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 text-sm sm:text-base"
                    placeholder="Nom de la categorie"
                  />
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleSave(category.id)} className="h-8 w-8 sm:h-10 sm:w-10">
                      <Check className="w-4 h-4 text-green-500" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8 sm:h-10 sm:w-10">
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-xl sm:text-2xl flex-shrink-0">{category.icon}</span>
                  <span className="flex-1 font-medium text-sm sm:text-base truncate">{category.name}</span>

                  <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {category.visible ? "Visible" : "Cache"}
                    </span>
                    <Switch
                      checked={category.visible}
                      onCheckedChange={() => handleToggleVisibility(category)}
                      className="scale-75 sm:scale-100"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(category)} className="h-8 w-8 sm:h-10 sm:w-10">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setDeleteId(category.id)}
                      className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette categorie?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irreversible. Tous les articles de cette categorie seront egalement supprimes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
