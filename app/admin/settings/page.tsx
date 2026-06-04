"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getMenuUrl } from "@/lib/utils/url";
import { LogoUpload } from "@/components/admin/logo-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { Restaurant } from "@/lib/types";

export default function SettingsPage() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [name, setName]             = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress]       = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [mapsUrl, setMapsUrl]       = useState("");
  const [logoUrl, setLogoUrl]       = useState<string | null>(null);
  const [loading, setLoading]       = useState(false);
  const [saved, setSaved]           = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setRestaurant(data);
        setName(data.name);
        setDescription(data.description || "");
        setAddress(data.address || "");
        setFacebookUrl(data.facebook_url || "");
        setInstagramUrl(data.instagram_url || "");
        setMapsUrl(data.maps_url || "");
        setLogoUrl(data.logo_url || null);
      }
    };
    fetchRestaurant();
  }, [router]);

  const handleSave = async () => {
    if (!restaurant || !name.trim()) return;
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from("restaurants")
      .update({
        name: name.trim(),
        description: description.trim() || null,
        address: address.trim() || null,
        facebook_url: facebookUrl.trim() || null,
        instagram_url: instagramUrl.trim() || null,
        maps_url: mapsUrl.trim() || null,
        logo_url: logoUrl?.trim() || null,
      })
      .eq("id", restaurant.id);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  };

  if (!restaurant) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground">Parametres</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Configurez les informations de votre restaurant
        </p>
      </div>

      <div className="max-w-2xl space-y-4 sm:space-y-6">
        {/* Basic info */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-serif">Informations du restaurant</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Ces informations apparaissent sur votre menu public
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Nom du restaurant</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Le Gourmet" className="text-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm">Description (optionnel)</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Une cuisine raffinee au coeur de la ville..." rows={3} className="text-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm">Adresse (optionnel)</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)}
                placeholder="Entree Carthage Land, Yasmine Hammamet" className="text-sm" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Logo du restaurant (optionnel)</Label>
              <LogoUpload currentLogo={logoUrl} onLogoChange={setLogoUrl} />
            </div>
          </CardContent>
        </Card>

        {/* Social links */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-serif">Reseaux sociaux</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Ces liens apparaissent en haut de votre menu public
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-sm">Page Facebook</Label>
              <Input id="facebook" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder="https://facebook.com/votre-restaurant" className="text-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-sm">Compte Instagram</Label>
              <Input id="instagram" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/votre-restaurant" className="text-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maps" className="text-sm">Lien Google Maps</Label>
              <Input id="maps" value={mapsUrl} onChange={(e) => setMapsUrl(e.target.value)}
                placeholder="https://maps.google.com/?q=..." className="text-sm" />
            </div>
          </CardContent>
        </Card>

        {/* Save button */}
        <Button onClick={handleSave} disabled={!name.trim() || loading} className="w-full sm:w-auto">
          {loading ? <Spinner className="mr-2" /> : null}
          {saved ? "Enregistre!" : "Enregistrer les modifications"}
        </Button>

        {/* Menu link */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-serif">Lien du menu</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Partagez ce lien avec vos clients</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input readOnly value={getMenuUrl(restaurant.id)} className="bg-background/50 text-xs sm:text-sm" />
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(getMenuUrl(restaurant.id))} className="flex-shrink-0">
                Copier
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
