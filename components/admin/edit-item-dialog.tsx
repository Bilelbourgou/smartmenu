"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import type { Item, Category } from "@/lib/types";

interface EditItemDialogProps {
  item: Item;
  categories: Category[];
  onClose: () => void;
}

export function EditItemDialog({ item, categories, onClose }: EditItemDialogProps) {
  const router = useRouter();
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description || "");
  const [price, setPrice] = useState(item.price.toString());
  const [categoryId, setCategoryId] = useState(item.category_id);
  const [imageUrl, setImageUrl] = useState(item.image_url || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !categoryId) return;

    setLoading(true);
    const supabase = createClient();

    await supabase
      .from("items")
      .update({
        category_id: categoryId,
        name: name.trim(),
        description: description.trim() || null,
        price: parseFloat(price) || 0,
        image_url: imageUrl.trim() || null,
      })
      .eq("id", item.id);

    setLoading(false);
    onClose();
    router.refresh();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Modifier l&apos;article</DialogTitle>
          <DialogDescription>
            Modifiez les informations de cet article
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-category">Categorie</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="edit-category">
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
            <Label htmlFor="edit-name">Nom de l&apos;article</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Salade Nicoise"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description (optionnel)</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Une delicieuse salade avec..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-price">Prix (TND)</Label>
            <Input
              id="edit-price"
              type="number"
              step="0.001"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="12.500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-imageUrl">URL de l&apos;image (optionnel)</Label>
            <Input
              id="edit-imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemple.com/image.jpg"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={!name.trim() || !categoryId || loading}>
            {loading ? <Spinner className="mr-2" /> : null}
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
