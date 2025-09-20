export function hexToRgb(hex: string): [number, number, number] {
    const cleaned = hex.replace('#', '')
    const bigint = parseInt(cleaned, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return [r, g, b]
    }
    
    export function rgbToCss(rgb: [number, number, number]) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }
  
  export function rgbToHex([r, g, b]: [number, number, number]) {
    const toHex = (n: number) =>
      Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
  }
  