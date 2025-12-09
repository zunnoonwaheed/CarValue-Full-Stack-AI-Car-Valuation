/**
 * Mock Data for CarValue Frontend
 * This file contains static data to simulate API responses
 */

export interface User {
  id: string;
  username: string;
  password: string;
  email: string | null;
  name: string | null;
  createdAt: Date;
}

export interface Evaluation {
  id: string;
  userId: string | null;
  make: string;
  model: string;
  variant: string;
  year: number;
  mileage: number;
  transmission: string;
  engineCapacity: number | null;
  fuelType: string;
  interiorCondition: string | null;
  exteriorCondition: string | null;
  isAccidental: boolean;
  modificationStatus: string;
  images: string[] | null;
  suggestedPrice: number;
  minPrice: number;
  maxPrice: number;
  confidence: number;
  aiAnalysis: string | null;
  createdAt: Date;
}

export interface PriceAlert {
  id: string;
  userId: string;
  evaluationId: string | null;
  carName: string;
  targetPrice: number;
  currentPrice: number;
  status: string;
  notifyEmail: boolean;
  notifyPush: boolean;
  triggeredAt: Date | null;
  createdAt: Date;
}

// Mock User
export const mockUser: User = {
  id: "user-001",
  username: "demo@carvalue.pk",
  password: "hashed_password",
  email: "demo@carvalue.pk",
  name: "Demo User",
  createdAt: new Date("2024-01-15"),
};

// Mock Evaluations
export const mockEvaluations: Evaluation[] = [
  {
    id: "eval-001",
    userId: "user-001",
    make: "Toyota",
    model: "Corolla",
    variant: "Altis 1.6",
    year: 2020,
    mileage: 35000,
    transmission: "Automatic",
    engineCapacity: 1600,
    fuelType: "Petrol",
    interiorCondition: "Excellent",
    exteriorCondition: "Good",
    isAccidental: false,
    modificationStatus: "stock",
    images: null,
    suggestedPrice: 4200000,
    minPrice: 3950000,
    maxPrice: 4450000,
    confidence: 85,
    aiAnalysis: "Well-maintained Toyota Corolla Altis with low mileage. The vehicle shows minimal wear and tear. Market conditions are favorable for this model. Price reflects excellent condition and stock configuration.",
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "eval-002",
    userId: "user-001",
    make: "Honda",
    model: "Civic",
    variant: "Oriel 1.5T",
    year: 2019,
    mileage: 52000,
    transmission: "CVT",
    engineCapacity: 1500,
    fuelType: "Petrol",
    interiorCondition: "Good",
    exteriorCondition: "Good",
    isAccidental: false,
    modificationStatus: "stock",
    images: null,
    suggestedPrice: 5800000,
    minPrice: 5500000,
    maxPrice: 6100000,
    confidence: 82,
    aiAnalysis: "Honda Civic Oriel in good overall condition with average mileage for the year. Popular variant with strong resale value in Pakistani market. CVT transmission well-maintained.",
    createdAt: new Date("2024-11-28"),
  },
  {
    id: "eval-003",
    userId: "user-001",
    make: "Suzuki",
    model: "Alto",
    variant: "VXL AGS",
    year: 2022,
    mileage: 15000,
    transmission: "AGS",
    engineCapacity: 658,
    fuelType: "Petrol",
    interiorCondition: "Excellent",
    exteriorCondition: "Excellent",
    isAccidental: false,
    modificationStatus: "stock",
    images: null,
    suggestedPrice: 2150000,
    minPrice: 2050000,
    maxPrice: 2250000,
    confidence: 90,
    aiAnalysis: "Nearly new Suzuki Alto VXL with very low mileage. Excellent condition throughout. High demand model in the economy segment. AGS transmission is a popular feature.",
    createdAt: new Date("2024-11-25"),
  },
  {
    id: "eval-004",
    userId: "user-001",
    make: "Toyota",
    model: "Fortuner",
    variant: "2.7 V",
    year: 2018,
    mileage: 68000,
    transmission: "Automatic",
    engineCapacity: 2700,
    fuelType: "Petrol",
    interiorCondition: "Good",
    exteriorCondition: "Fair",
    isAccidental: true,
    modificationStatus: "stock",
    images: null,
    suggestedPrice: 7200000,
    minPrice: 6800000,
    maxPrice: 7500000,
    confidence: 72,
    aiAnalysis: "Toyota Fortuner with accident history but professionally repaired. Higher mileage for the year. Strong SUV market demand maintains value. Price adjusted for accident history.",
    createdAt: new Date("2024-11-20"),
  },
  {
    id: "eval-005",
    userId: "user-001",
    make: "Honda",
    model: "City",
    variant: "1.5L Aspire",
    year: 2021,
    mileage: 28000,
    transmission: "CVT",
    engineCapacity: 1500,
    fuelType: "Petrol",
    interiorCondition: "Excellent",
    exteriorCondition: "Excellent",
    isAccidental: false,
    modificationStatus: "stock",
    images: null,
    suggestedPrice: 3900000,
    minPrice: 3750000,
    maxPrice: 4050000,
    confidence: 88,
    aiAnalysis: "Well-maintained Honda City Aspire with low mileage. Top variant with all features. Excellent condition justifies premium pricing. Strong demand in mid-size sedan segment.",
    createdAt: new Date("2024-11-15"),
  },
];

