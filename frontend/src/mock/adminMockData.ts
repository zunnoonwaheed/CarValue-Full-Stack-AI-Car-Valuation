/**
 * Admin Mock Data
 * Additional data for admin panel views
 */

import { User, Evaluation, PriceAlert } from "./mockData";

// All Users in the system
export const allUsers: User[] = [
  {
    id: "user-001",
    username: "demo@carvalue.pk",
    password: "hashed_password",
    email: "demo@carvalue.pk",
    name: "Demo User",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "user-002",
    username: "ahmed.khan@gmail.com",
    password: "hashed_password",
    email: "ahmed.khan@gmail.com",
    name: "Ahmed Khan",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "user-003",
    username: "sara.ali@yahoo.com",
    password: "hashed_password",
    email: "sara.ali@yahoo.com",
    name: "Sara Ali",
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "user-004",
    username: "imran.malik@hotmail.com",
    password: "hashed_password",
    email: "imran.malik@hotmail.com",
    name: "Imran Malik",
    createdAt: new Date("2024-04-12"),
  },
  {
    id: "user-005",
    username: "fatima.Sheikh@gmail.com",
    password: "hashed_password",
    email: "fatima.Sheikh@gmail.com",
    name: "Fatima Sheikh",
    createdAt: new Date("2024-05-20"),
  },
];

// Additional evaluations from other users
export const additionalEvaluations: Evaluation[] = [
  {
    id: "eval-006",
    userId: "user-002",
    make: "Honda",
    model: "Civic",
    variant: "RS 1.5T",
    year: 2021,
    mileage: 28000,
    transmission: "CVT",
    engineCapacity: 1500,
    fuelType: "Petrol",
    interiorCondition: "Excellent",
    exteriorCondition: "Excellent",
    isAccidental: false,
    modificationStatus: "modified",
    images: null,
    suggestedPrice: 7200000,
    minPrice: 6900000,
    maxPrice: 7500000,
    confidence: 88,
    aiAnalysis: "Premium Honda Civic RS with low mileage and modifications. High demand variant in excellent condition.",
    createdAt: new Date("2024-11-10"),
  },
  {
    id: "eval-007",
    userId: "user-003",
    make: "Toyota",
    model: "Prado",
    variant: "TX",
    year: 2019,
    mileage: 45000,
    transmission: "Automatic",
    engineCapacity: 2700,
    fuelType: "Diesel",
    interiorCondition: "Good",
    exteriorCondition: "Good",
    isAccidental: false,
    modificationStatus: "stock",
    images: null,
    suggestedPrice: 18500000,
    minPrice: 17800000,
    maxPrice: 19200000,
    confidence: 85,
    aiAnalysis: "Toyota Prado TX with diesel engine. Well-maintained SUV with good market demand.",
    createdAt: new Date("2024-11-08"),
  },
  {
    id: "eval-008",
    userId: "user-004",
    make: "Suzuki",
    model: "Cultus",
    variant: "VXL",
    year: 2023,
    mileage: 8000,
    transmission: "Manual",
    engineCapacity: 998,
    fuelType: "Petrol",
    interiorCondition: "Excellent",
    exteriorCondition: "Excellent",
    isAccidental: false,
    modificationStatus: "stock",
    images: null,
    suggestedPrice: 2600000,
    minPrice: 2500000,
    maxPrice: 2700000,
    confidence: 92,
    aiAnalysis: "Almost new Suzuki Cultus VXL with minimal usage. Excellent condition and high resale value.",
    createdAt: new Date("2024-11-05"),
  },
  {
    id: "eval-009",
    userId: "user-005",
    make: "KIA",
    model: "Sportage",
    variant: "AWD",
    year: 2020,
    mileage: 42000,
    transmission: "Automatic",
    engineCapacity: 2000,
    fuelType: "Petrol",
    interiorCondition: "Good",
    exteriorCondition: "Fair",
    isAccidental: true,
    modificationStatus: "stock",
    images: null,
    suggestedPrice: 9200000,
    minPrice: 8800000,
    maxPrice: 9600000,
    confidence: 75,
    aiAnalysis: "KIA Sportage AWD with accident history. Professionally repaired but price adjusted for history.",
    createdAt: new Date("2024-11-02"),
  },
  {
    id: "eval-010",
    userId: "user-002",
    make: "MG",
    model: "HS",
    variant: "Essence",
    year: 2022,
    mileage: 18000,
    transmission: "Automatic",
    engineCapacity: 1500,
    fuelType: "Petrol",
    interiorCondition: "Excellent",
    exteriorCondition: "Excellent",
    isAccidental: false,
    modificationStatus: "stock",
    images: null,
    suggestedPrice: 6800000,
    minPrice: 6500000,
    maxPrice: 7100000,
    confidence: 87,
    aiAnalysis: "MG HS Essence in excellent condition with low mileage. Growing brand popularity in Pakistan market.",
    createdAt: new Date("2024-10-28"),
  },
];

