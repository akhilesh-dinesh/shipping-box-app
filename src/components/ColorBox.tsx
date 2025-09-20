import { rgbToCss } from "../utils/color";

export default function ColorBox({
  rgb,
  size = 24,
}: {
  rgb: [number, number, number];
  size?: number;
}) {
  return (
    <div
      aria-label={`Color ${rgb.join(",")}`}
      title={`rgb(${rgb.join(",")})`}
      style={{ background: rgbToCss(rgb), width: size, height: size }}
      className="rounded-full border"
    />
  );
}
