import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n";
import SentimentAnalysis from "./SentimentAnalysis";
import Influencers from "./Influencers";

export default function DigitalMarketing() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("sentiment");

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-6">
        <h1 className="text-3xl font-bold mb-2">{t.app.digitalMarketing.title}</h1>
        <p className="text-muted-foreground">{t.app.digitalMarketing.description}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b px-6">
          <TabsList className="h-12">
            <TabsTrigger 
              value="sentiment" 
              className="text-base"
              data-testid="tab-sentiment"
            >
              {t.app.digitalMarketing.tabs.sentiment}
            </TabsTrigger>
            <TabsTrigger 
              value="influencers" 
              className="text-base"
              data-testid="tab-influencers"
            >
              {t.app.digitalMarketing.tabs.influencers}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="sentiment" className="flex-1 overflow-auto mt-0">
          <SentimentAnalysis />
        </TabsContent>

        <TabsContent value="influencers" className="flex-1 overflow-auto mt-0">
          <Influencers />
        </TabsContent>
      </Tabs>
    </div>
  );
}
