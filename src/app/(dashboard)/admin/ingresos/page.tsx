import { DollarSign, TrendingUp, CreditCard, Percent } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Ingresos" };

const revenueData = [
  { name: "Ago", value: 45000 },
  { name: "Sep", value: 62000 },
  { name: "Oct", value: 78000 },
  { name: "Nov", value: 95000 },
  { name: "Dic", value: 112000 },
  { name: "Ene", value: 138000 },
  { name: "Feb", value: 156000 },
];

const revenueBreakdown = [
  {
    source: "Comisiones de campanas",
    amount: 98000,
    percentage: 63,
  },
  {
    source: "Suscripciones Pro",
    amount: 42000,
    percentage: 27,
  },
  {
    source: "Fees de plataforma",
    amount: 16000,
    percentage: 10,
  },
];

const recentTransactions = [
  {
    description: "Campana Tech Summer - Fee",
    amount: 25000,
    type: "campaign_fee",
    date: "15 Feb 2025",
  },
  {
    description: "Suscripcion Pro - maria@email.com",
    amount: 2900,
    type: "subscription",
    date: "14 Feb 2025",
  },
  {
    description: "Campana Belleza Natural - Fee",
    amount: 12000,
    type: "campaign_fee",
    date: "13 Feb 2025",
  },
  {
    description: "Suscripcion Pro - carlos@email.com",
    amount: 2900,
    type: "subscription",
    date: "12 Feb 2025",
  },
  {
    description: "Campana Fitness - Fee final",
    amount: 18000,
    type: "campaign_fee",
    date: "10 Feb 2025",
  },
];

const typeLabels: Record<string, { label: string; className: string }> = {
  campaign_fee: { label: "Campana", className: "bg-blue-500/10 text-blue-500" },
  subscription: { label: "Suscripcion", className: "bg-green-500/10 text-green-500" },
  platform_fee: { label: "Plataforma", className: "bg-purple-500/10 text-purple-500" },
};

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ingresos</h1>
        <p className="text-muted-foreground">
          Revenue tracking y desglose de ingresos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Revenue total"
          value="$686,000"
          icon={DollarSign}
          description="ultimos 7 meses"
        />
        <StatsCard
          title="Revenue este mes"
          value="$156,000"
          icon={TrendingUp}
          trend={{ value: 13, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="MRR"
          value="$42,000"
          icon={CreditCard}
          trend={{ value: 5, isPositive: true }}
          description="suscripciones"
        />
        <StatsCard
          title="Margen promedio"
          value="68%"
          icon={Percent}
          description="sobre campanas"
        />
      </div>

      <EarningsChart title="Revenue mensual (ARS)" data={revenueData} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Desglose de revenue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueBreakdown.map((item) => (
              <div key={item.source} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.source}</span>
                  <span className="font-medium">
                    ${item.amount.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transacciones recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{tx.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={typeLabels[tx.type]?.className}
                      variant="secondary"
                    >
                      {typeLabels[tx.type]?.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {tx.date}
                    </span>
                  </div>
                </div>
                <p className="font-bold text-green-500">
                  +${tx.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
