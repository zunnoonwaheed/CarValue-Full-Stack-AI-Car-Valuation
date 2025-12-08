import { Link } from "wouter";
import { Car, Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  product: [
    { label: "Evaluate Car", href: "/evaluate" },
    { label: "Price Alerts", href: "/dashboard" },
    { label: "Market Trends", href: "/about" },
    { label: "Car Database", href: "/about" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Press", href: "/about" },
  ],
  support: [
    { label: "Help Center", href: "/contact" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/about" },
    { label: "Privacy Policy", href: "/about" },
  ],
  legal: [
    { label: "Terms of Service", href: "/about" },
    { label: "Privacy Policy", href: "/about" },
    { label: "Cookie Policy", href: "/about" },
    { label: "Disclaimer", href: "/about" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CarValue</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Pakistan's most trusted car valuation platform. Get accurate price 
              estimates powered by AI and market data analysis.
            </p>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>support@carvalue.pk</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <Button variant="ghost" size="icon" data-testid="link-social-facebook">
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-social-instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-social-twitter">
                <SiX className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-social-linkedin">
                <SiLinkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest market updates and car valuation tips.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter email" 
                className="h-10"
                data-testid="input-newsletter-email"
              />
              <Button size="sm" data-testid="button-newsletter-subscribe">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2024 CarValue. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.slice(0, 3).map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
