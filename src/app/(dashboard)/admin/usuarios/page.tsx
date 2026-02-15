"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Shield, Ban, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const initialUsers = [
  {
    id: "1",
    name: "Maria Garcia",
    email: "maria@email.com",
    role: "INFLUENCER",
    status: "active",
    createdAt: "2025-01-15",
    followers: 25000,
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    email: "carlos@email.com",
    role: "INFLUENCER",
    status: "active",
    createdAt: "2025-01-20",
    followers: 15000,
  },
  {
    id: "3",
    name: "TechStore AR",
    email: "info@techstore.com.ar",
    role: "SELLER",
    status: "active",
    createdAt: "2025-01-18",
    followers: 0,
  },
  {
    id: "4",
    name: "Ana Martinez",
    email: "ana@email.com",
    role: "INFLUENCER",
    status: "pending",
    createdAt: "2025-02-10",
    followers: 40000,
  },
  {
    id: "5",
    name: "NaturalBeauty Co",
    email: "hello@naturalbeauty.co",
    role: "SELLER",
    status: "active",
    createdAt: "2025-02-05",
    followers: 0,
  },
  {
    id: "6",
    name: "Lucas Fernandez",
    email: "lucas@email.com",
    role: "INFLUENCER",
    status: "suspended",
    createdAt: "2024-12-01",
    followers: 8000,
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Activo", className: "bg-green-500/10 text-green-500" },
  pending: { label: "Pendiente", className: "bg-yellow-500/10 text-yellow-500" },
  suspended: { label: "Suspendido", className: "bg-red-500/10 text-red-500" },
};

const roleColors: Record<string, string> = {
  INFLUENCER: "bg-blue-500/10 text-blue-500",
  SELLER: "bg-green-500/10 text-green-500",
  ADMIN: "bg-purple-500/10 text-purple-500",
};

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  function handleAction(
    userId: string,
    action: "approve" | "suspend" | "activate"
  ) {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const newStatus =
          action === "suspend"
            ? "suspended"
            : action === "approve"
              ? "active"
              : "active";
        return { ...u, status: newStatus };
      })
    );
    const labels = { approve: "aprobado", suspend: "suspendido", activate: "activado" };
    toast.success(`Usuario ${labels[action]}`);
  }

  const filtered = users.filter((u) => {
    if (
      search &&
      !u.name.toLowerCase().includes(search.toLowerCase()) &&
      !u.email.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (statusFilter !== "all" && u.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestion de usuarios</h1>
        <p className="text-muted-foreground">
          Administra los usuarios de la plataforma
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los roles</SelectItem>
            <SelectItem value="INFLUENCER">Influencer</SelectItem>
            <SelectItem value="SELLER">Vendedor</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="suspended">Suspendidos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={roleColors[user.role]} variant="secondary">
                    {user.role === "INFLUENCER" ? "Influencer" : "Vendedor"}
                  </Badge>
                  <Badge
                    className={statusConfig[user.status]?.className}
                    variant="secondary"
                  >
                    {statusConfig[user.status]?.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground hidden md:block">
                    {user.createdAt}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.status === "pending" && (
                        <DropdownMenuItem
                          onClick={() => handleAction(user.id, "approve")}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Aprobar
                        </DropdownMenuItem>
                      )}
                      {user.status !== "suspended" && (
                        <DropdownMenuItem
                          onClick={() => handleAction(user.id, "suspend")}
                          className="text-destructive"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Suspender
                        </DropdownMenuItem>
                      )}
                      {user.status === "suspended" && (
                        <DropdownMenuItem
                          onClick={() => handleAction(user.id, "activate")}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Reactivar
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
