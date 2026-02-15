"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { marketingNav } from "@/config/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        <div className="hidden md:flex md:items-center md:gap-6">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex md:items-center md:gap-3">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar sesion</Link>
          </Button>
          <Button asChild>
            <Link href="/registro">Comenzar gratis</Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {isMobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b p-4 space-y-4">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar sesion</Link>
            </Button>
            <Button asChild>
              <Link href="/registro">Comenzar gratis</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
