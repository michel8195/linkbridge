import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { sellerNav } from "@/config/navigation";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell navItems={sellerNav}>{children}</DashboardShell>;
}
