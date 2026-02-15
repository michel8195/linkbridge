import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Mis Campanas" };

const mockCampaigns = [
  {
    id: "1",
    title: "Tech Summer 2025",
    status: "ACTIVE",
    budget: 500000,
    budgetSpent: 245000,
    influencers: 24,
    clicks: 8900,
    conversions: 312,
    startDate: "2025-01-01",
    endDate: "2025-03-31",
  },
  {
    id: "2",
    title: "Belleza Natural",
    status: "ACTIVE",
    budget: 300000,
    budgetSpent: 128000,
    influencers: 18,
    clicks: 5600,
    conversions: 198,
    startDate: "2025-02-01",
    endDate: "2025-04-30",
  },
  {
    id: "3",
    title: "Back to School",
    status: "DRAFT",
    budget: 200000,
    budgetSpent: 0,
    influencers: 0,
    clicks: 0,
    conversions: 0,
    startDate: "2025-02-15",
    endDate: "2025-03-15",
  },
  {
    id: "4",
    title: "Fitness 2025",
    status: "COMPLETED",
    budget: 400000,
    budgetSpent: 380000,
    influencers: 32,
    clicks: 15200,
    conversions: 620,
    startDate: "2025-01-01",
    endDate: "2025-01-31",
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  ACTIVE: { label: "Activa", className: "bg-green-500/10 text-green-500" },
  DRAFT: { label: "Borrador", className: "bg-yellow-500/10 text-yellow-500" },
  COMPLETED: { label: "Completada", className: "bg-muted text-muted-foreground" },
  PAUSED: { label: "Pausada", className: "bg-orange-500/10 text-orange-500" },
};

export default function SellerCampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mis campanas</h1>
          <p className="text-muted-foreground">
            Gestiona y crea nuevas campanas
          </p>
        </div>
        <Button asChild>
          <Link href="/vendedor/campanas/nueva">
            <Plus className="mr-2 h-4 w-4" />
            Nueva campana
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {mockCampaigns.map((campaign) => {
          const budgetPercent =
            campaign.budget > 0
              ? Math.round((campaign.budgetSpent / campaign.budget) * 100)
              : 0;

          return (
            <Link key={campaign.id} href={`/vendedor/campanas/${campaign.id}`}>
              <Card className="transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {campaign.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {campaign.startDate} - {campaign.endDate}
                      </p>
                    </div>
                    <Badge
                      className={statusConfig[campaign.status]?.className}
                      variant="secondary"
                    >
                      {statusConfig[campaign.status]?.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Influencers</p>
                      <p className="font-semibold">{campaign.influencers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Clicks</p>
                      <p className="font-semibold">
                        {campaign.clicks.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversiones</p>
                      <p className="font-semibold">
                        {campaign.conversions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Presupuesto</p>
                      <p className="font-semibold">
                        {budgetPercent}% usado
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${budgetPercent}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
