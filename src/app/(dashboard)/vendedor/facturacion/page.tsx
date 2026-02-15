import { DollarSign, FileText, Clock, CheckCircle } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Facturacion" };

const mockInvoices = [
  {
    id: "INV-001",
    description: "Campana Tech Summer 2025 - Enero",
    amount: 125000,
    status: "PAID",
    dueDate: "2025-02-15",
    paidAt: "2025-02-14",
  },
  {
    id: "INV-002",
    description: "Campana Belleza Natural - Enero",
    amount: 85000,
    status: "PAID",
    dueDate: "2025-02-15",
    paidAt: "2025-02-13",
  },
  {
    id: "INV-003",
    description: "Campana Tech Summer 2025 - Febrero",
    amount: 120000,
    status: "PENDING",
    dueDate: "2025-03-15",
    paidAt: null,
  },
  {
    id: "INV-004",
    description: "Campana Belleza Natural - Febrero",
    amount: 68000,
    status: "PENDING",
    dueDate: "2025-03-15",
    paidAt: null,
  },
  {
    id: "INV-005",
    description: "Campana Fitness 2025 - Diciembre",
    amount: 92000,
    status: "PAID",
    dueDate: "2025-01-15",
    paidAt: "2025-01-12",
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  PAID: { label: "Pagada", className: "bg-green-500/10 text-green-500" },
  PENDING: { label: "Pendiente", className: "bg-yellow-500/10 text-yellow-500" },
  OVERDUE: { label: "Vencida", className: "bg-red-500/10 text-red-500" },
};

export default function BillingPage() {
  const totalPaid = mockInvoices
    .filter((i) => i.status === "PAID")
    .reduce((sum, i) => sum + i.amount, 0);
  const totalPending = mockInvoices
    .filter((i) => i.status === "PENDING")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Facturacion</h1>
        <p className="text-muted-foreground">
          Historial de facturas y pagos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total facturado"
          value={`$${(totalPaid + totalPending).toLocaleString()}`}
          icon={DollarSign}
          description="todas las facturas"
        />
        <StatsCard
          title="Pagado"
          value={`$${totalPaid.toLocaleString()}`}
          icon={CheckCircle}
          description={`${mockInvoices.filter((i) => i.status === "PAID").length} facturas`}
        />
        <StatsCard
          title="Pendiente"
          value={`$${totalPending.toLocaleString()}`}
          icon={Clock}
          description={`${mockInvoices.filter((i) => i.status === "PENDING").length} facturas`}
        />
        <StatsCard
          title="Total facturas"
          value={String(mockInvoices.length)}
          icon={FileText}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de facturas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{invoice.id}</p>
                    <Badge
                      className={statusConfig[invoice.status]?.className}
                      variant="secondary"
                    >
                      {statusConfig[invoice.status]?.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {invoice.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Vencimiento: {invoice.dueDate}
                    {invoice.paidAt && ` | Pagada: ${invoice.paidAt}`}
                  </p>
                </div>
                <p className="font-bold text-lg">
                  ${invoice.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
