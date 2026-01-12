import { BarChart3, TrendingUp, MessageSquare, Upload, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    {
      titleKey: "analytics",
      url: "/app/analytics",
      icon: BarChart3,
    },
    {
      titleKey: "forecasting",
      url: "/app/forecasting",
      icon: TrendingUp,
    },
    {
      titleKey: "digitalMarketing",
      url: "/app/digital-marketing",
      icon: MessageSquare,
    },
  ];

  const utilityItems = [
    {
      titleKey: "uploadData",
      url: "/app/upload",
      icon: Upload,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("klob_authenticated");
    setLocation("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b h-[6rem]">
        {/* Logo removido - ahora está en el header principal */}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-medium">{t.app.sidebar.modules}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton
                    onClick={() => setLocation(item.url)}
                    isActive={location === item.url}
                    data-testid={`nav-${item.url.slice(1)}`}
                    className="px-4 py-4 gap-4"
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="text-base font-medium">{t.app.sidebar[item.titleKey as keyof typeof t.app.sidebar]}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t.app.sidebar.support}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton
                    onClick={() => setLocation(item.url)}
                    isActive={location === item.url}
                    data-testid={`nav-${item.url.slice(1)}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{t.app.sidebar[item.titleKey as keyof typeof t.app.sidebar]}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start"
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t.nav.logout}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
