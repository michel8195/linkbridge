"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  MousePointerClick,
  DollarSign,
  TrendingUp,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const campaign = {
  title: "Tech Summer 2025",
  status: "ACTIVE",
  budget: 500000,
  budgetSpent: 245000,
  commissionRate: 12,
};

const performanceData = [
  { name: "Sem 1", value: 1200 },
  { name: "Sem 2", value: 2400 },
  { name: "Sem 3", value: 1800 },
  { name: "Sem 4", value: 3200 },
  { name: "Sem 5", value: 2800 },
  { name: "Sem 6", value: 4100 },
];

const participants = [
  {
    id: "1",
    name: "Maria Garcia",
    followers: 25000,
    niche: "Moda",
    status: "APPROVED",
    clicks: 450,
    conversions: 18,
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    followers: 15000,
    niche: "Tech",
    status: "APPROVED",
    clicks: 320,
    conversions: 12,
  },
  {
    id: "3",
    name: "Ana Martinez",
    followers: 40000,
    niche: "Tech",
    status: "PENDING",
    clicks: 0,
    conversions: 0,
  },
  {
    id: "4",
    name: "Lucas Fernandez",
    followers: 8000,
    niche: "Gaming",
    status: "PENDING",
    clicks: 0,
    conversions: 0,
  },
];

export default function CampaignDetailPage() {
  const [participantList, setParticipantList] = useState(participants);

  function handleAction(id: string, action: "APPROVED" | "REJECTED") {
    setParticipantList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: action } : p))
    );
    toast.success(
      action === "APPROVED" ? "Influencer aprobado" : "Influencer rechazado"
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/vendedor/campanas">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a campanas
        </Link>
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{campaign.title}</h1>
          <p className="text-muted-foreground">
            Comision: {campaign.commissionRate}%
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-500" variant="secondary">
          Activa
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Influencers"
          value={String(
            participantList.filter((p) => p.status === "APPROVED").length
          )}
          icon={Users}
          description="aprobados"
        />
        <StatsCard
          title="Clicks totales"
          value={participantList
            .reduce((sum, p) => sum + p.clicks, 0)
            .toLocaleString()}
          icon={MousePointerClick}
        />
        <StatsCard
          title="Conversiones"
          value={String(
            participantList.reduce((sum, p) => sum + p.conversions, 0)
          )}
          icon={TrendingUp}
        />
        <StatsCard
          title="Presupuesto usado"
          value={`${Math.round(
            (campaign.budgetSpent / campaign.budget) * 100
          )}%`}
          icon={DollarSign}
          description={`ARS ${campaign.budgetSpent.toLocaleString()} / ${campaign.budget.toLocaleString()}`}
        />
      </div>

      <EarningsChart title="Performance semanal" data={performanceData} />

      <Card>
        <CardHeader>
          <CardTitle>Influencers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {participantList.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.followers.toLocaleString()} seguidores &middot; {p.niche}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {p.status === "APPROVED" && (
                  <div className="text-sm text-right">
                    <p>{p.clicks} clicks</p>
                    <p className="text-xs text-muted-foreground">
                      {p.conversions} conv.
                    </p>
                  </div>
                )}

                {p.status === "PENDING" ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAction(p.id, "APPROVED")}
                    >
                      <Check className="mr-1 h-3 w-3" />
                      Aprobar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(p.id, "REJECTED")}
                    >
                      <X className="mr-1 h-3 w-3" />
                      Rechazar
                    </Button>
                  </div>
                ) : (
                  <Badge
                    variant="secondary"
                    className={
                      p.status === "APPROVED"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }
                  >
                    {p.status === "APPROVED" ? "Aprobado" : "Rechazado"}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
