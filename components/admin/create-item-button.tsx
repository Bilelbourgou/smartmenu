"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import type { Category } from "@/lib/types";

interface CreateItemButtonProps {
  restaurantId: string;
  categories: Category[];
}

export function CreateItemButton({ restaurantId, categories }: CreateItemButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || !categoryId) return;

    setLoading(true);
    const supabase = createClient();

    // Get the highest position in this category
    const { data: existingItems } = await supabase
      .from("items")
      .select("position")
      .eq("category_id", categoryId)
      .order("position", { ascending: false })
      .limit(1);

    const nextPosition = existingItems && existingItems.length > 0
      ? existingItems[0].position + 1
      : 0;

    await supabase.from("items").insert({
      restaurant_id: restaurantId,
      category_id: categoryId,
      name: name.trim(),
      description: description.trim() || null,
      price: parseFloat(price) || 0,
      image_url: imageUrl.trim() || null,
      position: nextPosition,
    });

    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setCategoryId(categories[0]?.id || "");
    setLoading(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouvel article
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Nouvel article</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau plat ou boisson a votre menu
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categorie</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Selectionnez une categorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nom de l&apos;article</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Salade Nicoise"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optionnel)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Une delicieuse salade avec..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Prix (TND)</Label>
            <Input
              id="price"
              type="number"
              step="0.001"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="12.500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL de l&apos;image (optionnel)</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemple.com/image.jpg"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim() || !categoryId || loading}>
            {loading ? <Spinner className="mr-2" /> : null}
            Creer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
