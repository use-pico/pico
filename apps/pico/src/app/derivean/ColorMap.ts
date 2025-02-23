import type { GameConfig } from "~/app/derivean/GameConfig";

export const baseStops: GameConfig.ColorMap[] = [
	// Deep Ocean (Pure Deep Blue; no turquoise)
	{ noise: -1.0, color: "#000033" },
	{ noise: -0.95, color: "#000047" },
	{ noise: -0.9, color: "#00005b" },
	{ noise: -0.85, color: "#00006f" },
	{ noise: -0.8, color: "#000083" },
	{ noise: -0.75, color: "#000097" },
	{ noise: -0.7, color: "#0000ab" },
	{ noise: -0.65, color: "#0000bf" },
	{ noise: -0.6, color: "#0000d3" },
	{ noise: -0.55, color: "#0000e7" },
	{ noise: -0.5, color: "#0000fb" },

	// Beaches (Warm Yellow/Orange/Gold)
	{ noise: -0.45, color: "#ffecb3" },
	{ noise: -0.4, color: "#ffe099" },
	{ noise: -0.35, color: "#ffda80" },
	{ noise: -0.3, color: "#ffd066" },
	{ noise: -0.25, color: "#ffc84c" },
	{ noise: -0.2, color: "#ffbf33" },
	{ noise: -0.15, color: "#ffb31a" },
	{ noise: -0.1, color: "#ffa700" },
	{ noise: -0.05, color: "#ff9a00" },

	// Grasslands (Darker, More Contrasted Green Shades)
	{ noise: 0.0, color: "#2b7d3c" },
	{ noise: 0.05, color: "#2a7736" },
	{ noise: 0.1, color: "#286f30" },
	{ noise: 0.15, color: "#27682a" },
	{ noise: 0.2, color: "#256224" },
	{ noise: 0.25, color: "#245b1e" },

	// Forests (Deep, Vibrant Greens)
	{ noise: 0.3, color: "#1e8449" },
	{ noise: 0.35, color: "#1b7a43" },
	{ noise: 0.4, color: "#18713d" },
	{ noise: 0.45, color: "#156a37" },
	{ noise: 0.5, color: "#135f31" },
	{ noise: 0.55, color: "#11582b" },
	{ noise: 0.6, color: "#0f5025" },

	// Hills (Natural, Lush Greens)
	{ noise: 0.65, color: "#688e26" },
	{ noise: 0.7, color: "#7aa032" },
	{ noise: 0.75, color: "#8baa3e" },
	{ noise: 0.8, color: "#9cb84a" },
	{ noise: 0.85, color: "#aec556" },
	{ noise: 0.875, color: "#bfd362" },
	{ noise: 0.9, color: "#d1e06e" },

	// Mountains (Rich Gray with Enhanced Snow Caps)
	{ noise: 0.925, color: "#575f67" },
	{ noise: 0.95, color: "#75858b" },
	{ noise: 0.975, color: "#c0c8d0" },
	{ noise: 0.99, color: "#e8ebee" },
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
const totalStops = 256;
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