// Additional price alerts
export const additionalAlerts: PriceAlert[] = [
  {
    id: "alert-005",
    userId: "user-002",
    evaluationId: "eval-006",
    carName: "Honda Civic RS 1.5T (2021)",
    targetPrice: 7000000,
    currentPrice: 7200000,
    status: "active",
    notifyEmail: true,
    notifyPush: true,
    triggeredAt: null,
    createdAt: new Date("2024-11-10"),
  },
  {
    id: "alert-006",
    userId: "user-003",
    evaluationId: "eval-007",
    carName: "Toyota Prado TX (2019)",
    targetPrice: 18000000,
    currentPrice: 18500000,
    status: "active",
    notifyEmail: true,
    notifyPush: false,
    triggeredAt: null,
    createdAt: new Date("2024-11-08"),
  },
  {
    id: "alert-007",
    userId: "user-004",
    evaluationId: null,
    carName: "Honda City 1.5L Aspire (2022)",
    targetPrice: 4000000,
    currentPrice: 4300000,
    status: "triggered",
    notifyEmail: true,
    notifyPush: true,
    triggeredAt: new Date("2024-11-12"),
    createdAt: new Date("2024-10-15"),
  },
  {
    id: "alert-008",
    userId: "user-005",
    evaluationId: "eval-009",
    carName: "KIA Sportage AWD (2020)",
    targetPrice: 9000000,
    currentPrice: 9200000,
    status: "paused",
    notifyEmail: false,
    notifyPush: false,
    triggeredAt: null,
    createdAt: new Date("2024-11-02"),
  },
];

// Admin Statistics
export interface AdminStats {
  totalUsers: number;
  totalEvaluations: number;
  totalAlerts: number;
  activeAlerts: number;
  triggeredAlerts: number;
  evaluationsThisMonth: number;
  newUsersThisMonth: number;
  revenue: number;
}

export const adminStats: AdminStats = {
  totalUsers: 5,
  totalEvaluations: 10,
  totalAlerts: 8,
  activeAlerts: 4,
  triggeredAlerts: 2,
  evaluationsThisMonth: 6,
  newUsersThisMonth: 2,
  revenue: 0, // Free service for now
};

// Recent Activity
export interface AdminActivity {
  id: string;
  type: "evaluation" | "alert" | "user";
  action: string;
  user: string;
  timestamp: Date;
  details: string;
}

export const recentActivity: AdminActivity[] = [
  {
    id: "activity-001",
    type: "evaluation",
    action: "Created evaluation",
    user: "Demo User",
    timestamp: new Date("2024-12-09T10:30:00"),
    details: "Toyota Corolla Altis 1.6 (2020)",
  },
  {
    id: "activity-002",
    type: "alert",
    action: "Triggered alert",
    user: "Imran Malik",
    timestamp: new Date("2024-12-09T09:15:00"),
    details: "Honda City 1.5L Aspire reached target price",
  },
  {
    id: "activity-003",
    type: "user",
    action: "New user registration",
    user: "Fatima Sheikh",
    timestamp: new Date("2024-12-08T14:20:00"),
    details: "Joined from Karachi",
  },
  {
    id: "activity-004",
    type: "evaluation",
    action: "Created evaluation",
    user: "Ahmed Khan",
    timestamp: new Date("2024-12-08T11:45:00"),
    details: "MG HS Essence (2022)",
  },
  {
    id: "activity-005",
    type: "alert",
    action: "Created alert",
    user: "Sara Ali",
    timestamp: new Date("2024-12-07T16:30:00"),
    details: "Toyota Prado TX (2019) - Target: 18M",
  },
];
