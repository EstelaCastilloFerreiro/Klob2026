import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import DashboardTabs from "@/components/DashboardTabs";
import Chatbot from "@/components/Chatbot";
import { useLanguage } from "@/i18n";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeft } from "lucide-react";

export default function Analytics() {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(true);
  
  return (
    <div className="flex h-full bg-gradient-to-br from-stone-50/30 via-white to-yellow-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
      <aside 
        className={`hidden md:block transition-all duration-300 ${
          showFilters ? 'w-auto opacity-100' : 'w-0 opacity-0 overflow-hidden'
        }`}
      >
        <FilterSidebar />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-stone-600 bg-clip-text text-transparent tracking-tight">
                  {t.app.analytics.title}
                </h1>
                <p className="text-muted-foreground mt-2 font-light">
                  {t.app.analytics.description}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="hidden md:flex"
                data-testid="button-toggle-filters"
              >
                {showFilters ? (
                  <PanelLeftClose className="h-4 w-4" />
                ) : (
                  <PanelLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <DashboardTabs />
        </main>
      </div>

      <Chatbot section="analytics" />
    </div>
  );
}
