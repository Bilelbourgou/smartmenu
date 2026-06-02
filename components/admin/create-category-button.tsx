"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

interface CreateCategoryButtonProps {
  restaurantId: string;
}

const CATEGORY_ICONS = ["🍽️", "🥗", "🍖", "🍝", "🍕", "🍔", "🍣", "🍰", "🍹", "☕", "🍷", "🥤"];

export function CreateCategoryButton({ restaurantId }: CreateCategoryButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🍽️");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;

    setLoading(true);
    const supabase = createClient();

    // Get the highest position
    const { data: existingCategories } = await supabase
      .from("categories")
      .select("position")
      .eq("restaurant_id", restaurantId)
      .order("position", { ascending: false })
      .limit(1);

    const nextPosition = existingCategories && existingCategories.length > 0
      ? existingCategories[0].position + 1
      : 0;

    await supabase.from("categories").insert({
      restaurant_id: restaurantId,
      name: name.trim(),
      icon,
      position: nextPosition,
    });

    setName("");
    setIcon("🍽️");
    setLoading(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle categorie
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif">Nouvelle categorie</DialogTitle>
          <DialogDescription>
            Creez une nouvelle categorie pour organiser votre menu
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Icone</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-colors ${
                    icon === emoji
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nom de la categorie</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Entrees, Plats, Desserts..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim() || loading}>
            {loading ? <Spinner className="mr-2" /> : null}
            Creer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
