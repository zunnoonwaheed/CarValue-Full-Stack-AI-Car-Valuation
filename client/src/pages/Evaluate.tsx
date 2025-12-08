import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { 
  Car, 
  ChevronRight, 
  ChevronLeft,
  Gauge,
  Settings,
  Fuel,
  Calendar,
  Hash,
  FileText,
  AlertCircle,
  Wrench,
  Sparkles,
  CheckCircle2,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  carDatabase,
  getModelsForMake,
  getVariantsForModel,
  transmissionTypes,
  fuelTypes,
  years,
  formatPrice,
} from "@/lib/carData";

interface FormData {
  make: string;
  model: string;
  variant: string;
  year: string;
  mileage: string;
  transmission: string;
  engineCapacity: string;
  fuelType: string;
  interiorCondition: string;
  exteriorCondition: string;
  isAccidental: string;
  modificationStatus: string;
}

const initialFormData: FormData = {
  make: "",
  model: "",
  variant: "",
  year: "",
  mileage: "",
  transmission: "",
  engineCapacity: "",
  fuelType: "",
  interiorCondition: "",
  exteriorCondition: "",
  isAccidental: "no",
  modificationStatus: "stock",
};

const steps = [
  { id: 1, title: "Car Details", icon: Car },
  { id: 2, title: "Specifications", icon: Settings },
  { id: 3, title: "Condition", icon: FileText },
];

