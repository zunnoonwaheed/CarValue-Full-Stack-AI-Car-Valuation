import { useState } from "react";
import { 
  Car, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2
} from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "support@carvalue.pk",
    subtext: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+92 300 1234567",
    subtext: "Mon-Sat 9am-6pm PST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "DHA Phase 5, Lahore",
    subtext: "Pakistan",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Mon - Sat: 9am - 6pm",
    subtext: "Sunday: Closed",
  },
];

const faqs = [
  {
    q: "How accurate are your valuations?",
    a: "Our AI-powered system achieves 98% accuracy by analyzing real market data from across Pakistan.",
  },
  {
    q: "Is CarValue free to use?",
    a: "Yes! Basic car valuations are completely free. We also offer premium features for dealers and businesses.",
  },
  {
    q: "How often is your data updated?",
    a: "Our market data is updated daily to ensure you get the most current valuations.",
  },
  {
    q: "Can I trust the suggested prices?",
    a: "Absolutely. Our prices are based on actual transaction data and market trends across 540+ cities.",
  },
];

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">Contact Us</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Have questions about car valuations? Need help with our platform? 
              We're here to help you make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <Card key={info.title} className="hover:-translate-y-1 transition-transform duration-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{info.title}</h3>
                  <p className="text-primary font-medium mb-1">{info.details}</p>
                  <p className="text-sm text-muted-foreground">{info.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Send us a Message</h2>
              
              {formSubmitted ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setFormSubmitted(false)} data-testid="button-send-another">
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            placeholder="Ahmed Khan"
                            className="h-12"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            data-testid="input-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="h-12"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            data-testid="input-email"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select 
                          value={formData.subject} 
                          onValueChange={(v) => setFormData({ ...formData, subject: v })}
                        >
                          <SelectTrigger id="subject" className="h-12" data-testid="select-subject">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="valuation">Valuation Question</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="How can we help you?"
                          className="min-h-32 resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          data-testid="textarea-message"
                        />
                      </div>

                      <Button type="submit" className="w-full h-12 gap-2" data-testid="button-submit">
                        <Send className="h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Social Links */}
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-4">Follow us on social media</p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" data-testid="link-facebook">
                    <SiFacebook className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" data-testid="link-instagram">
                    <SiInstagram className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" data-testid="link-twitter">
                    <SiX className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" data-testid="link-linkedin">
                    <SiLinkedin className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">{faq.q}</h4>
                          <p className="text-muted-foreground text-sm">{faq.a}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map placeholder */}
              <Card className="mt-8">
                <CardContent className="p-0 overflow-hidden rounded-lg">
                  <div className="h-64 bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">DHA Phase 5, Lahore</p>
                      <p className="text-sm text-muted-foreground">Pakistan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
