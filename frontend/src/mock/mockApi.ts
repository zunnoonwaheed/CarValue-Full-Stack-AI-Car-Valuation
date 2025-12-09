/**
 * Mock API Functions
 * These functions simulate API calls with static data
 * Replace these with real API calls when backend is ready
 */

import {
  mockEvaluations,
  mockPriceAlerts,
  generateMockEvaluation,
  generateMockPriceAlert,
  type Evaluation,
  type PriceAlert,
  type User,
} from "./mockData";
import {
  allUsers,
  additionalEvaluations,
  additionalAlerts,
  adminStats,
  recentActivity,
  type AdminStats,
  type AdminActivity,
} from "./adminMockData";

// Simulate network delay
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory storage for new items
let evaluations = [...mockEvaluations, ...additionalEvaluations];
let priceAlerts = [...mockPriceAlerts, ...additionalAlerts];
let users = [...allUsers];

/**
 * Create a new car evaluation
 * POST /api/evaluations
 */
export async function createEvaluation(data: any): Promise<Evaluation> {
  await delay(800); // Simulate AI processing time

  const newEvaluation = generateMockEvaluation(data);
  evaluations.unshift(newEvaluation);

  return newEvaluation;
}

/**
 * Get user evaluations
 * GET /api/evaluations?userId={userId}
 */
export async function getUserEvaluations(userId: string): Promise<Evaluation[]> {
  await delay();

  return evaluations.filter((evaluation) => evaluation.userId === userId);
}

/**
 * Get a specific evaluation by ID
 * GET /api/evaluations/{id}
 */
export async function getEvaluation(id: string): Promise<Evaluation | null> {
  await delay();

  return evaluations.find((evaluation) => evaluation.id === id) || null;
}

/**
 * Delete an evaluation
 * DELETE /api/evaluations/{id}
 */
export async function deleteEvaluation(id: string): Promise<boolean> {
  await delay();

  const index = evaluations.findIndex((evaluation) => evaluation.id === id);
  if (index !== -1) {
    evaluations.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Create a price alert
 * POST /api/alerts
 */
export async function createPriceAlert(data: any): Promise<PriceAlert> {
  await delay();

  const newAlert = generateMockPriceAlert(data);
  priceAlerts.unshift(newAlert);

  return newAlert;
}

/**
 * Get user price alerts
 * GET /api/alerts?userId={userId}
 */
export async function getUserAlerts(userId: string): Promise<PriceAlert[]> {
  await delay();

  return priceAlerts.filter((alert) => alert.userId === userId);
}

/**
 * Update alert status
 * PATCH /api/alerts/{id}/status
 */
export async function updateAlertStatus(id: string, status: string): Promise<PriceAlert | null> {
  await delay();

  const alert = priceAlerts.find((a) => a.id === id);
  if (alert) {
    alert.status = status;
    return alert;
  }
  return null;
}

/**
 * Delete a price alert
 * DELETE /api/alerts/{id}
 */
export async function deletePriceAlert(id: string): Promise<boolean> {
  await delay();

  const index = priceAlerts.findIndex((alert) => alert.id === id);
  if (index !== -1) {
    priceAlerts.splice(index, 1);
    return true;
  }
  return false;
}

// ============================================
// ADMIN API FUNCTIONS
// ============================================

/**
 * Get all users (Admin only)
 * GET /api/admin/users
 */
export async function getAllUsers(): Promise<User[]> {
  await delay();
  return users;
}

/**
 * Get all evaluations (Admin only)
 * GET /api/admin/evaluations
 */
export async function getAllEvaluations(): Promise<Evaluation[]> {
  await delay();
  return evaluations;
}

/**
 * Get all alerts (Admin only)
 * GET /api/admin/alerts
 */
export async function getAllAlerts(): Promise<PriceAlert[]> {
  await delay();
  return priceAlerts;
}

/**
 * Get admin statistics (Admin only)
 * GET /api/admin/stats
 */
export async function getAdminStats(): Promise<AdminStats> {
  await delay();
  return {
    ...adminStats,
    totalUsers: users.length,
    totalEvaluations: evaluations.length,
    totalAlerts: priceAlerts.length,
    activeAlerts: priceAlerts.filter((a) => a.status === "active").length,
    triggeredAlerts: priceAlerts.filter((a) => a.status === "triggered").length,
    evaluationsThisMonth: evaluations.filter(
      (e) => new Date(e.createdAt).getMonth() === new Date().getMonth()
    ).length,
    newUsersThisMonth: users.filter(
      (u) => new Date(u.createdAt).getMonth() === new Date().getMonth()
    ).length,
  };
}

/**
 * Get recent activity (Admin only)
 * GET /api/admin/activity
 */
export async function getRecentActivity(): Promise<AdminActivity[]> {
  await delay();
  return recentActivity;
}

/**
 * Delete user (Admin only)
 * DELETE /api/admin/users/{id}
 */
export async function deleteUser(id: string): Promise<boolean> {
  await delay();
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    // Also delete user's evaluations and alerts
    evaluations = evaluations.filter((e) => e.userId !== id);
    priceAlerts = priceAlerts.filter((a) => a.userId !== id);
    return true;
  }
  return false;
}

// Export mock API as default
export default {
  createEvaluation,
  getUserEvaluations,
  getEvaluation,
  deleteEvaluation,
  createPriceAlert,
  getUserAlerts,
  updateAlertStatus,
  deletePriceAlert,
  // Admin functions
  getAllUsers,
  getAllEvaluations,
  getAllAlerts,
  getAdminStats,
  getRecentActivity,
  deleteUser,
};
