import type { Destination } from "../types";

export const MULTIPLIERS: Record<Destination, number> = {
  Sweden: 7.35,
  China: 11.53,
  Brazil: 15.63,
  Australia: 50.09,
};

export function calculateShippingCost(weightKg: number, dest: Destination) {
  const w = Number.isFinite(weightKg) ? Math.max(0, weightKg) : 0;
  const cost = w * MULTIPLIERS[dest];
  return Math.round(cost * 100) / 100;
}
