import { Users, DollarSign, Megaphone, Package } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Dashboard Admin" };

const revenueData = [
  { name: "Ago", value: 45000 },
  { name: "Sep", value: 62000 },
  { name: "Oct", value: 78000 },
  { name: "Nov", value: 95000 },
  { name: "Dic", value: 112000 },
  { name: "Ene", value: 138000 },
  { name: "Feb", value: 156000 },
];

const recentUsers = [
  { name: "Maria Garcia", role: "INFLUENCER", date: "hace 2 horas" },
  { name: "TechStore AR", role: "SELLER", date: "hace 5 horas" },
  { name: "Carlos Rodriguez", role: "INFLUENCER", date: "hace 1 dia" },
  { name: "NaturalBeauty Co", role: "SELLER", date: "hace 1 dia" },
  { name: "Ana Martinez", role: "INFLUENCER", date: "hace 2 dias" },
];

const roleColors: Record<string, string> = {
  INFLUENCER: "bg-blue-500/10 text-blue-500",
  SELLER: "bg-green-500/10 text-green-500",
  ADMIN: "bg-purple-500/10 text-purple-500",
};

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground">
          Metricas globales de la plataforma
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Usuarios totales"
          value="2,847"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="Revenue mensual"
          value="$156,000"
          icon={DollarSign}
          trend={{ value: 13, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="Campanas activas"
          value="34"
          icon={Megaphone}
          trend={{ value: 8, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="Productos curados"
          value="1,245"
          icon={Package}
          description="en el catalogo"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EarningsChart title="Revenue mensual (ARS)" data={revenueData} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Usuarios recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.map((user, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.date}</p>
                </div>
                <Badge className={roleColors[user.role]} variant="secondary">
                  {user.role === "INFLUENCER" ? "Influencer" : "Vendedor"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