export default function Evaluate() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const models = useMemo(() => getModelsForMake(formData.make), [formData.make]);
  const variants = useMemo(() => getVariantsForModel(formData.make, formData.model), [formData.make, formData.model]);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "make") {
        updated.model = "";
        updated.variant = "";
      }
      if (field === "model") {
        updated.variant = "";
      }
      return updated;
    });
  };

  const progress = (currentStep / steps.length) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.make && formData.model && formData.variant && formData.year;
      case 2:
        return formData.mileage && formData.transmission && formData.fuelType;
      case 3:
        return formData.interiorCondition.length >= 10 && formData.exteriorCondition.length >= 10;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams({
      make: formData.make,
      model: formData.model,
      variant: formData.variant,
      year: formData.year,
      mileage: formData.mileage,
      transmission: formData.transmission,
      engineCapacity: formData.engineCapacity,
      fuelType: formData.fuelType,
      interiorCondition: formData.interiorCondition,
      exteriorCondition: formData.exteriorCondition,
      isAccidental: formData.isAccidental,
      modificationStatus: formData.modificationStatus,
    });
    navigate(`/results?${queryParams.toString()}`);
  };

  const filledFields = Object.values(formData).filter((v) => v && v.length > 0).length;
  const totalFields = Object.keys(formData).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Evaluate Your Car</h1>
            <p className="text-muted-foreground">
              Fill in your car details to get an accurate market valuation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Steps */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div 
                          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                            currentStep >= step.id 
                              ? "bg-primary border-primary text-primary-foreground" 
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {currentStep > step.id ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <step.icon className="h-5 w-5" />
                          )}
                        </div>
                        <span className={`ml-3 text-sm font-medium hidden sm:inline ${
                          currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {step.title}
                        </span>
                        {index < steps.length - 1 && (
                          <ChevronRight className="h-5 w-5 mx-4 text-muted-foreground hidden sm:block" />
                        )}
                      </div>
                    ))}
                  </div>
                  <Progress value={progress} className="h-2" />
                </CardContent>
              </Card>

              {/* Step 1: Car Details */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-primary" />
                      Car Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="make">Make</Label>
                        <Select value={formData.make} onValueChange={(v) => updateField("make", v)}>
                          <SelectTrigger id="make" className="h-12" data-testid="select-make">
                            <SelectValue placeholder="Select make" />
                          </SelectTrigger>
                          <SelectContent>
                            {carDatabase.map((make) => (
                              <SelectItem key={make.name} value={make.name}>
                                {make.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Select 
                          value={formData.model} 
                          onValueChange={(v) => updateField("model", v)}
                          disabled={!formData.make}
                        >
                          <SelectTrigger id="model" className="h-12" data-testid="select-model">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            {models.map((model) => (
                              <SelectItem key={model.name} value={model.name}>
                                {model.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="variant">Variant</Label>
                        <Select 
                          value={formData.variant} 
                          onValueChange={(v) => updateField("variant", v)}
                          disabled={!formData.model}
                        >
                          <SelectTrigger id="variant" className="h-12" data-testid="select-variant">
                            <SelectValue placeholder="Select variant" />
                          </SelectTrigger>
                          <SelectContent>
                            {variants.map((variant) => (
                              <SelectItem key={variant.name} value={variant.name}>
                                {variant.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Select value={formData.year} onValueChange={(v) => updateField("year", v)}>
                          <SelectTrigger id="year" className="h-12" data-testid="select-year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Specifications */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="mileage" className="flex items-center gap-2">
                          <Gauge className="h-4 w-4" />
                          Mileage (km)
                        </Label>
                        <Input
                          id="mileage"
                          type="number"
                          placeholder="e.g., 45000"
                          className="h-12"
                          value={formData.mileage}
                          onChange={(e) => updateField("mileage", e.target.value)}
                          data-testid="input-mileage"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="transmission" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Transmission
                        </Label>
                        <Select value={formData.transmission} onValueChange={(v) => updateField("transmission", v)}>
                          <SelectTrigger id="transmission" className="h-12" data-testid="select-transmission">
                            <SelectValue placeholder="Select transmission" />
                          </SelectTrigger>
                          <SelectContent>
                            {transmissionTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="engineCapacity" className="flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          Engine Capacity (cc)
                        </Label>
                        <Input
                          id="engineCapacity"
                          type="number"
                          placeholder="e.g., 1500"
                          className="h-12"
                          value={formData.engineCapacity}
                          onChange={(e) => updateField("engineCapacity", e.target.value)}
                          data-testid="input-engine-capacity"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fuelType" className="flex items-center gap-2">
                          <Fuel className="h-4 w-4" />
                          Fuel Type
                        </Label>
                        <Select value={formData.fuelType} onValueChange={(v) => updateField("fuelType", v)}>
                          <SelectTrigger id="fuelType" className="h-12" data-testid="select-fuel-type">
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                          <SelectContent>
                            {fuelTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Condition */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Condition Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="interiorCondition" className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Interior Condition
                      </Label>
                      <Textarea
                        id="interiorCondition"
                        placeholder="Describe the interior condition... e.g., Seats are in excellent condition with no tears or stains. Dashboard is clean with no cracks. AC works perfectly."
                        className="min-h-32 resize-none"
                        value={formData.interiorCondition}
                        onChange={(e) => updateField("interiorCondition", e.target.value)}
                        data-testid="textarea-interior-condition"
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.interiorCondition.length}/500 characters (minimum 10)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exteriorCondition" className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        Exterior Condition
                      </Label>
                      <Textarea
                        id="exteriorCondition"
                        placeholder="Describe the exterior condition... e.g., Paint is original with minor scratches on bumper. No dents or rust. Tyres are 80% remaining."
                        className="min-h-32 resize-none"
                        value={formData.exteriorCondition}
                        onChange={(e) => updateField("exteriorCondition", e.target.value)}
                        data-testid="textarea-exterior-condition"
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.exteriorCondition.length}/500 characters (minimum 10)
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Accident History
                        </Label>
                        <RadioGroup 
                          value={formData.isAccidental} 
                          onValueChange={(v) => updateField("isAccidental", v)}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="non-accidental" data-testid="radio-non-accidental" />
                            <Label htmlFor="non-accidental" className="cursor-pointer">Non-Accidental</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="accidental" data-testid="radio-accidental" />
                            <Label htmlFor="accidental" className="cursor-pointer">Accidental</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Wrench className="h-4 w-4" />
                          Modification Status
                        </Label>
                        <RadioGroup 
                          value={formData.modificationStatus} 
                          onValueChange={(v) => updateField("modificationStatus", v)}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="stock" id="stock" data-testid="radio-stock" />
                            <Label htmlFor="stock" className="cursor-pointer">Stock</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="modified" id="modified" data-testid="radio-modified" />
                            <Label htmlFor="modified" className="cursor-pointer">Modified</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="gap-2"
                  data-testid="button-back"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                
                {currentStep < steps.length ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="gap-2"
                    data-testid="button-next"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className="gap-2"
                    data-testid="button-evaluate"
                  >
                    <Sparkles className="h-4 w-4" />
                    Evaluate Price
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Car className="h-5 w-5 text-primary" />
                      Car Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.make ? (
                      <>
                        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Make</span>
                            <span className="font-medium">{formData.make}</span>
                          </div>
                          {formData.model && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Model</span>
                              <span className="font-medium">{formData.model}</span>
                            </div>
                          )}
                          {formData.variant && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Variant</span>
                              <span className="font-medium">{formData.variant}</span>
                            </div>
                          )}
                          {formData.year && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Year</span>
                              <span className="font-medium">{formData.year}</span>
                            </div>
                          )}
                          {formData.mileage && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Mileage</span>
                              <span className="font-medium">{parseInt(formData.mileage).toLocaleString()} km</span>
                            </div>
                          )}
                          {formData.transmission && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Transmission</span>
                              <span className="font-medium">{formData.transmission}</span>
                            </div>
                          )}
                          {formData.fuelType && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Fuel Type</span>
                              <span className="font-medium">{formData.fuelType}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-center py-2">
                          <Badge variant="secondary">
                            {filledFields}/{totalFields} fields completed
                          </Badge>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Car className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Start by selecting your car make</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Pro Tip</p>
                        <p className="text-xs text-muted-foreground">
                          Be detailed when describing your car's condition. 
                          Accurate descriptions lead to more precise valuations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
