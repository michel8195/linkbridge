import { CampaignCard } from "@/components/influencer/campaign-card";

export const metadata = { title: "Campanas" };

const mockCampaigns = [
  {
    id: "1",
    title: "Tech Summer 2025",
    description:
      "Promociona los mejores gadgets de verano. Auriculares, smartwatches y mas.",
    commissionRate: 12,
    status: "ACTIVE",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    participantCount: 24,
    targetNiches: ["Tecnologia", "Gaming"],
    sellerName: "TechStore AR",
  },
  {
    id: "2",
    title: "Belleza Natural",
    description:
      "Campana de productos de belleza organicos y naturales para redes sociales.",
    commissionRate: 15,
    status: "ACTIVE",
    startDate: "2025-02-01",
    endDate: "2025-04-30",
    participantCount: 18,
    targetNiches: ["Belleza", "Salud"],
    sellerName: "NaturalBeauty Co",
  },
  {
    id: "3",
    title: "Back to School",
    description:
      "Productos de escritorio, mochilas y tecnologia para la vuelta a clases.",
    commissionRate: 10,
    status: "DRAFT",
    startDate: "2025-02-15",
    endDate: "2025-03-15",
    participantCount: 0,
    targetNiches: ["Tecnologia", "Hogar"],
    sellerName: "OfiMax",
  },
  {
    id: "4",
    title: "Fitness 2025",
    description:
      "Equipamiento deportivo y suplementos para arrancar el ano con todo.",
    commissionRate: 8,
    status: "COMPLETED",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    participantCount: 32,
    targetNiches: ["Deportes", "Salud"],
    sellerName: "SportLife",
  },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Campanas</h1>
        <p className="text-muted-foreground">
          Explora campanas activas y postulate para ganar comisiones adicionales
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} {...campaign} />
        ))}
      </div>
    </div>
  );
}
