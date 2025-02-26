import type { Color } from "~/app/derivean/type/Color";

function labToXyz([L, a, b]: Color): { X: number; Y: number; Z: number } {
	// Reference white for D65
	const Xn = 95.047;
	const Yn = 100.0;
	const Zn = 108.883;

	// Convert Lab to XYZ using the standard formulas:
	const fy = (L + 16) / 116;
	const fx = a / 500 + fy;
	const fz = fy - b / 200;

	// Delta constant per the standard
	const delta = 6 / 29;

	const xr = fx > delta ? fx ** 3 : (fx - 16 / 116) / 7.787;
	const yr = L > delta * 116 ? fy ** 3 : L / 903.3;
	const zr = fz > delta ? fz ** 3 : (fz - 16 / 116) / 7.787;

	return { X: xr * Xn, Y: yr * Yn, Z: zr * Zn };
}

function xyzToLinearRgb({ X, Y, Z }: { X: number; Y: number; Z: number }): {
	r: number;
	g: number;
	b: number;
} {
	// Convert XYZ (using the D65 reference white) to linear sRGB.
	// First normalize XYZ to [0, 1] by dividing by 100.
	X /= 100;
	Y /= 100;
	Z /= 100;

	// sRGB conversion matrix (from XYZ to linear sRGB)
	const r = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
	const g = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
	const b = X * 0.0557 + Y * -0.204 + Z * 1.057;

	return { r, g, b };
}

function linearToSrgb(c: number): number {
	// Apply gamma correction for sRGB
	return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
}

export function labToRgba(lab: Color): [number, number, number, number] {
	// Convert Lab to XYZ
	const { X, Y, Z } = labToXyz(lab);
	// Convert XYZ to linear sRGB
	const { r: linR, g: linG, b: linB } = xyzToLinearRgb({ X, Y, Z });
	// Convert linear sRGB to sRGB with gamma correction
	return [
		Math.round(linearToSrgb(linR) * 255),
		Math.round(linearToSrgb(linG) * 255),
		Math.round(linearToSrgb(linB) * 255),
		lab[3],
	];
}
