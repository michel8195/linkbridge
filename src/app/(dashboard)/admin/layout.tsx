import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { adminNav } from "@/config/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell navItems={adminNav}>{children}</DashboardShell>;
}
