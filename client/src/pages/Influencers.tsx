import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Heart,
  MessageCircle,
  MousePointer,
  ShoppingCart,
  Link as LinkIcon,
  Plus,
  Edit,
  XCircle,
} from "lucide-react";

export default function Influencers() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("engagement");

  // Mock data para engagement KPIs
  const kpiData = {
    totalPosts: 127,
    totalEngagement: 45230,
    avgEngagementRate: 4.2,
    totalRevenue: 12450,
  };

  const influencerData = [
    {
      id: 1,
      name: "@fashionista_maria",
      campaign: "Spring Collection",
      posts: 15,
      likes: 8500,
      comments: 320,
      clicks: 450,
      orders: 23,
      revenue: 2340,
      engagementRate: 5.2,
    },
    {
      id: 2,
      name: "@style_by_laura",
      campaign: "Summer Trends",
      posts: 12,
      likes: 6200,
      comments: 215,
      clicks: 380,
      orders: 18,
      revenue: 1890,
      engagementRate: 4.8,
    },
    {
      id: 3,
      name: "@urban_chic_anna",
      campaign: "New Arrivals",
      posts: 10,
      likes: 5100,
      comments: 185,
      clicks: 320,
      orders: 15,
      revenue: 1650,
      engagementRate: 4.1,
    },
  ];

  const linkManagementData = [
    {
      id: 1,
      influencer: "@fashionista_maria",
      campaign: "Spring Collection",
      link: "klob.tech/spring-maria",
      discountCode: "MARIA20",
      status: "active",
      created: "2025-03-15",
    },
    {
      id: 2,
      influencer: "@style_by_laura",
      campaign: "Summer Trends",
      link: "klob.tech/summer-laura",
      discountCode: "LAURA15",
      status: "active",
      created: "2025-04-20",
    },
    {
      id: 3,
      influencer: "@urban_chic_anna",
      campaign: "New Arrivals",
      link: "klob.tech/new-anna",
      discountCode: "ANNA10",
      status: "inactive",
      created: "2025-05-10",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger 
            value="engagement"
            data-testid="tab-engagement"
          >
            {t.app.digitalMarketing.influencers.tabs.engagement}
          </TabsTrigger>
          <TabsTrigger 
            value="management"
            data-testid="tab-management"
          >
            {t.app.digitalMarketing.influencers.tabs.management}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {t.app.digitalMarketing.influencers.engagement.title}
            </h2>
            <p className="text-muted-foreground">
              {t.app.digitalMarketing.influencers.engagement.description}
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t.app.digitalMarketing.influencers.engagement.totalPosts}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="kpi-total-posts">
                  {kpiData.totalPosts}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t.app.digitalMarketing.influencers.engagement.totalEngagement}
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="kpi-total-engagement">
                  {kpiData.totalEngagement.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t.app.digitalMarketing.influencers.engagement.avgEngagementRate}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="kpi-avg-engagement">
                  {kpiData.avgEngagementRate}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t.app.digitalMarketing.influencers.engagement.totalRevenue}
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="kpi-total-revenue">
                  €{kpiData.totalRevenue.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Influencer Ranking Table */}
          <Card>
            <CardHeader>
              <CardTitle>{t.app.digitalMarketing.influencers.engagement.ranking}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">
                        {t.app.digitalMarketing.influencers.engagement.influencer}
                      </th>
                      <th className="text-left p-2 font-medium">
                        {t.app.digitalMarketing.influencers.engagement.campaign}
                      </th>
                      <th className="text-right p-2 font-medium">
                        {t.app.digitalMarketing.influencers.engagement.posts}
                      </th>
                      <th className="text-right p-2 font-medium">
                        <Heart className="h-4 w-4 inline" />
                      </th>
                      <th className="text-right p-2 font-medium">
                        <MessageCircle className="h-4 w-4 inline" />
                      </th>
                      <th className="text-right p-2 font-medium">
                        <MousePointer className="h-4 w-4 inline" />
                      </th>
                      <th className="text-right p-2 font-medium">
                        <ShoppingCart className="h-4 w-4 inline" />
                      </th>
                      <th className="text-right p-2 font-medium">
                        {t.app.digitalMarketing.influencers.engagement.revenue}
                      </th>
                      <th className="text-right p-2 font-medium">
                        {t.app.digitalMarketing.influencers.engagement.engagementRate}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {influencerData.map((influencer) => (
                      <tr key={influencer.id} className="border-b hover-elevate">
                        <td className="p-2 font-medium">{influencer.name}</td>
                        <td className="p-2 text-muted-foreground">{influencer.campaign}</td>
                        <td className="p-2 text-right">{influencer.posts}</td>
                        <td className="p-2 text-right">{influencer.likes.toLocaleString()}</td>
                        <td className="p-2 text-right">{influencer.comments}</td>
                        <td className="p-2 text-right">{influencer.clicks}</td>
                        <td className="p-2 text-right">{influencer.orders}</td>
                        <td className="p-2 text-right">€{influencer.revenue.toLocaleString()}</td>
                        <td className="p-2 text-right">
                          <Badge variant="secondary">{influencer.engagementRate}%</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {t.app.digitalMarketing.influencers.management.title}
              </h2>
              <p className="text-muted-foreground">
                {t.app.digitalMarketing.influencers.management.description}
              </p>
            </div>
            <Button data-testid="button-create-influencer">
              <Plus className="h-4 w-4 mr-2" />
              {t.app.digitalMarketing.influencers.management.createInfluencer}
            </Button>
          </div>

          {/* Create Form (collapsed by default, would expand on button click) */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>{t.app.digitalMarketing.influencers.management.createInfluencer}</CardTitle>
              <CardDescription>
                {t.app.digitalMarketing.influencers.management.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="influencer-name">
                    {t.app.digitalMarketing.influencers.management.influencerName}
                  </Label>
                  <Input 
                    id="influencer-name"
                    placeholder="@username"
                    data-testid="input-influencer-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">
                    {t.app.digitalMarketing.influencers.management.platform}
                  </Label>
                  <Input 
                    id="platform"
                    placeholder="Instagram, TikTok, etc."
                    data-testid="input-platform"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign">
                    {t.app.digitalMarketing.influencers.management.campaignName}
                  </Label>
                  <Input 
                    id="campaign"
                    placeholder="Spring Collection"
                    data-testid="input-campaign"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount-code">
                    {t.app.digitalMarketing.influencers.management.discountCode}
                  </Label>
                  <Input 
                    id="discount-code"
                    placeholder="CODE20"
                    data-testid="input-discount-code"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button data-testid="button-save">
                  {t.app.digitalMarketing.influencers.management.save}
                </Button>
                <Button variant="outline" data-testid="button-cancel">
                  {t.app.digitalMarketing.influencers.management.cancel}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Links & Discounts Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t.app.digitalMarketing.influencers.management.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">
                        {t.app.digitalMarketing.influencers.engagement.influencer}
                      </th>
                      <th className="text-left p-2 font-medium">
                        {t.app.digitalMarketing.influencers.engagement.campaign}
                      </th>
                      <th className="text-left p-2 font-medium">
                        {t.app.digitalMarketing.influencers.management.link}
                      </th>
                      <th className="text-left p-2 font-medium">
                        {t.app.digitalMarketing.influencers.management.discountCode}
                      </th>
                      <th className="text-left p-2 font-medium">
                        {t.app.digitalMarketing.influencers.management.status}
                      </th>
                      <th className="text-left p-2 font-medium">
                        {t.app.digitalMarketing.influencers.management.createdDate}
                      </th>
                      <th className="text-right p-2 font-medium">
                        {t.app.digitalMarketing.influencers.management.actions}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {linkManagementData.map((item) => (
                      <tr key={item.id} className="border-b hover-elevate">
                        <td className="p-2 font-medium">{item.influencer}</td>
                        <td className="p-2 text-muted-foreground">{item.campaign}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-mono">{item.link}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline">{item.discountCode}</Badge>
                        </td>
                        <td className="p-2">
                          <Badge variant={item.status === "active" ? "default" : "secondary"}>
                            {item.status === "active" 
                              ? t.app.digitalMarketing.influencers.management.active
                              : t.app.digitalMarketing.influencers.management.inactive
                            }
                          </Badge>
                        </td>
                        <td className="p-2 text-muted-foreground">{item.created}</td>
                        <td className="p-2">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="icon" variant="ghost" data-testid={`button-edit-${item.id}`}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" data-testid={`button-deactivate-${item.id}`}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
