import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignUpSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-primary mb-2">SmartMenu</h1>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-serif">Verifiez votre email</CardTitle>
            <CardDescription>
              Un email de confirmation a ete envoye
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Veuillez cliquer sur le lien dans l&apos;email pour activer votre compte.
            </p>
            <Link 
              href="/auth/login" 
              className="text-primary hover:underline text-sm"
            >
              Retour a la connexion
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
