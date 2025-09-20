import { useEffect } from "react";
import { useBoxesStore } from "../stores/useBoxesStore";
import ColorBox from "./ColorBox";

export default function BoxList() {
  const boxes = useBoxesStore((s) => s.boxes);
  const loadBoxes = useBoxesStore((s) => s.loadBoxes);
  const loading = useBoxesStore((s) => s.loading);

  useEffect(() => {
    loadBoxes();
  }, [loadBoxes]);

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Boxes</h2>
        {loading && <div>Loading...</div>}
        {!loading && boxes.length === 0 && (
          <div className="text-gray-600">No boxes yet. Add one.</div>
        )}
        {!loading && boxes.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">Receiver</th>
                  <th className="p-2">Weight (kg)</th>
                  <th className="p-2">Color</th>
                  <th className="p-2">Destination</th>
                  <th className="p-2">Shipping Cost (INR)</th>
                </tr>
              </thead>
              <tbody>
                {boxes.map((b: any) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 align-top">{b.receiverName}</td>
                    <td className="p-2 align-top">{b.weightKg}</td>
                    <td className="p-2 align-top">
                      <ColorBox rgb={b.colorRgb} />
                    </td>
                    <td className="p-2 align-top">{b.destination}</td>
                    <td className="p-2 align-top">₹{b.shippingCostINR.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
