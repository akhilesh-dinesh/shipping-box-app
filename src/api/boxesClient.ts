import type { Box, Destination } from "../types";
import { calculateShippingCost } from "../utils/shipping";

const STORAGE_KEY = "shipping_box_app_boxes_v1";

function readRaw(): Box[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Box[];
  } catch {
    return [];
  }
}
function writeRaw(boxes: Box[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(boxes));
}

function delay<T>(v: T, ms = 250) {
  return new Promise<T>((res) => setTimeout(() => res(v), ms));
}

export async function getBoxes(): Promise<Box[]> {
  return delay(readRaw());
}

export async function saveBox(payload: {
  receiverName: string;
  weightKg: number;
  colorRgb: [number, number, number];
  destination: Destination;
}): Promise<Box> {
  let { weightKg } = payload;
  if (!Number.isFinite(weightKg) || isNaN(weightKg)) weightKg = 0;
  if (weightKg < 0) weightKg = 0;

  const box: Box = {
    id:
      crypto && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now()),
    receiverName: String(payload.receiverName || "").trim(),
    weightKg,
    colorRgb: payload.colorRgb,
    destination: payload.destination,
    shippingCostINR: calculateShippingCost(weightKg, payload.destination),
    createdAt: new Date().toISOString(),
  };

  const boxes = readRaw();
  boxes.unshift(box);
  writeRaw(boxes);

  return delay(box, 300);
}

export async function clearBoxes() {
  localStorage.removeItem(STORAGE_KEY);
  return delay(true, 50);
}
