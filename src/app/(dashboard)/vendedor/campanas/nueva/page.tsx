import { CampaignForm } from "@/components/seller/campaign-form";

export const metadata = { title: "Nueva Campana" };

export default function NewCampaignPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Crear campana</h1>
        <p className="text-muted-foreground">
          Completa los pasos para lanzar una nueva campana
        </p>
      </div>
      <CampaignForm />
    </div>
  );
}
