import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExtendedOverview from "./ExtendedOverview";
import GeographicSection from "./GeographicSection";
import ProductProfitabilitySection from "./ProductProfitabilitySection";
import PhotoAnalysisSection from "./PhotoAnalysisSection";
import { useLanguage } from "@/i18n";

export default function DashboardTabs() {
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
        <TabsTrigger
          value="overview"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          data-testid="tab-overview"
        >
          {t.app.analytics.tabs.overviewGeneral}
        </TabsTrigger>
        <TabsTrigger
          value="geographic"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          data-testid="tab-geographic"
        >
          {t.app.analytics.tabs.geographicStores}
        </TabsTrigger>
        <TabsTrigger
          value="products"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          data-testid="tab-products"
        >
          {t.app.analytics.tabs.productProfitability}
        </TabsTrigger>
        <TabsTrigger
          value="photos"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          data-testid="tab-photos"
        >
          {t.app.analytics.tabs.photoAnalysis}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <ExtendedOverview />
      </TabsContent>

      <TabsContent value="geographic" className="mt-6">
        <GeographicSection />
      </TabsContent>

      <TabsContent value="products" className="mt-6">
        <ProductProfitabilitySection />
      </TabsContent>

      <TabsContent value="photos" className="mt-6">
        <PhotoAnalysisSection />
      </TabsContent>
    </Tabs>
  );
}
