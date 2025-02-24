import type { GameConfig } from "~/app/derivean/GameConfig";

export const baseStops: GameConfig.ColorMap[] = [
	// Deep Water (Subtle gradient from deep to shallow)
	{ noise: -1.0, color: "#000083" },
	{ noise: -0.95, color: "#000087" },
	{ noise: -0.9,  color: "#00008B" },
	{ noise: -0.85, color: "#00008F" },
	{ noise: -0.8,  color: "#000093" },
	{ noise: -0.75, color: "#000097" },
	{ noise: -0.7,  color: "#00009B" },
	{ noise: -0.65, color: "#00009F" },
	{ noise: -0.6,  color: "#0000A3" },
	{ noise: -0.55, color: "#0000A7" },
	{ noise: -0.5,  color: "#0000AB" },

	// Foam (Enhanced White-ish Wave Foam Effect)
	{ noise: -0.48, color: "#e6f7ff" },
	{ noise: -0.47, color: "#ebf9ff" },
	{ noise: -0.46, color: "#f0fbff" },
	{ noise: -0.455, color: "#f3fcff" },
	{ noise: -0.45, color: "#f7fdff" },

	// Beaches (Warm Yellow/Orange/Gold)
	{ noise: -0.44, color: "#ffecb3" },
	{ noise: -0.4,  color: "#ffe099" },
	{ noise: -0.35, color: "#ffda80" },
	{ noise: -0.3,  color: "#ffd066" },
	{ noise: -0.25, color: "#ffc84c" },
	{ noise: -0.2,  color: "#ffbf33" },
	{ noise: -0.15, color: "#ffb31a" },
	{ noise: -0.1,  color: "#ffa700" },
	{ noise: -0.05, color: "#ff9a00" },

	// Transitional Zone between Beach and Grassland (wider & smoother)
	{ noise: -0.03, color: "#d29d12" },
	{ noise: -0.01, color: "#b59015" },
	{ noise:  0.01, color: "#9a7c20" },
	{ noise:  0.03, color: "#7a5e2d" },

	// Grasslands (Darker, more contrasted green shades)
	{ noise: 0.05, color: "#5e7f3a" },
	{ noise: 0.1,  color: "#537735" },
	{ noise: 0.15, color: "#496f30" },
	{ noise: 0.2,  color: "#40692b" },
	{ noise: 0.25, color: "#376326" },
	{ noise: 0.3,  color: "#2e5d21" },

	// Forest Edge Contrast (Extra Dark Green Shade)
	{ noise: 0.32, color: "#1a4e32" },
	{ noise: 0.33, color: "#1a4e32" },

	// Forests (Deep, Vibrant Greens)
	{ noise: 0.35, color: "#1e8449" },
	{ noise: 0.4,  color: "#1b7a43" },
	{ noise: 0.45, color: "#18713d" },
	{ noise: 0.5,  color: "#156a37" },
	{ noise: 0.55, color: "#135f31" },
	{ noise: 0.6,  color: "#11582b" },
	{ noise: 0.65, color: "#0f5025" },

	// Hill Edge Contrast (Extra Dark Green Shade)
	{ noise: 0.68, color: "#1a4e32" },

	// Hills (Natural, Lush Greens)
	{ noise: 0.7,  color: "#688e26" },
	{ noise: 0.75, color: "#7aa032" },
	{ noise: 0.8,  color: "#8baa3e" },
	{ noise: 0.85, color: "#9cb84a" },
	{ noise: 0.9,  color: "#aec556" },
	{ noise: 0.92, color: "#bfd362" },

	// Mountain Edge (Noticeable dark contrast between hills and mountains)
	{ noise: 0.94, color: "#575f67" },

	// Mountains (Rich Gray with Enhanced Snow Caps)
	{ noise: 0.96, color: "#75858b" },
	{ noise: 0.98, color: "#c0c8d0" },
	{ noise: 1.0,  color: "#ffffff" },
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

// Easing function to adjust t for smooth/hard transitions
function ease(
	t: number,
	mode: "linear" | "smooth" | "hard" = "linear",
): number {
	switch (mode) {
		case "smooth":
			return t * t * (3 - 2 * t);
		case "hard":
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

	// Adjust easing based on major boundaries:
	// - Water-to-Beach transitions get smooth easing.
	// - Transitions from grasslands to forests or hills to mountains get a harder easing.
	let mode: "linear" | "smooth" | "hard" = "linear";
	if (seg === 10) { // water-to-foam/beach
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

	// Slight nudge if duplicate
	if (stops.length > 0 && stops[stops.length - 1]!.color === color) {
		const { r, g, b } = hexToRgb(color);
		const newB = b < 255 ? b + 1 : b;
		color = rgbToHex(r, g, newB);
	}

	stops.push({ noise, color });
}

export const ColorMap: GameConfig.ColorMap[] = stops;