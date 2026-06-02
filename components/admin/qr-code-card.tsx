"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import QRCode from "qrcode";

interface QRCodeCardProps {
  restaurantId: string;
  restaurantName: string;
}

export function QRCodeCard({ restaurantId, restaurantName }: QRCodeCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [menuUrl, setMenuUrl] = useState("");

  useEffect(() => {
    const url = `${window.location.origin}/menu/${restaurantId}`;
    setMenuUrl(url);

    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 200,
        margin: 2,
        color: {
          dark: "#C9A84C",
          light: "#0D0B09",
        },
      });
    }
  }, [restaurantId]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = `${restaurantName.toLowerCase().replace(/\s+/g, "-")}-qr-code.png`;
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="font-serif">QR Code du menu</CardTitle>
        <CardDescription>
          Imprimez ce QR code pour vos tables
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="p-4 rounded-lg bg-[#0D0B09] border border-border gold-glow">
          <canvas ref={canvasRef} />
        </div>

        <div className="flex gap-2 w-full">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Telecharger
          </Button>
          <Button variant="outline" onClick={handleCopy} className="flex-1">
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copie!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copier le lien
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center break-all">
          {menuUrl}
        </p>
      </CardContent>
    </Card>
  );
}
