import { Users, MousePointerClick, TrendingUp, ShoppingCart } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Analiticas" };

const userGrowth = [
  { name: "Ago", value: 180 },
  { name: "Sep", value: 250 },
  { name: "Oct", value: 420 },
  { name: "Nov", value: 580 },
  { name: "Dic", value: 720 },
  { name: "Ene", value: 950 },
  { name: "Feb", value: 1200 },
];

const clicksData = [
  { name: "Ago", value: 12000 },
  { name: "Sep", value: 18000 },
  { name: "Oct", value: 25000 },
  { name: "Nov", value: 32000 },
  { name: "Dic", value: 45000 },
  { name: "Ene", value: 52000 },
  { name: "Feb", value: 68000 },
];

const topProducts = [
  { name: "Auriculares Bluetooth TWS", clicks: 8900, conversions: 312 },
  { name: "Smartwatch Deportivo", clicks: 7200, conversions: 245 },
  { name: "Teclado Mecanico RGB", clicks: 5600, conversions: 198 },
  { name: "Set de Maquillaje", clicks: 4800, conversions: 156 },
  { name: "Zapatillas Running", clicks: 4200, conversions: 134 },
];

const topNiches = [
  { name: "Tecnologia", percentage: 35 },
  { name: "Moda", percentage: 22 },
  { name: "Belleza", percentage: 18 },
  { name: "Hogar", percentage: 12 },
  { name: "Deportes", percentage: 8 },
  { name: "Otros", percentage: 5 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analiticas</h1>
        <p className="text-muted-foreground">
          Metricas detalladas de la plataforma
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Registros este mes"
          value="247"
          icon={Users}
          trend={{ value: 32, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="Clicks este mes"
          value="68,000"
          icon={MousePointerClick}
          trend={{ value: 31, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="Conversion promedio"
          value="3.5%"
          icon={TrendingUp}
          trend={{ value: 0.3, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="Ventas generadas"
          value="2,380"
          icon={ShoppingCart}
          trend={{ value: 18, isPositive: true }}
          description="vs. mes anterior"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <EarningsChart title="Crecimiento de usuarios" data={userGrowth} />
        <EarningsChart title="Clicks mensuales" data={clicksData} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top productos por clicks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topProducts.map((product, i) => (
              <div
                key={product.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm">{product.name}</span>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium">
                    {product.clicks.toLocaleString()} clicks
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.conversions} conv.
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribucion por nicho</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topNiches.map((niche) => (
              <div key={niche.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{niche.name}</span>
                  <span className="font-medium">{niche.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${niche.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
