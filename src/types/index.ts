import type { Role, OnboardingStatus, Platform, CampaignStatus, ParticipationStatus } from "@prisma/client";

export type { Role, OnboardingStatus, Platform, CampaignStatus, ParticipationStatus };

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface DashboardConfig {
  mainNav: NavItem[];
  sidebarNav: NavItem[];
}

export interface ProductFilters {
  search?: string;
  niche?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  minCommission?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
