"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Link as LinkIcon,
  FileText,
  Megaphone,
  DollarSign,
  User,
  Users,
  Receipt,
  Package,
  BarChart3,
  X,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { NavItem } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  ShoppingBag,
  Link: LinkIcon,
  FileText,
  Megaphone,
  DollarSign,
  User,
  Users,
  Receipt,
  Package,
  BarChart3,
};

interface SidebarProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ items, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r bg-sidebar transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            {items.map((item) => {
              const Icon = item.icon ? iconMap[item.icon] : LayoutDashboard;
              const isActive =
                pathname === item.href ||
                (item.href !== "/" &&
                  pathname.startsWith(item.href) &&
                  item.href.split("/").length >= 3 &&
                  pathname.split("/").length >= item.href.split("/").length);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.title}
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
