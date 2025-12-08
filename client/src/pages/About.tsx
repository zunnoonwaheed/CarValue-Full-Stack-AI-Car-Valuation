import { Link } from "wouter";
import { 
  Car, 
  Target, 
  Users, 
  Shield, 
  Zap, 
  TrendingUp,
  Award,
  Globe,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const teamMembers = [
  {
    name: "Ali Hassan",
    role: "Founder & CEO",
    bio: "10+ years in automotive industry with deep expertise in car valuations",
  },
  {
    name: "Sara Ahmed",
    role: "Head of Technology",
    bio: "Former tech lead at leading fintech companies, AI/ML expert",
  },
  {
    name: "Imran Malik",
    role: "Head of Data",
    bio: "Data scientist with extensive experience in market analytics",
  },
  {
    name: "Fatima Khan",
    role: "Head of Operations",
    bio: "Operations expert with background in automotive marketplaces",
  },
];

const values = [
  {
    icon: Target,
    title: "Accuracy",
    description: "We're committed to providing the most accurate valuations using cutting-edge AI and real market data.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Your data is secure with us. We never share personal information without explicit consent.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We constantly improve our algorithms and features to serve you better.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We're building a community of informed car buyers and sellers across Pakistan.",
  },
];

const milestones = [
  { year: "2022", event: "CarValue founded in Lahore" },
  { year: "2023", event: "Launched AI-powered valuation engine" },
  { year: "2023", event: "Reached 10,000 car evaluations" },
  { year: "2024", event: "Expanded to 540+ cities across Pakistan" },
  { year: "2024", event: "Introduced price alerts feature" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">About Us</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Where every drive feels{" "}
              <span className="text-primary">extraordinary</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We're on a mission to bring transparency and trust to the used car market in Pakistan. 
              Our AI-powered platform helps you make informed decisions when buying or selling vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At CarValue, we believe everyone deserves access to accurate car valuations. 
                The used car market in Pakistan has long been plagued by information asymmetry, 
                making it difficult for buyers and sellers to agree on fair prices.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our platform leverages artificial intelligence and real market data to provide 
                instant, accurate valuations for any car. Whether you're buying your first car 
                or selling your tenth, CarValue gives you the insights you need.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">AI-Powered Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">Real Market Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">Instant Results</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">20K+</p>
                <p className="text-sm text-muted-foreground">Cars Evaluated</p>
              </Card>
              <Card className="p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">540+</p>
                <p className="text-sm text-muted-foreground">Cities Covered</p>
              </Card>
              <Card className="p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">98%</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </Card>
              <Card className="p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">25+</p>
                <p className="text-sm text-muted-foreground">Car Brands</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Stand For</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="hover:-translate-y-1 transition-transform duration-200">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Milestones</h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex gap-6 pl-12">
                  <div className="absolute left-2 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  <div className="flex-1 pb-8">
                    <Badge variant="outline" className="mb-2">{milestone.year}</Badge>
                    <p className="font-medium">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse team brings together expertise from automotive, technology, and data science
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="hover:-translate-y-1 transition-transform duration-200">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/20">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Car's True Value?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust CarValue for accurate car valuations.
          </p>
          <Link href="/evaluate">
            <Button size="lg" className="gap-2 h-12 px-8" data-testid="button-get-started">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
