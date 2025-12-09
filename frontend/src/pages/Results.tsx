import { useState, useMemo } from "react";
import { Link, useSearch } from "wouter";
import { 
  Car, 
  TrendingUp, 
  TrendingDown,
  Bell,
  Share2,
  Save,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Info,
  BarChart3,
  Calendar,
  Gauge,
  Settings,
  Fuel,
  AlertCircle,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBasePrice, formatPrice } from "@/lib/carData";
import mockApi from "@/mock/mockApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Results() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  
  const carDetails = {
    id: params.get("id") || "",
    make: params.get("make") || "",
    model: params.get("model") || "",
    variant: params.get("variant") || "",
    year: params.get("year") || "",
    mileage: params.get("mileage") || "",
    transmission: params.get("transmission") || "",
    engineCapacity: params.get("engineCapacity") || "",
    fuelType: params.get("fuelType") || "",
    interiorCondition: params.get("interiorCondition") || "",
    exteriorCondition: params.get("exteriorCondition") || "",
    isAccidental: params.get("isAccidental") || "no",
    modificationStatus: params.get("modificationStatus") || "stock",
    aiAnalysis: params.get("aiAnalysis") || "",
  };

  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertPrice, setAlertPrice] = useState<"suggested" | "custom">("suggested");
  const [customPrice, setCustomPrice] = useState("");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyPush, setNotifyPush] = useState(true);
  const [alertCreated, setAlertCreated] = useState(false);

  const priceEstimate = useMemo(() => {
    const basePrice = getBasePrice(carDetails.make, carDetails.model, carDetails.variant);
    if (!basePrice) return { min: 0, max: 0, suggested: 0, confidence: 0 };

    const currentYear = new Date().getFullYear();
    const carYear = parseInt(carDetails.year) || currentYear;
    const age = currentYear - carYear;
    const mileage = parseInt(carDetails.mileage) || 0;

    let depreciationFactor = 1;
    for (let i = 0; i < age; i++) {
      if (i === 0) depreciationFactor *= 0.85;
      else if (i < 3) depreciationFactor *= 0.92;
      else if (i < 5) depreciationFactor *= 0.94;
      else depreciationFactor *= 0.96;
    }

    const avgMileagePerYear = 15000;
    const expectedMileage = age * avgMileagePerYear;
    const mileageDiff = mileage - expectedMileage;
    const mileageAdjustment = mileageDiff > 0 ? 1 - (mileageDiff * 0.000005) : 1 + (Math.abs(mileageDiff) * 0.000003);

    let conditionFactor = 1;
    if (carDetails.isAccidental === "yes") conditionFactor *= 0.85;
    if (carDetails.modificationStatus === "modified") conditionFactor *= 0.95;
    if (carDetails.transmission === "Automatic" || carDetails.transmission === "CVT") conditionFactor *= 1.05;
    if (carDetails.fuelType === "Hybrid") conditionFactor *= 1.08;
    if (carDetails.fuelType === "Diesel") conditionFactor *= 0.97;

    const adjustedPrice = basePrice * depreciationFactor * mileageAdjustment * conditionFactor;
    const variance = adjustedPrice * 0.08;

    return {
      min: Math.round((adjustedPrice - variance) / 10000) * 10000,
      max: Math.round((adjustedPrice + variance) / 10000) * 10000,
      suggested: Math.round(adjustedPrice / 10000) * 10000,
      confidence: Math.min(95, 75 + (carDetails.interiorCondition.length / 20) + (carDetails.exteriorCondition.length / 20)),
    };
  }, [carDetails]);

  const priceHistoryData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const data = [];
    let price = priceEstimate.suggested * 0.95;
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const change = (Math.random() - 0.45) * 0.03;
      price = price * (1 + change);
      data.push({
        month: months[monthIndex],
        price: Math.round(price),
      });
    }
    
    data[data.length - 1].price = priceEstimate.suggested;
    return data;
  }, [priceEstimate.suggested]);

  const handleCreateAlert = async () => {
    try {
      const targetPrice = alertPrice === "suggested"
        ? priceEstimate.suggested
        : parseInt(customPrice);

      if (!targetPrice || targetPrice <= 0) {
        alert("Please enter a valid price");
        return;
      }

      const alertData = {
        userId: "user-001", // Using mock user ID
        evaluationId: carDetails.id || null,
        carName: `${carDetails.year} ${carDetails.make} ${carDetails.model} ${carDetails.variant}`,
        targetPrice,
        currentPrice: priceEstimate.suggested,
        status: "active",
        notifyEmail,
        notifyPush,
      };

      // Use mock API instead of fetch
      await mockApi.createPriceAlert(alertData);

      setAlertCreated(true);
      setTimeout(() => {
        setAlertDialogOpen(false);
        setAlertCreated(false);
      }, 2000);
    } catch (error) {
      console.error("Error creating alert:", error);
      alert("Failed to create alert. Please try again.");
    }
  };

  const priceBreakdown = [
    { label: "Base Market Value", value: getBasePrice(carDetails.make, carDetails.model, carDetails.variant), impact: "neutral" },
    { label: "Age Depreciation", value: -(getBasePrice(carDetails.make, carDetails.model, carDetails.variant) - priceEstimate.suggested) * 0.6, impact: "negative" },
    { label: "Mileage Adjustment", value: (parseInt(carDetails.mileage) || 0) > 50000 ? -50000 : 30000, impact: (parseInt(carDetails.mileage) || 0) > 50000 ? "negative" : "positive" },
    { label: "Condition Assessment", value: carDetails.isAccidental === "yes" ? -200000 : 50000, impact: carDetails.isAccidental === "yes" ? "negative" : "positive" },
    { label: "Transmission Premium", value: carDetails.transmission === "Automatic" ? 100000 : 0, impact: carDetails.transmission === "Automatic" ? "positive" : "neutral" },
  ];

  if (!carDetails.make) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <Car className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h1 className="text-2xl font-bold mb-2">No Car Data Found</h1>
            <p className="text-muted-foreground mb-6">Please evaluate a car first to see results.</p>
            <Link href="/evaluate">
              <Button data-testid="button-evaluate-car">Evaluate a Car</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Link href="/evaluate" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Evaluation
          </Link>

          {/* Price Display Card */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary" className="gap-1">
                      <Sparkles className="h-3 w-3" />
                      AI Valuation
                    </Badge>
                    <Badge variant="outline" data-testid="badge-confidence">{Math.round(priceEstimate.confidence)}% Confidence</Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-1" data-testid="text-car-title">
                    {carDetails.year} {carDetails.make} {carDetails.model}
                  </h1>
                  <p className="text-muted-foreground" data-testid="text-car-variant">{carDetails.variant}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Range</p>
                  <p className="text-3xl md:text-4xl font-bold text-primary" data-testid="text-price-range">
                    {formatPrice(priceEstimate.min)} - {formatPrice(priceEstimate.max)}
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recommended Selling Price</p>
                    <p className="text-2xl md:text-3xl font-bold" data-testid="text-suggested-price">
                      {formatPrice(priceEstimate.suggested)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="gap-2" data-testid="button-save">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" className="gap-2" data-testid="button-share">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2" data-testid="button-set-alert">
                        <Bell className="h-4 w-4" />
                        Set Alert
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      {alertCreated ? (
                        <div className="text-center py-8" data-testid="alert-success-container">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2" data-testid="text-alert-created">Alert Created!</h3>
                          <p className="text-muted-foreground" data-testid="text-alert-confirmation">
                            You'll be notified when the price reaches your target.
                          </p>
                        </div>
                      ) : (
                        <>
                          <DialogHeader>
                            <DialogTitle>Setup Price Alert</DialogTitle>
                            <DialogDescription>
                              Get notified when the market price reaches your target
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-6 py-4">
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground mb-1">{carDetails.year} {carDetails.make} {carDetails.model}</p>
                              <p className="font-semibold">Current Estimate: {formatPrice(priceEstimate.suggested)}</p>
                            </div>

                            <div className="space-y-3">
                              <Label>Alert Price</Label>
                              <RadioGroup value={alertPrice} onValueChange={(v) => setAlertPrice(v as "suggested" | "custom")}>
                                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                                  <RadioGroupItem value="suggested" id="suggested" data-testid="radio-suggested-price" />
                                  <Label htmlFor="suggested" className="flex-1 cursor-pointer">
                                    <span className="font-medium">System Suggested Price</span>
                                    <span className="block text-sm text-muted-foreground">{formatPrice(priceEstimate.suggested)}</span>
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                                  <RadioGroupItem value="custom" id="custom" data-testid="radio-custom-price" />
                                  <Label htmlFor="custom" className="flex-1 cursor-pointer">
                                    <span className="font-medium">Custom Price</span>
                                    <span className="block text-sm text-muted-foreground">Set your own target</span>
                                  </Label>
                                </div>
                              </RadioGroup>
                              
                              {alertPrice === "custom" && (
                                <div className="mt-3">
                                  <Input
                                    type="number"
                                    placeholder="Enter price in PKR"
                                    value={customPrice}
                                    onChange={(e) => setCustomPrice(e.target.value)}
                                    className="h-12"
                                    data-testid="input-custom-price"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="space-y-3">
                              <Label>Notification Preferences</Label>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="email" 
                                    checked={notifyEmail}
                                    onCheckedChange={(c) => setNotifyEmail(!!c)}
                                    data-testid="checkbox-email"
                                  />
                                  <Label htmlFor="email" className="cursor-pointer">Email notifications</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="push" 
                                    checked={notifyPush}
                                    onCheckedChange={(c) => setNotifyPush(!!c)}
                                    data-testid="checkbox-push"
                                  />
                                  <Label htmlFor="push" className="cursor-pointer">Push notifications</Label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button onClick={handleCreateAlert} className="w-full" data-testid="button-create-alert">
                              Create Alert
                            </Button>
                          </DialogFooter>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Confidence Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Valuation Confidence</span>
                  <span className="text-sm text-muted-foreground">{Math.round(priceEstimate.confidence)}%</span>
                </div>
                <Progress value={priceEstimate.confidence} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Based on market data, car details, and condition assessment
                </p>
              </div>

              {/* Car Details Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Year</span>
                  </div>
                  <p className="font-semibold">{carDetails.year}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Mileage</span>
                  </div>
                  <p className="font-semibold">{parseInt(carDetails.mileage).toLocaleString()} km</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Transmission</span>
                  </div>
                  <p className="font-semibold">{carDetails.transmission}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Fuel</span>
                  </div>
                  <p className="font-semibold">{carDetails.fuelType}</p>
                </div>
              </div>

              {/* Price Trend Chart */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Price Trend (6 Months)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistoryData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis 
                        tickFormatter={(value) => `${(value / 100000).toFixed(0)}L`}
                        className="text-xs"
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatPrice(value), "Price"]}
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Price Breakdown */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Price Breakdown
                </h3>
                <div className="space-y-3">
                  {priceBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <span className="text-sm">{item.label}</span>
                      <span className={`font-medium ${
                        item.impact === "positive" ? "text-green-600" :
                        item.impact === "negative" ? "text-red-600" :
                        "text-foreground"
                      }`}>
                        {item.impact === "positive" && "+"}
                        {item.impact === "negative" && ""}
                        {formatPrice(Math.abs(item.value))}
                        {item.impact === "negative" && (
                          <TrendingDown className="h-4 w-4 inline ml-1" />
                        )}
                        {item.impact === "positive" && (
                          <TrendingUp className="h-4 w-4 inline ml-1" />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          {carDetails.aiAnalysis && (
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Condition Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  {carDetails.aiAnalysis}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Condition Notes */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Interior Condition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {carDetails.interiorCondition || "No details provided"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Car className="h-4 w-4 text-primary" />
                  Exterior Condition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {carDetails.exteriorCondition || "No details provided"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card className={carDetails.isAccidental === "yes" ? "border-red-200 dark:border-red-900" : "border-green-200 dark:border-green-900"}>
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle className={`h-5 w-5 ${carDetails.isAccidental === "yes" ? "text-red-500" : "text-green-500"}`} />
                <div>
                  <p className="font-medium">{carDetails.isAccidental === "yes" ? "Accidental" : "Non-Accidental"}</p>
                  <p className="text-sm text-muted-foreground">Accident history status</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Wrench className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{carDetails.modificationStatus === "stock" ? "Stock Condition" : "Modified"}</p>
                  <p className="text-sm text-muted-foreground">Modification status</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
