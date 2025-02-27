import { HSLA, type Color } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";
import type { TerrainLayer } from "~/app/derivean/type/TerrainLayer";

/**
 * Interpolates between two HSLA colors
 */
function interpolateHSLA(
	startColor: Color.HSLA,
	endColor: Color.HSLA,
	t: number,
): Color.HSLA {
	// Special handling for hue to avoid the long way around the color wheel
	let [h1] = startColor.color;
	let [h2] = endColor.color;

	// Adjust hue to take the shortest path around the color wheel
	if (Math.abs(h2 - h1) > 180) {
		if (h1 < h2) {
			h1 += 360;
		} else {
			h2 += 360;
		}
	}

	const h = (h1 + t * (h2 - h1)) % 360;
	const s = startColor.color[1] + t * (endColor.color[1] - startColor.color[1]);
	const l = startColor.color[2] + t * (endColor.color[2] - startColor.color[2]);
	const a = startColor.color[3] + t * (endColor.color[3] - startColor.color[3]);

	return HSLA([h, s, l, a]);
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
function assignLevelsToLayers(
	layers: TerrainLayer[],
): (TerrainLayer & { level: number })[] {
	let currentLevel = -1;
	return layers.map((layer) => {
		const levelLayer = {
			...layer,
			level: currentLevel,
		} as const;
		currentLevel += layer.length;
		return levelLayer;
	});
}

/**
 * Creates the terrain color map using provided terrain layers
 * with enhanced smooth transitions between layers
 */
export function withLayerColors(layers: TerrainLayer[]): NoiseColorMap {
	const levelLayers = assignLevelsToLayers(layers);
	const colorMap: NoiseColorMap = [];

	// Check total noise range coverage
	const totalLength = layers.reduce((sum, layer) => sum + layer.length, 0);
	if (totalLength < 2) {
		console.warn(
			`Warning: Total layer coverage (${totalLength.toFixed(3)}) is less than the full range of 2 (-1 to 1). Some noise values will not be mapped.`,
		);
	}

	if (totalLength > 2) {
		console.error(
			`Total layer coverage (${totalLength.toFixed(3)}) exceeds maximum range of 2 (-1 to 1).`,
		);
		return colorMap;
	}

	// Generate color stops for each layer with enhanced transitions
	for (let i = 0; i < levelLayers.length; i++) {
		const layer = levelLayers[i]!;
		const { color: baseColor, level, length, steps, name } = layer;
		const nextLayer = i < levelLayers.length - 1 ? levelLayers[i + 1] : null;

		// Default values for transitions
		const createTransition = nextLayer !== null;
		const transitionSteps = layer.transition ?? 4;

		// Calculate the actual steps for this layer (excluding transition)
		const layerSteps =
			createTransition ? Math.max(8, steps) : Math.max(8, steps);

		// Generate the main color stops for this layer
		for (let j = 0; j < layerSteps - 1; j++) {
			const stepStart = level + (length * j) / layerSteps;
			const stepEnd = level + (length * (j + 1)) / layerSteps;

			colorMap.push({
				level: [stepStart, stepEnd],
				color: createColorVariation(baseColor, j, layerSteps),
				type: name,
			});
		}

		// If we're creating a transition to the next layer
		if (createTransition && nextLayer) {
			const lastStepStart = level + (length * (layerSteps - 1)) / layerSteps;
			const lastStepEnd = level + length;

			// The last color from this layer
			const lastColor = createColorVariation(
				baseColor,
				layerSteps - 1,
				layerSteps,
			);
			// The first color from the next layer
			const nextColor = createColorVariation(
				nextLayer.color,
				0,
				Math.max(8, nextLayer.steps),
			);

			// Create transition steps between the two layers
			const segmentLength =
				(lastStepEnd - lastStepStart) / (transitionSteps + 1);

			for (let k = 0; k <= transitionSteps; k++) {
				const t = (k + 1) / (transitionSteps + 2);
				const transitionStart = lastStepStart + k * segmentLength;
				const transitionEnd = lastStepStart + (k + 1) * segmentLength;

				// For transitions, use a blended terrain type
				const transitionTerrainType = `${layer.name}-to-${nextLayer.name}`;

				colorMap.push({
					level: [transitionStart, transitionEnd],
					color: interpolateHSLA(lastColor, nextColor, t),
					type: transitionTerrainType,
				});
			}
		} else if (!createTransition) {
			// Add the final segment for the last layer
			const lastStepStart = level + (length * (layerSteps - 1)) / layerSteps;
			const lastStepEnd = level + length;
			colorMap.push({
				level: [lastStepStart, lastStepEnd],
				color: createColorVariation(baseColor, layerSteps - 1, layerSteps),
				type: name,
			});
		}
	}

	return colorMap;
}
