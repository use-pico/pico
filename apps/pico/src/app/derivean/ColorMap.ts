import type { GameConfig } from "~/app/derivean/GameConfig";

export const baseStops: GameConfig.ColorMap[] = [
	// Deep Water (Added Variation)
	{ noise: -1.0, color: [0, 0, 80, 255] },
	{ noise: -0.98, color: [0, 0, 90, 255] },
	{ noise: -0.96, color: [0, 0, 100, 250] },
	{ noise: -0.94, color: [0, 10, 105, 245] },
	{ noise: -0.92, color: [0, 20, 110, 240] },
	{ noise: -0.9, color: [0, 40, 115, 235] },
	{ noise: -0.85, color: [0, 60, 120, 230] },
	{ noise: -0.8, color: [0, 80, 125, 225] },
	{ noise: -0.75, color: [0, 100, 130, 220] },
	{ noise: -0.7, color: [0, 120, 135, 215] },
	{ noise: -0.65, color: [0, 140, 140, 210] },
	{ noise: -0.6, color: [0, 160, 145, 205] },
	{ noise: -0.55, color: [0, 180, 150, 200] },
	{ noise: -0.5, color: [0, 200, 155, 190] },

	// Foam
	{ noise: -0.48, color: [230, 247, 255, 180] },
	{ noise: -0.47, color: [235, 249, 255, 175] },
	{ noise: -0.46, color: [240, 251, 255, 170] },
	{ noise: -0.455, color: [243, 252, 255, 165] },
	{ noise: -0.45, color: [247, 253, 255, 160] },

	// Transitional Shade (Turquoise → Beach)
	{ noise: -0.445, color: [190, 225, 190, 210] },

	// Beaches
	{ noise: -0.44, color: [255, 236, 179, 240] },
	{ noise: -0.4, color: [255, 224, 153, 240] },
	{ noise: -0.35, color: [255, 218, 128, 240] },
	{ noise: -0.3, color: [255, 208, 102, 240] },
	{ noise: -0.25, color: [255, 200, 76, 240] },
	{ noise: -0.2, color: [255, 191, 51, 240] },
	{ noise: -0.15, color: [255, 179, 26, 240] },
	{ noise: -0.1, color: [255, 167, 0, 240] },
	{ noise: -0.05, color: [255, 154, 0, 240] },
	{ noise: -0.03, color: [210, 157, 18, 240] },
	{ noise: -0.01, color: [181, 144, 21, 240] },
	{ noise: 0.01, color: [154, 124, 32, 240] },
	{ noise: 0.03, color: [122, 94, 45, 240] },

	// Grasslands
	{ noise: 0.05, color: [43, 125, 60, 230] },
	{ noise: 0.1, color: [42, 119, 54, 230] },
	{ noise: 0.15, color: [40, 111, 48, 230] },
	{ noise: 0.2, color: [39, 104, 42, 230] },
	{ noise: 0.25, color: [37, 98, 36, 230] },
	{ noise: 0.3, color: [36, 91, 30, 230] },

	// Forest Edge Contrast
	{ noise: 0.32, color: [26, 78, 50, 255] },
	{ noise: 0.33, color: [26, 78, 50, 255] },

	// Forests
	{ noise: 0.35, color: [30, 132, 73, 255] },
	{ noise: 0.4, color: [27, 122, 67, 255] },
	{ noise: 0.45, color: [24, 113, 61, 255] },
	{ noise: 0.5, color: [21, 106, 55, 255] },
	{ noise: 0.55, color: [19, 95, 49, 255] },
	{ noise: 0.6, color: [17, 88, 43, 255] },
	{ noise: 0.65, color: [15, 80, 37, 255] },

	// Hills
	{ noise: 0.68, color: [26, 78, 50, 255] },
	{ noise: 0.7, color: [104, 142, 38, 255] },
	{ noise: 0.75, color: [122, 160, 50, 255] },
	{ noise: 0.8, color: [139, 170, 62, 255] },
	{ noise: 0.85, color: [156, 184, 74, 255] },
	{ noise: 0.9, color: [174, 197, 86, 255] },
	{ noise: 0.92, color: [191, 211, 98, 255] },

	// Mountains
	{ noise: 0.94, color: [74, 79, 88, 255] },
	{ noise: 0.95, color: [74, 79, 88, 255] },
	{ noise: 0.96, color: [96, 99, 107, 255] },
	{ noise: 0.97, color: [122, 125, 133, 255] },
	{ noise: 0.98, color: [149, 153, 161, 255] },
	{ noise: 0.985, color: [174, 178, 179, 255] },
	{ noise: 0.99, color: [197, 201, 204, 255] },
	{ noise: 0.995, color: [226, 228, 231, 255] },
	{ noise: 1.0, color: [255, 255, 255, 255] },
];

function interpolateColor(
	color1: number[],
	color2: number[],
	t: number,
): [number, number, number, number] {
	return [
		Math.round(color1[0]! + (color2[0]! - color1[0]!) * t),
		Math.round(color1[1]! + (color2[1]! - color1[1]!) * t),
		Math.round(color1[2]! + (color2[2]! - color1[2]!) * t),
		Math.round(color1[3]! + (color2[3]! - color1[3]!) * t),
	];
}

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

	// Example easing logic
	let mode: "linear" | "smooth" | "hard" = "linear";
	if (seg === 13) {
		mode = "smooth";
	} else if (seg === 25 || seg === 39) {
		mode = "hard";
	}
	t = ease(t, mode);

	const color = interpolateColor(
		baseStops[seg]!.color,
		baseStops[seg + 1]!.color,
		t,
	);
	stops.push({ noise, color });
}

export const ColorMap: GameConfig.ColorMap[] = stops;
