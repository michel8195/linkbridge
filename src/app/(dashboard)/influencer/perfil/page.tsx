"use client";

import { useSession } from "next-auth/react";
import {
  Instagram,
  Youtube,
  Twitter,
  Globe,
  MapPin,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const mockProfile = {
  bio: "Content creator apasionado por la tecnologia y los gadgets. Comparto reviews honestas y recomendaciones para mi comunidad.",
  niche: ["Tecnologia", "Gaming", "Hogar"],
  country: "AR",
  city: "Buenos Aires",
  totalReach: 35000,
  socialLinks: [
    {
      platform: "INSTAGRAM",
      username: "@techreview_ar",
      followers: 25000,
      url: "https://instagram.com/techreview_ar",
    },
    {
      platform: "TIKTOK",
      username: "@techreview_ar",
      followers: 8000,
      url: "https://tiktok.com/@techreview_ar",
    },
    {
      platform: "YOUTUBE",
      username: "TechReview AR",
      followers: 2000,
      url: "https://youtube.com/techreviewar",
    },
  ],
};

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  INSTAGRAM: Instagram,
  YOUTUBE: Youtube,
  TWITTER: Twitter,
  TIKTOK: Globe,
  FACEBOOK: Globe,
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mi perfil</h1>
        <p className="text-muted-foreground">
          Tu informacion y redes sociales
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 text-center">
            <Avatar className="h-20 w-20 mx-auto">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-lg font-semibold">
              {session?.user?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {session?.user?.email}
            </p>
            <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {mockProfile.city}, {mockProfile.country}
            </div>
            <Separator className="my-4" />
            <div className="text-center">
              <p className="text-2xl font-bold">
                {mockProfile.totalReach.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Alcance total</p>
            </div>
            <div className="flex flex-wrap justify-center gap-1 mt-4">
              {mockProfile.niche.map((n) => (
                <Badge key={n} variant="secondary">
                  {n}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mockProfile.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Redes sociales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockProfile.socialLinks.map((link) => {
                const Icon = platformIcons[link.platform] || Globe;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <div>
                        <p className="font-medium text-sm">{link.username}</p>
                        <p className="text-xs text-muted-foreground">
                          {link.platform}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {link.followers.toLocaleString()} seguidores
                    </span>
                  </a>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informacion de contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{session?.user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {mockProfile.city}, {mockProfile.country}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
