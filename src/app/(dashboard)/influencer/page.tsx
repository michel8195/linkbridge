import { MousePointerClick, DollarSign, Link, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Dashboard Influencer" };

const mockEarnings = [
  { name: "Ene", value: 1200 },
  { name: "Feb", value: 1800 },
  { name: "Mar", value: 2400 },
  { name: "Abr", value: 2100 },
  { name: "May", value: 3200 },
  { name: "Jun", value: 2800 },
  { name: "Jul", value: 3600 },
];

const recentActivity = [
  { text: "Nuevo click en link de Auriculares Bluetooth", time: "hace 2 min" },
  { text: "Comision recibida - $450 ARS", time: "hace 1 hora" },
  { text: "Aprobado en campana 'Tech Summer 2025'", time: "hace 3 horas" },
  { text: "Nuevo click en link de Smart Watch", time: "hace 5 horas" },
  { text: "Link de afiliado generado para Teclado Mecanico", time: "ayer" },
];

export default function InfluencerOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-muted-foreground">
          Resumen de tu actividad y rendimiento
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Clicks totales"
          value="12,456"
          icon={MousePointerClick}
          trend={{ value: 12, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="Ganancias del mes"
          value="$8,400"
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
          description="vs. mes anterior"
        />
        <StatsCard
          title="Links activos"
          value="34"
          icon={Link}
          description="productos enlazados"
        />
        <StatsCard
          title="Tasa de conversion"
          value="3.2%"
          icon={TrendingUp}
          trend={{ value: 0.5, isPositive: true }}
          description="vs. mes anterior"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EarningsChart title="Ganancias mensuales" data={mockEarnings} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
