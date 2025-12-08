import { Link } from "wouter";
import { 
  Car, 
  TrendingUp, 
  Bell, 
  Shield, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Users,
  Calculator,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const features = [
  {
    icon: Calculator,
    title: "Accurate Valuations",
    description: "AI-powered price estimation using real market data and condition analysis for precise valuations.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Track price trends and market movements to make informed buying or selling decisions.",
  },
  {
    icon: Bell,
    title: "Price Alerts",
    description: "Set custom alerts and get notified when your car reaches your target price point.",
  },
  {
    icon: Shield,
    title: "Trusted Data",
    description: "Our database is updated daily with real transaction data from across Pakistan.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your car's valuation in seconds, not days. Quick and hassle-free process.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Comprehensive breakdown of factors affecting your car's value with actionable insights.",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter Car Details",
    description: "Input your car's make, model, variant, year, mileage, and condition information.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our AI analyzes your car's condition and compares it with current market trends.",
  },
  {
    number: "03",
    title: "Get Valuation",
    description: "Receive an accurate price range and recommended selling price instantly.",
  },
];

const stats = [
  { value: "20K+", label: "Cars Evaluated" },
  { value: "540+", label: "Cities Covered" },
  { value: "25+", label: "Car Brands" },
  { value: "98%", label: "Accuracy Rate" },
];

const testimonials = [
  {
    name: "Ahmed Khan",
    location: "Lahore",
    rating: 5,
    text: "Got exactly what CarValue suggested for my Civic. The price estimation was spot on!",
    car: "Honda Civic 2020",
  },
  {
    name: "Sara Ali",
    location: "Karachi", 
    rating: 5,
    text: "The condition analysis feature helped me understand what was affecting my car's value.",
    car: "Toyota Corolla 2019",
  },
  {
    name: "Imran Malik",
    location: "Islamabad",
    rating: 5,
    text: "Price alerts saved me money. Got notified when the market dropped and bought at the right time.",
    car: "Suzuki Swift 2021",
  },
];

const carBrands = [
  "Toyota", "Honda", "Suzuki", "Hyundai", "KIA", "Changan", "MG", "Proton", "Haval", "DFSK"
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-1.5">
                  Pakistan's #1 Car Valuation Platform
                </Badge>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                  Evaluate Your Car's{" "}
                  <span className="text-primary">True Market Price</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Get accurate, AI-powered valuations for any car in Pakistan. 
                  Make informed decisions when buying or selling your vehicle.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/evaluate">
                  <Button size="lg" className="w-full sm:w-auto gap-2 h-12 px-8 text-base" data-testid="button-hero-evaluate">
                    Evaluate Your Car
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base" data-testid="button-hero-learn">
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>No registration required</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Instant results</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 backdrop-blur-sm border border-border/50">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
                <div className="relative bg-card rounded-2xl p-6 shadow-xl border border-border">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Live Preview</p>
                      <p className="font-semibold">2020 Honda City</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-muted-foreground">Mileage</p>
                        <p className="font-medium">45,000 km</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-muted-foreground">Transmission</p>
                        <p className="font-medium">Automatic</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground mb-2">Estimated Value</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">35.5</span>
                        <span className="text-lg text-muted-foreground">- 38.2 Lac</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Suggested: <span className="font-medium text-foreground">36.8 Lac</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid={`stat-value-${index}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="secondary" className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your car's accurate market value in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <Card className="relative hover:-translate-y-1 transition-transform duration-200">
                  <CardContent className="p-6 md:p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-primary">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Feature Highlights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make smart car buying and selling decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="hover:-translate-y-1 transition-transform duration-200"
                data-testid={`card-feature-${index}`}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid={`text-feature-title-${index}`}>{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Reviews from our customers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our users say about their experience with CarValue
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="hover:-translate-y-1 transition-transform duration-200" data-testid={`card-testimonial-${index}`}>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-testimonial-${index}`}>"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold" data-testid={`text-testimonial-name-${index}`}>{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{testimonial.car}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-center text-muted-foreground mb-8">Trusted for all major car brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {carBrands.map((brand) => (
              <div key={brand} className="text-lg md:text-xl font-semibold text-muted-foreground/70 hover:text-foreground transition-colors">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Car's True Value?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who trust CarValue for accurate car valuations. 
            It's free, fast, and reliable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/evaluate">
              <Button size="lg" className="w-full sm:w-auto gap-2 h-12 px-8 text-base" data-testid="button-cta-evaluate">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base" data-testid="button-cta-contact">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How accurate is the car valuation?",
                a: "Our AI-powered system analyzes real market data and achieves 98% accuracy compared to actual sale prices."
              },
              {
                q: "Is CarValue free to use?",
                a: "Yes, our basic valuation service is completely free. You can evaluate unlimited cars without any charges."
              },
              {
                q: "What information do I need for valuation?",
                a: "You'll need your car's make, model, variant, year, mileage, and condition details for an accurate estimate."
              },
              {
                q: "How are price alerts useful?",
                a: "Price alerts notify you when the market price reaches your target, helping you time your sale or purchase perfectly."
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
