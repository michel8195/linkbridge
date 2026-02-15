import { Megaphone, Users, DollarSign, Eye } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Dashboard Vendedor" };

const campaignData = [
  { name: "Ene", value: 45000 },
  { name: "Feb", value: 62000 },
  { name: "Mar", value: 58000 },
  { name: "Abr", value: 78000 },
  { name: "May", value: 95000 },
  { name: "Jun", value: 88000 },
  { name: "Jul", value: 112000 },
];

const recentCampaigns = [
  { name: "Tech Summer 2025", status: "ACTIVE", influencers: 24, spent: 45000 },
  { name: "Belleza Natural", status: "ACTIVE", influencers: 18, spent: 28000 },
  { name: "Back to School", status: "DRAFT", influencers: 0, spent: 0 },
  { name: "Fitness 2025", status: "COMPLETED", influencers: 32, spent: 62000 },
];

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-500/10 text-green-500",
  DRAFT: "bg-yellow-500/10 text-yellow-500",
  COMPLETED: "bg-muted text-muted-foreground",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Activa",
  DRAFT: "Borrador",
  COMPLETED: "Completada",
};

export default function SellerOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-muted-foreground">
          Resumen de tus campanas y rendimiento
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Campanas activas"
          value="2"
          icon={Megaphone}
          description="de 4 totales"
        />
        <StatsCard
          title="Influencers conectados"
          value="42"
          icon={Users}
          trend={{ value: 18, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="Inversion total"
          value="$135,000"
          icon={DollarSign}
          description="acumulado"
        />
        <StatsCard
          title="Impresiones generadas"
          value="1.2M"
          icon={Eye}
          trend={{ value: 25, isPositive: true }}
          description="vs. mes anterior"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EarningsChart
            title="Inversion en campanas (ARS)"
            data={campaignData}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Campanas recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentCampaigns.map((campaign) => (
              <div
                key={campaign.name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium text-sm">{campaign.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {campaign.influencers} influencers
                  </p>
                </div>
                <Badge
                  className={statusColors[campaign.status]}
                  variant="secondary"
                >
                  {statusLabels[campaign.status]}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
