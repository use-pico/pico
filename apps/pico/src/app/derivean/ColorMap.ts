import type { GameConfig } from "~/app/derivean/GameConfig";

const baseStops: GameConfig.ColorMap[] = [
	// Deep Ocean (Dark to Vibrant Blues)
	{ noise: -1.0, color: "#000022" },
	{ noise: -0.95, color: "#000044" },
	{ noise: -0.9, color: "#001f7f" },
	{ noise: -0.85, color: "#002b9f" },
	{ noise: -0.8, color: "#0037bf" },
	{ noise: -0.75, color: "#0043df" },
	{ noise: -0.7, color: "#0050ff" },
	{ noise: -0.65, color: "#0062ff" },
	{ noise: -0.6, color: "#0074ff" },
	{ noise: -0.55, color: "#0086ff" },
	{ noise: -0.5, color: "#0098ff" },
	// Shallow Waters & Beaches (Yellowish Transition)
	{ noise: -0.45, color: "#00aaff" },
	{ noise: -0.4, color: "#11ccff" },
	{ noise: -0.35, color: "#33ddff" },
	{ noise: -0.3, color: "#55eeff" },
	{ noise: -0.25, color: "#77ffff" },
	{ noise: -0.2, color: "#ccdd77" },
	{ noise: -0.15, color: "#eedd66" },
	{ noise: -0.1, color: "#ffcc44" },
	{ noise: -0.05, color: "#ffaa22" },
	// Grasslands (Vibrant Greens)
	{ noise: 0.0, color: "#44dd44" },
	{ noise: 0.05, color: "#33cc33" },
	{ noise: 0.1, color: "#22bb22" },
	{ noise: 0.15, color: "#22aa22" },
	{ noise: 0.2, color: "#119911" },
	{ noise: 0.25, color: "#008800" },
	// Forests (Dense and Deep Greens)
	{ noise: 0.3, color: "#007700" },
	{ noise: 0.35, color: "#006600" },
	{ noise: 0.4, color: "#005500" },
	{ noise: 0.45, color: "#004c00" },
	{ noise: 0.5, color: "#004400" },
	{ noise: 0.55, color: "#003b00" },
	{ noise: 0.6, color: "#003300" },
	// Hills (Extended Transition)
	{ noise: 0.65, color: "#778822" },
	{ noise: 0.7, color: "#889933" },
	{ noise: 0.75, color: "#99aa22" },
	{ noise: 0.8, color: "#aaa833" },
	{ noise: 0.85, color: "#bbb844" },
	{ noise: 0.875, color: "#cccc55" },
	{ noise: 0.9, color: "#dddd66" },
	// Mountains (Vibrant Rocky Shades)
	{ noise: 0.925, color: "#666677" },
	{ noise: 0.95, color: "#777788" },
	{ noise: 0.975, color: "#888899" },
	{ noise: 0.99, color: "#aaaaaa" },
	{ noise: 1.0, color: "#ffffff" },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
	return `#${[r, g, b]
		.map((x) => x.toString(16).padStart(2, "0"))
		.join("")
		.toLowerCase()}`;
}

function interpolateColor(hex1: string, hex2: string, t: number): string {
	const c1 = hexToRgb(hex1);
	const c2 = hexToRgb(hex2);
	const r = Math.round(c1.r + (c2.r - c1.r) * t);
	const g = Math.round(c1.g + (c2.g - c1.g) * t);
	const b = Math.round(c1.b + (c2.b - c1.b) * t);
	return rgbToHex(r, g, b);
}

// Easing function to modify t based on transition type
function ease(
	t: number,
	mode: "linear" | "smooth" | "hard" = "linear",
): number {
	switch (mode) {
		case "smooth":
			// Smooth (easeInOut) transition: cubic Hermite interpolation.
			return t * t * (3 - 2 * t);
		case "hard":
			// Harder (more abrupt) transition: quadratic easing in.
			return t * t;
		default:
			return t;
	}
}

const stops: GameConfig.ColorMap[] = [];
const totalStops = 1000;
for (let i = 0; i < totalStops; i++) {
	const noiseValue = -1 + (2 * i) / (totalStops - 1);
	const noise = parseFloat(noiseValue.toFixed(6));

	let seg = 0;
	for (let j = 0; j < baseStops.length - 1; j++) {
		if (noise <= baseStops[j + 1]!.noise) {
			seg = j;
			break;
		}
	}

	let t =
		(noise - baseStops[seg]!.noise) /
		(baseStops[seg + 1]!.noise - baseStops[seg]!.noise);

	// Determine easing mode based on major transition boundaries:
	// - Water-Beach: between deep ocean (index 10) and shallow waters (index 11) -> smoother.
	// - Grasslands to Forests: index 25 to 26 -> harder.
	// - Hills to Mountains: index 39 to 40 -> harder.
	let mode: "linear" | "smooth" | "hard" = "linear";
	if (seg === 10) {
		mode = "smooth";
	} else if (seg === 25 || seg === 39) {
		mode = "hard";
	}
	t = ease(t, mode);

	let color = interpolateColor(
		baseStops[seg]!.color,
		baseStops[seg + 1]!.color,
		t,
	);

	// Avoid duplicate colors by nudging the blue channel if necessary.
	if (stops.length > 0 && stops[stops.length - 1]!.color === color) {
		const { r, g, b } = hexToRgb(color);
		const newB = b < 255 ? b + 1 : b;
		color = rgbToHex(r, g, newB);
	}

	stops.push({ noise, color });
}

export const ColorMap: GameConfig.ColorMap[] = stops;