// Mock Price Alerts
export const mockPriceAlerts: PriceAlert[] = [
  {
    id: "alert-001",
    userId: "user-001",
    evaluationId: "eval-001",
    carName: "Toyota Corolla Altis 1.6 (2020)",
    targetPrice: 4000000,
    currentPrice: 4200000,
    status: "active",
    notifyEmail: true,
    notifyPush: true,
    triggeredAt: null,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "alert-002",
    userId: "user-001",
    evaluationId: "eval-002",
    carName: "Honda Civic Oriel 1.5T (2019)",
    targetPrice: 5500000,
    currentPrice: 5800000,
    status: "triggered",
    notifyEmail: true,
    notifyPush: false,
    triggeredAt: new Date("2024-12-05"),
    createdAt: new Date("2024-11-28"),
  },
  {
    id: "alert-003",
    userId: "user-001",
    evaluationId: null,
    carName: "Toyota Prado TX (2021)",
    targetPrice: 20000000,
    currentPrice: 22000000,
    status: "active",
    notifyEmail: true,
    notifyPush: true,
    triggeredAt: null,
    createdAt: new Date("2024-11-20"),
  },
  {
    id: "alert-004",
    userId: "user-001",
    evaluationId: "eval-005",
    carName: "Honda City 1.5L Aspire (2021)",
    targetPrice: 3700000,
    currentPrice: 3900000,
    status: "paused",
    notifyEmail: false,
    notifyPush: false,
    triggeredAt: null,
    createdAt: new Date("2024-11-15"),
  },
];

// Helper function to generate a new evaluation with mock AI analysis
export function generateMockEvaluation(data: any): Evaluation {
  const suggestedPrice = Math.round(data.basePrice * (1 - (new Date().getFullYear() - data.year) * 0.08) * (1 - data.mileage / 500000));
  const variance = suggestedPrice * 0.1;

  return {
    id: `eval-${Date.now()}`,
    userId: "user-001",
    make: data.make,
    model: data.model,
    variant: data.variant,
    year: data.year,
    mileage: data.mileage,
    transmission: data.transmission,
    engineCapacity: data.engineCapacity || null,
    fuelType: data.fuelType,
    interiorCondition: data.interiorCondition || null,
    exteriorCondition: data.exteriorCondition || null,
    isAccidental: data.isAccidental || false,
    modificationStatus: data.modificationStatus || "stock",
    images: data.images || null,
    suggestedPrice: suggestedPrice,
    minPrice: Math.round(suggestedPrice - variance),
    maxPrice: Math.round(suggestedPrice + variance),
    confidence: Math.floor(Math.random() * 20) + 75, // 75-95
    aiAnalysis: `Based on market analysis, this ${data.make} ${data.model} ${data.variant} (${data.year}) with ${data.mileage.toLocaleString()} km is valued competitively. ${data.isAccidental ? "Accident history has been factored into the valuation. " : ""}The vehicle's ${data.interiorCondition?.toLowerCase() || "good"} condition and ${data.transmission} transmission align well with market expectations.`,
    createdAt: new Date(),
  };
}

// Helper function to generate a new price alert
export function generateMockPriceAlert(data: any): PriceAlert {
  return {
    id: `alert-${Date.now()}`,
    userId: "user-001",
    evaluationId: data.evaluationId || null,
    carName: data.carName,
    targetPrice: data.targetPrice,
    currentPrice: data.currentPrice,
    status: "active",
    notifyEmail: data.notifyEmail ?? true,
    notifyPush: data.notifyPush ?? true,
    triggeredAt: null,
    createdAt: new Date(),
  };
}
