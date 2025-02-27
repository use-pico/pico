import { HSLA, type Color } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";
import type { TerrainLayer } from "~/app/derivean/type/TerrainLayer";

/**
 * Internal representation of a terrain layer with computed level
 */
interface TerrainLevelLayer extends TerrainLayer {
	level: number;
}

/**
 * Creates a variation of the base color for a step within a terrain layer
 */
function createColorVariation(
	baseColor: Color.HSLA,
	stepIndex: number,
	totalSteps: number,
): Color.HSLA {
	const t = stepIndex / (totalSteps - 1);

	// Create slightly darker colors for the first steps and lighter colors for later steps
	// This creates a more natural gradient within each terrain layer
	const lightnessAdjustment = 10 * (t - 0.5);
	const saturationAdjustment = 5 * (0.5 - t);

	return HSLA([
		baseColor.color[0],
		Math.max(0, Math.min(100, baseColor.color[1] + saturationAdjustment)),
		Math.max(0, Math.min(100, baseColor.color[2] + lightnessAdjustment)),
		baseColor.color[3],
	]);
}

/**
 * Assigns levels to terrain layers starting from -1
 */
function assignLevelsToLayers(layers: TerrainLayer[]): TerrainLevelLayer[] {
	let currentLevel = -1;
	return layers.map((layer) => {
		const levelLayer: TerrainLevelLayer = {
			...layer,
			level: currentLevel,
		};
		currentLevel += layer.length;
		return levelLayer;
	});
}

/**
 * Generates a color map from a sequence of terrain layers
 */
function generateColorMap(layers: TerrainLevelLayer[]): {
	colorMap: NoiseColorMap;
	errors: string[];
	warnings: string[];
} {
	const colorMap: NoiseColorMap = [];
	const errors: string[] = [];
	const warnings: string[] = [];

	// Check only the total noise range coverage
	const totalLength = layers.reduce((sum, layer) => sum + layer.length, 0);
	if (totalLength < 2) {
		warnings.push(
			`Warning: Total layer coverage (${totalLength.toFixed(3)}) is less than the full range of 2 (-1 to 1). Some noise values will not be mapped.`,
		);
	}

	if (totalLength > 2) {
		errors.push(
			`Total layer coverage (${totalLength.toFixed(3)}) exceeds maximum range of 2 (-1 to 1).`,
		);
		return { colorMap, errors, warnings };
	}

	// Generate color stops for each layer
	layers.forEach((layer) => {
		const { color: baseColor, level, length, steps } = layer;

		for (let i = 0; i < steps; i++) {
			const stepStart = level + (length * i) / steps;
			const stepEnd = level + (length * (i + 1)) / steps;

			colorMap.push({
				level: [stepStart, stepEnd],
				color: createColorVariation(baseColor, i, steps),
			});
		}
	});

	return { colorMap, errors, warnings };
}

/**
 * Creates the terrain color map using provided terrain layers
 * Automatically assigns levels starting from -1
 */
export function withLayerColors(layers: TerrainLayer[]): NoiseColorMap {
	const levelLayers = assignLevelsToLayers(layers);
	const { colorMap, errors, warnings } = generateColorMap(levelLayers);

	if (errors.length > 0) {
		console.error("Errors in terrain color map:", errors);
	}

	if (warnings.length > 0) {
		console.warn("Warnings in terrain color map:", warnings);
	}

	return colorMap;
}
