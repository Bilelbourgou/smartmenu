"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, ShieldOff, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { deleteUserAction, updateUserAction, toggleBanUserAction } from "@/app/superadmin/actions";

interface UserActionsProps {
  user: { id: string; email: string; banned_until: string | null };
}

export function UserActions({ user }: UserActionsProps) {
  const [editOpen, setEditOpen]       = useState(false);
  const [deleteOpen, setDeleteOpen]   = useState(false);
  const [email, setEmail]             = useState(user.email);
  const [password, setPassword]       = useState("");
  const [error, setError]             = useState<string | null>(null);
  const [isPending, startTransition]  = useTransition();

  const isBanned = user.banned_until
    ? new Date(user.banned_until) > new Date()
    : false;

  const handleUpdate = () => {
    setError(null);
    startTransition(async () => {
      const res = await updateUserAction(user.id, {
        email: email !== user.email ? email : undefined,
        password: password || undefined,
      });
      if (res.error) { setError(res.error); return; }
      setEditOpen(false);
      setPassword("");
    });
  };

  const handleBanToggle = () => {
    startTransition(async () => {
      await toggleBanUserAction(user.id, !isBanned);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteUserAction(user.id);
      setDeleteOpen(false);
    });
  };

  return (
    <div className="flex items-center gap-1">
      {/* Edit */}
      <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground" onClick={() => setEditOpen(true)} title="Modifier">
        <Pencil className="w-3.5 h-3.5" />
      </Button>

      {/* Ban / Unban */}
      <Button
        variant="ghost" size="icon"
        className={`w-8 h-8 ${isBanned ? "text-green-400 hover:text-green-300" : "text-yellow-400 hover:text-yellow-300"}`}
        onClick={handleBanToggle}
        disabled={isPending}
        title={isBanned ? "Activer le compte" : "Suspendre le compte"}
      >
        {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : isBanned ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldOff className="w-3.5 h-3.5" />}
      </Button>

      {/* Delete */}
      <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-destructive" onClick={() => setDeleteOpen(true)} title="Supprimer">
        <Trash2 className="w-3.5 h-3.5" />
      </Button>

      {/* ── Edit dialog ── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Modifier l&apos;utilisateur</DialogTitle>
            <DialogDescription className="text-xs">{user.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {error && <p className="text-xs text-destructive bg-destructive/10 p-2 rounded-lg">{error}</p>}
            <div className="space-y-1.5">
              <Label htmlFor="u-email" className="text-xs">Adresse email</Label>
              <Input id="u-email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="u-pw" className="text-xs">Nouveau mot de passe <span className="text-muted-foreground">(laisser vide pour ne pas changer)</span></Label>
              <Input id="u-pw" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="text-sm" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setEditOpen(false)}>Annuler</Button>
            <Button size="sm" onClick={handleUpdate} disabled={isPending}>
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
            <DialogTitle className="font-serif text-destructive">Supprimer l&apos;utilisateur</DialogTitle>
            <DialogDescription>
              Cette action est <strong>irreversible</strong>. Le compte et toutes les donnees associees seront supprimes.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground bg-card/50 border border-border/50 rounded-lg p-3">{user.email}</p>
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
