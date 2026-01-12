import { Switch, Route, useLocation, Redirect } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DataProvider } from "@/contexts/DataContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { LanguageProvider } from "@/i18n";
import Landing from "@/pages/Landing";
import About from "@/pages/About";
import Results from "@/pages/Results";
import FAQ from "@/pages/FAQ";
import Login from "@/pages/Login";
import Upload from "@/pages/Upload";
import Analytics from "@/pages/Analytics";
import Forecasting from "@/pages/Forecasting";
import DigitalMarketing from "@/pages/DigitalMarketing";
import NotFound from "@/pages/not-found";
import { KLOBLogo } from "@/components/KLOBLogo";
import aboutBgImage from "@assets/Captura de pantalla 2025-11-14 a las 12.37.02_1763120225665.png";

function ProtectedRoute({ component: Component }: { component: () => JSX.Element }) {
  const [, setLocation] = useLocation();
  const isAuthenticated = localStorage.getItem("klob_authenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <Component />;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full relative">
        {/* Background Image with Subtle Visibility */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={aboutBgImage}
            alt="Beach background"
            className="w-full h-full object-cover"
          />
          {/* Stronger overlay for reduced image visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-50/40 via-white/35 to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-blue-50/40 dark:from-gray-900/80 dark:via-gray-800/75 dark:to-gray-950/80"></div>
        </div>

        {/* Content (relative positioned to appear above background) */}
        <AppSidebar />
        <div className="flex flex-col flex-1 relative z-10">
          <header className="flex items-center justify-between p-6 border-b h-[6rem] bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-6">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="flex items-center gap-4">
                <KLOBLogo className="h-12 w-auto" />
                <div>
                  <p className="text-base font-medium leading-none" style={{ color: '#fde047' }}>
                    Retail Intelligence
                  </p>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/about" component={About} />
      <Route path="/results" component={Results} />
      <Route path="/faq" component={FAQ} />
      <Route path="/login" component={Login} />
      <Route path="/app/analytics">
        {() => (
          <ProtectedRoute
            component={() => (
              <AppLayout>
                <Analytics />
              </AppLayout>
            )}
          />
        )}
      </Route>
      <Route path="/app/forecasting">
        {() => (
          <ProtectedRoute
            component={() => (
              <AppLayout>
                <Forecasting />
              </AppLayout>
            )}
          />
        )}
      </Route>
      <Route path="/app/digital-marketing">
        {() => (
          <ProtectedRoute
            component={() => (
              <AppLayout>
                <DigitalMarketing />
              </AppLayout>
            )}
          />
        )}
      </Route>
      <Route path="/app/sentiment">
        {() => <Redirect to="/app/digital-marketing" />}
      </Route>
      <Route path="/app/upload">
        {() => (
          <ProtectedRoute
            component={() => (
              <AppLayout>
                <Upload />
              </AppLayout>
            )}
          />
        )}
      </Route>
      <Route path="/analytics">
        {() => <Redirect to="/app/analytics" />}
      </Route>
      <Route path="/dashboard">
        {() => <Redirect to="/app/analytics" />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <DataProvider>
            <Toaster />
            <Router />
          </DataProvider>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
