export type Destination = "Sweden" | "China" | "Brazil" | "Australia";

export type Box = {
  id: string;
  receiverName: string;
  weightKg: number;
  colorRgb: [number, number, number];
  destination: Destination;
  shippingCostINR: number;
  createdAt: string;
};
