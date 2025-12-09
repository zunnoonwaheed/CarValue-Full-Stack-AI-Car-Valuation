import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Car, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  isLoggedIn?: boolean;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/evaluate", label: "Evaluate Car" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Header({ isLoggedIn = false }: HeaderProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Car className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:inline">CarValue</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={location === link.href ? "secondary" : "ghost"}
                className="font-medium"
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2" data-testid="button-dashboard">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="gap-2" data-testid="button-login">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={location === link.href ? "secondary" : "ghost"}
                      className="w-full justify-start font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
