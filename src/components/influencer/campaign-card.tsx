import { Calendar, Users, DollarSign, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CampaignCardProps {
  id: string;
  title: string;
  description?: string;
  commissionRate: number;
  status: string;
  startDate?: string;
  endDate?: string;
  participantCount: number;
  targetNiches: string[];
  sellerName: string;
}

export function CampaignCard({
  id,
  title,
  description,
  commissionRate,
  status,
  startDate,
  endDate,
  participantCount,
  targetNiches,
  sellerName,
}: CampaignCardProps) {
  const statusColors: Record<string, string> = {
    ACTIVE: "bg-green-500/10 text-green-500",
    DRAFT: "bg-yellow-500/10 text-yellow-500",
    COMPLETED: "bg-muted text-muted-foreground",
    PAUSED: "bg-orange-500/10 text-orange-500",
  };

  return (
    <Card className="transition-all hover:shadow-lg hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              por {sellerName}
            </p>
          </div>
          <Badge className={statusColors[status] || ""} variant="secondary">
            {status === "ACTIVE"
              ? "Activa"
              : status === "DRAFT"
                ? "Borrador"
                : status === "COMPLETED"
                  ? "Completada"
                  : "Pausada"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span>{commissionRate}% comision</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{participantCount} participantes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{endDate || "Sin limite"}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {targetNiches.map((n) => (
            <Badge key={n} variant="outline" className="text-xs">
              {n}
            </Badge>
          ))}
        </div>

        <Button className="w-full" variant="outline" asChild>
          <Link href={`/influencer/campanas/${id}`}>
            Ver detalles
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
