import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { KLOBLogo } from "@/components/KLOBLogo";
import { useLanguage } from "@/i18n";
import heroImage from "@assets/Captura de pantalla 2025-11-13 a las 16.46.15_1763048778435.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: t.app.login.requiredFields,
        description: t.app.login.requiredFieldsMessage,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      // Validar credenciales fijas
      if (username === "user" && password === "Klob17052001!") {
        localStorage.setItem("klob_authenticated", "true");
        localStorage.setItem("klob_user", username);
        setLocation("/app/upload");
        toast({
          title: t.app.login.accessGranted,
          description: `${t.app.login.welcome} ${username}`,
        });
      } else {
        toast({
          title: t.app.login.accessDenied,
          description: t.app.login.invalidCredentials,
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src={heroImage}
          alt="Fashion and lemons background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40 dark:bg-black/30" />
      </div>
      
      <header className="relative z-10 p-3 sm:p-4 md:p-6 flex items-center justify-between border-b bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <KLOBLogo className="h-8 sm:h-10 md:h-12 w-auto" />
        </div>
      </header>

      <div className="relative z-10 flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
        <Card className="w-full max-w-md p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6 shadow-xl border-2 bg-white dark:bg-gray-950">
          <div className="space-y-1 sm:space-y-2 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">KLOB Analytics</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t.app.login.subtitle}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="username" className="text-xs sm:text-sm font-medium">
                {t.app.login.username}
              </label>
              <Input
                id="username"
                type="text"
                placeholder={t.app.login.usernamePlaceholder}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                data-testid="input-username"
                className="h-10 sm:h-11 text-sm"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="password" className="text-xs sm:text-sm font-medium">
                {t.app.login.password}
              </label>
              <Input
                id="password"
                type="password"
                placeholder={t.app.login.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                data-testid="input-password"
                className="h-10 sm:h-11 text-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-11 text-sm sm:text-base font-semibold"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? t.app.login.loggingIn : t.app.login.loginButton}
            </Button>
          </form>

          <div className="text-center text-[10px] sm:text-xs text-muted-foreground pt-3 sm:pt-4 border-t">
            <p>{t.app.login.secureAccess}</p>
          </div>
        </Card>
      </div>

      <footer className="relative z-10 p-2 sm:p-3 md:p-4 text-center text-[10px] sm:text-xs md:text-sm text-white border-t bg-black/50 backdrop-blur-sm">
        <p>{t.app.login.copyright}</p>
      </footer>
    </div>
  );
}
