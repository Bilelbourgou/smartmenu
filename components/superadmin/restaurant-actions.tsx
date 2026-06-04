"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  deleteRestaurantAction, updateRestaurantAction, toggleRestaurantActiveAction,
} from "@/app/superadmin/actions";

interface RestaurantActionsProps {
  restaurant: { id: string; name: string; description: string | null; is_active: boolean };
}

export function RestaurantActions({ restaurant }: RestaurantActionsProps) {
  const [editOpen, setEditOpen]       = useState(false);
  const [deleteOpen, setDeleteOpen]   = useState(false);
  const [name, setName]               = useState(restaurant.name);
  const [description, setDescription] = useState(restaurant.description ?? "");
  const [error, setError]             = useState<string | null>(null);
  const [isPending, startTransition]  = useTransition();

  const handleUpdate = () => {
    if (!name.trim()) return;
    setError(null);
    startTransition(async () => {
      const res = await updateRestaurantAction(restaurant.id, {
        name: name.trim(),
        description: description.trim() || null,
      });
      if (res.error) { setError(res.error); return; }
      setEditOpen(false);
    });
  };

  const handleToggleActive = () => {
    startTransition(async () => {
      await toggleRestaurantActiveAction(restaurant.id, !restaurant.is_active);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteRestaurantAction(restaurant.id);
      setDeleteOpen(false);
    });
  };

  return (
    <div className="flex items-center gap-1">
      {/* Edit */}
      <Button
        variant="ghost" size="icon"
        className="w-8 h-8 text-muted-foreground hover:text-foreground"
        onClick={() => setEditOpen(true)}
        title="Modifier"
      >
        <Pencil className="w-3.5 h-3.5" />
      </Button>

      {/* Toggle active */}
      <Button
        variant="ghost" size="icon"
        className={`w-8 h-8 ${restaurant.is_active ? "text-green-400 hover:text-yellow-400" : "text-muted-foreground hover:text-green-400"}`}
        onClick={handleToggleActive}
        disabled={isPending}
        title={restaurant.is_active ? "Desactiver" : "Activer"}
      >
        {isPending
          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
          : restaurant.is_active
            ? <ToggleRight className="w-4 h-4" />
            : <ToggleLeft className="w-4 h-4" />
        }
      </Button>

      {/* Delete */}
      <Button
        variant="ghost" size="icon"
        className="w-8 h-8 text-muted-foreground hover:text-destructive"
        onClick={() => setDeleteOpen(true)}
        title="Supprimer"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>

      {/* ── Edit dialog ── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Modifier le restaurant</DialogTitle>
            <DialogDescription className="text-xs">ID: {restaurant.id.slice(0, 8)}…</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {error && <p className="text-xs text-destructive bg-destructive/10 p-2 rounded-lg">{error}</p>}
            <div className="space-y-1.5">
              <Label htmlFor="r-name" className="text-xs">Nom du restaurant <span className="text-destructive">*</span></Label>
              <Input id="r-name" value={name} onChange={(e) => setName(e.target.value)} className="text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r-desc" className="text-xs">Description <span className="text-muted-foreground">(optionnel)</span></Label>
              <Textarea
                id="r-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="text-sm resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setEditOpen(false)}>Annuler</Button>
            <Button size="sm" onClick={handleUpdate} disabled={isPending || !name.trim()}>
              {isPending && <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete confirm dialog ── */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-destructive">Supprimer le restaurant</DialogTitle>
            <DialogDescription>
              Cette action est <strong>irreversible</strong>. Le restaurant, toutes ses categories et tous ses plats seront supprimes.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm font-medium text-foreground bg-card/50 border border-border/50 rounded-lg p-3">
            {restaurant.name}
          </p>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDeleteOpen(false)}>Annuler</Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
              {isPending && <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />}
              Supprimer definitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
