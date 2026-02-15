import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { influencerNav } from "@/config/navigation";

export default function InfluencerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell navItems={influencerNav}>{children}</DashboardShell>;
}
