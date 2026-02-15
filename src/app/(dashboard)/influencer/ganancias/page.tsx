import { DollarSign, TrendingUp, ArrowUpRight, Wallet } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Ganancias" };

const monthlyData = [
  { name: "Jul", value: 2400 },
  { name: "Ago", value: 3100 },
  { name: "Sep", value: 2800 },
  { name: "Oct", value: 4200 },
  { name: "Nov", value: 3800 },
  { name: "Dic", value: 5100 },
  { name: "Ene", value: 4800 },
  { name: "Feb", value: 6200 },
];

const earningsHistory = [
  {
    date: "15 Feb 2025",
    source: "Comision afiliado",
    product: "Auriculares Bluetooth TWS",
    amount: 1280,
    status: "PAID",
  },
  {
    date: "14 Feb 2025",
    source: "Campana Tech Summer",
    product: "Smartwatch Deportivo",
    amount: 2250,
    status: "PAID",
  },
  {
    date: "12 Feb 2025",
    source: "Comision afiliado",
    product: "Teclado Mecanico RGB",
    amount: 2023,
    status: "PENDING",
  },
  {
    date: "10 Feb 2025",
    source: "Comision afiliado",
    product: "Set de Maquillaje",
    amount: 1536,
    status: "PAID",
  },
  {
    date: "8 Feb 2025",
    source: "Campana Belleza Natural",
    product: "Crema Hidratante",
    amount: 890,
    status: "PENDING",
  },
];

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ganancias</h1>
        <p className="text-muted-foreground">
          Historial de comisiones y ganancias
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ganancias totales"
          value="$42,800"
          icon={DollarSign}
          description="desde el inicio"
        />
        <StatsCard
          title="Este mes"
          value="$6,200"
          icon={TrendingUp}
          trend={{ value: 22, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="Pendiente de pago"
          value="$2,913"
          icon={Wallet}
          description="3 transacciones"
        />
        <StatsCard
          title="Mejor mes"
          value="$6,200"
          icon={ArrowUpRight}
          description="Febrero 2025"
        />
      </div>

      <EarningsChart title="Ganancias mensuales (ARS)" data={monthlyData} />

      <Card>
        <CardHeader>
          <CardTitle>Historial de ganancias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {earningsHistory.map((earning, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{earning.product}</p>
                    <Badge
                      variant={
                        earning.status === "PAID" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {earning.status === "PAID" ? "Pagado" : "Pendiente"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {earning.source} &middot; {earning.date}
                  </p>
                </div>
                <p className="font-bold text-green-500">
                  +${earning.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
