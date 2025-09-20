import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hexToRgb, rgbToHex } from "../utils/color";
import { calculateShippingCost } from "../utils/shipping";
import { useBoxesStore } from "../stores/useBoxesStore";
import type { Destination } from "../types";

const DESTINATIONS: Destination[] = ["Sweden", "China", "Brazil", "Australia"];

export default function BoxForm() {
  const addBox = useBoxesStore((s: any) => s.addBox);
  const [receiverName, setReceiverName] = useState("");
  const [weight, setWeight] = useState<string>("");
  const [colorRgb, setColorRgb] = useState<[number, number, number]>([
    255, 255, 255,
  ]);
  const [destination, setDestination] = useState<Destination>("Sweden");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function validate() {
    const e: Record<string, string> = {};
    if (!receiverName.trim()) e.receiverName = "Receiver name is required";
    const w = Number(weight);
    if (weight === "") e.weight = "Weight is required";
    else if (isNaN(w)) e.weight = "Weight must be a number";
    else if (w < 0)
      e.weight =
        "Negative values not permitted — please enter a non-negative weight";
    if (!colorRgb || colorRgb.length !== 3) e.color = "Color is required";
    if (!destination) e.destination = "Destination is required";
    setErrors(e);
    return {
      valid: Object.keys(e).length === 0,
      parsedWeight: isNaN(Number(weight)) ? 0 : Number(weight),
      errors: e,
    };
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { valid, parsedWeight } = validate();
    if (!valid) return;

    const finalWeight = parsedWeight < 0 ? 0 : parsedWeight;

    setSaving(true);
    try {
      await addBox({
        receiverName,
        weightKg: finalWeight,
        colorRgb,
        destination,
      });
      navigate("/list");
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: "Failed to save. Try again." }));
    } finally {
      setSaving(false);
    }
  }

  function onWeightChange(val: string) {
    setWeight(val);

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.submit;
      return copy;
    });

    if (val === "") {
      setErrors((prev) => ({ ...prev, weight: "Weight is required" }));
      return;
    }

    const num = Number(val);

    if (isNaN(num)) {
      setErrors((prev) => ({ ...prev, weight: "Weight must be a number" }));
      return;
    }

    if (num < 0) {
      setErrors((prev) => ({
        ...prev,
        weight: "Negative values are not permitted — enter 0 or greater",
      }));
      return;
    }

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.weight;
      return copy;
    });
  }

  function onReceiverChange(v: string) {
    setReceiverName(v);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.receiverName;
      delete copy.submit;
      return copy;
    });
  }

  function onColorRgbChange(rgb: [number, number, number]) {
    setColorRgb(rgb);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.color;
      delete copy.submit;
      return copy;
    });
  }

  function onDestinationChange(v: Destination) {
    setDestination(v);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.destination;
      return copy;
    });
  }

  const isFormValid = useMemo(() => {
    if (!receiverName.trim()) return false;
    if (weight === "") return false;
    const num = Number(weight);
    if (isNaN(num)) return false;
    if (num < 0) return false;
    if (!colorRgb || colorRgb.length !== 3) return false;
    if (!destination) return false;
    return true;
  }, [receiverName, weight, colorRgb, destination]);

  const parsedWeightPreview = Number(weight || 0);
  const estimated = calculateShippingCost(
    parsedWeightPreview < 0 ? 0 : parsedWeightPreview,
    destination
  );

  const colorHex = useMemo(() => rgbToHex(colorRgb), [colorRgb]);

  return (
    <div className="max-w-md mx-auto mt-8">
      {/* Card */}
      <form
        onSubmit={onSubmit}
        aria-labelledby="add-box-heading"
        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      >
        {/* Card body */}
        <div className="p-6">
          <h2 id="add-box-heading" className="text-2xl font-semibold mb-4">
            Add Box
          </h2>

          {/* Receiver */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Receiver name
            </label>
            <input
              aria-label="Receiver name"
              value={receiverName}
              onChange={(e) => onReceiverChange(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white text-gray-900"
              placeholder="Enter receiver name"
              aria-invalid={!!errors.receiverName}
            />
            {errors.receiverName && (
              <p className="text-red-600 text-sm mt-1">{errors.receiverName}</p>
            )}
          </div>

          {/* Weight */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              aria-label="Weight in kilograms"
              value={weight}
              onChange={(e) => onWeightChange(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white text-gray-900"
              placeholder="eg., 0.5"
              aria-invalid={!!errors.weight}
            />
            {errors.weight && (
              <p className="text-red-600 text-sm mt-1">{errors.weight}</p>
            )}
          </div>

          {/* Color */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Select a color by clicking the circle
            </label>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black">
                <input
                  type="color"
                  aria-label="Box colour"
                  value={colorHex}
                  onChange={(e) => {
                    const hex = e.target.value;
                    const converted = hexToRgb(hex);
                    onColorRgbChange(converted);
                  }}
                  className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                />
                <div
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: colorHex }}
                />
              </div>
              {/* <div className="text-sm text-gray-700 select-all">
                <span className="block text-xs text-gray-500">Color (RGB)</span>
                <div className="font-mono">({colorRgb.join(", ")})</div>
              </div> */}
            </div>
            </div>
            {errors.color && (
              <p className="text-red-600 text-sm mt-1">{errors.color}</p>
            )}
          </div>

          {/* Destination */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination country
            </label>
            <select
              value={destination}
              onChange={(e) =>
                onDestinationChange(e.target.value as Destination)
              }
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-gray-900"
              aria-invalid={!!errors.destination}
            >
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.destination && (
              <p className="text-red-600 text-sm mt-1">{errors.destination}</p>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Estimated cost preview:{" "}
            <strong className="text-gray-900 text-lg">₹{estimated.toFixed(2)}</strong>
          </div>

          {errors.submit && (
            <div className="mt-3 text-sm text-red-600">{errors.submit}</div>
          )}
        </div>

        {/* Card footer */}
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setReceiverName("");
              setWeight("");
              setColorRgb([255, 255, 255]);
              setDestination("Sweden");
              setErrors({});
            }}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={!isFormValid || saving}
            aria-disabled={!isFormValid || saving}
            className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              !isFormValid || saving ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
