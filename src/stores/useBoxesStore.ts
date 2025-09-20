import { create } from "zustand";
import type { Box } from "../types";
import * as api from "../api/boxesClient";

type State = {
  boxes: Box[];
  loading: boolean;
  error?: string | null;
  loadBoxes: () => Promise<void>;
  addBox: (
    input: Omit<Box, "id" | "shippingCostINR" | "createdAt"> & {
      receiverName: string;
    }
  ) => Promise<void>;
  clear: () => Promise<void>;
};

export const useBoxesStore = create<State>((set: any) => ({
  boxes: [],
  loading: false,
  error: null,
  loadBoxes: async () => {
    set({ loading: true, error: null });
    try {
      const boxes = await api.getBoxes();
      set({ boxes, loading: false });
    } catch (err) {
      set({ error: "Failed to load boxes", loading: false });
    }
  },
  addBox: async (input: any) => {
    set({ loading: true, error: null });
    try {
      const saved = await api.saveBox({
        receiverName: input.receiverName,
        weightKg: input.weightKg,
        colorRgb: input.colorRgb,
        destination: input.destination,
      });
      set((state: any) => ({ boxes: [saved, ...state.boxes], loading: false }));
    } catch (err) {
      set({ error: "Failed to save box", loading: false });
    }
  },
  clear: async () => {
    await api.clearBoxes();
    set({ boxes: [] });
  },
}));
