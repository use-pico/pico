import { HSLA, type Color } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";
import type { TerrainLayer } from "~/app/derivean/type/TerrainLayer";

/**
 * Validates a terrain layer to ensure it fits within the valid noise range
 */
function validateTerrainLayer(layer: TerrainLayer): string | undefined {
	if (layer.level < -1 || layer.level > 1) {
		return `Invalid start level ${layer.level} for layer "${layer.name}". Value must be between -1 and 1.`;
	}

	if (layer.length <= 0) {
		return `Invalid length ${layer.length} for layer "${layer.name}". Value must be greater than 0.`;
	}

	if (layer.steps <= 0) {
		return `Invalid steps ${layer.steps} for layer "${layer.name}". Value must be greater than 0.`;
	}

	const endLevel = layer.level + layer.length;
	if (endLevel > 1.0001) {
		// Adding a small epsilon for floating point comparison
		return `Layer "${layer.name}" exceeds valid range. Start: ${layer.level}, Length: ${layer.length}, End: ${endLevel}. Maximum end value is 1.`;
	}

	return undefined;
}

/**
 * Interpolates between two HSLA colors
 *
 * @param start Starting HSLA color
 * @param end Ending HSLA color
 * @param t Interpolation factor (0-1)
 * @returns Interpolated HSLA color
 */
function interpolateHSLA(
	start: Color.HSLA,
	end: Color.HSLA,
	t: number,
): Color.HSLA {
	// Special handling for hue to ensure we take the shortest path around the color wheel
	let [h1] = start.color;
	let [h2] = end.color;

	// Adjust hue values to find the shortest path around the color wheel
	if (Math.abs(h2 - h1) > 180) {
		if (h1 < h2) {
			h1 += 360;
		} else {
			h2 += 360;
		}
	}

	// Interpolate hue and wrap around if necessary
	let h = (h1 + (h2 - h1) * t) % 360;
	if (h < 0) {
		h += 360;
	}

	// Interpolate other components
	const s = start.color[1] + (end.color[1] - start.color[1]) * t;
	const l = start.color[2] + (end.color[2] - start.color[2]) * t;
	const a = start.color[3] + (end.color[3] - start.color[3]) * t;

	return HSLA([h, s, l, a]);
}

/**
 * Creates a variation of the base color for a step within a terrain layer
 *
 * @param baseColor The base color in HSLA format
 * @param stepIndex The current step index
 * @param totalSteps Total number of steps
 * @returns A color variation based on the step position
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
 * Generates a color map from a sequence of terrain layers
 *
 * @param layers Array of terrain layer definitions
 * @returns NoiseColorMap with color stops for each layer
 */
function generateColorMap(layers: TerrainLayer[]): {
	colorMap: NoiseColorMap;
	errors: string[];
} {
	const colorMap: NoiseColorMap = [];
	const errors: string[] = [];

	// Validate all layers first
	layers.forEach((layer) => {
		const error = validateTerrainLayer(layer);
		if (error) {
			errors.push(error);
		}
	});

	if (errors.length > 0) {
		return { colorMap, errors };
	}

	// Sort layers by starting level to ensure proper order
	const sortedLayers: TerrainLayer[] = [...layers].sort(
		(a, b) => a.level - b.level,
	);

	// Check for gaps or overlaps between layers
	for (let i = 0; i < sortedLayers.length - 1; i++) {
		const currentEnd = sortedLayers[i]!.level + sortedLayers[i]!.length;
		const nextStart = sortedLayers[i + 1]!.level;

		if (Math.abs(currentEnd - nextStart) > 0.0001) {
			// Small epsilon for floating point comparison
			if (currentEnd < nextStart) {
				errors.push(
					`Gap detected between layers "${sortedLayers[i]!.name}" and "${sortedLayers[i + 1]!.name}": ${currentEnd} to ${nextStart}`,
				);
			} else {
				errors.push(
					`Overlap detected between layers "${sortedLayers[i]!.name}" and "${sortedLayers[i + 1]!.name}": ${nextStart} to ${currentEnd}`,
				);
			}
		}
	}

	if (errors.length > 0) {
		return { colorMap, errors };
	}

	// Generate color stops for each layer
	sortedLayers.forEach((layer) => {
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

	return { colorMap, errors };
}

/**
 * Creates a smooth transition between two terrain layers by blending their colors
 *
 * @param fromLayer Starting terrain layer
 * @param toLayer Ending terrain layer
 * @param transitionSteps Number of steps for the transition
 * @returns Array of terrain layers representing the transition
 */
function createTerrainTransition(
	fromLayer: TerrainLayer,
	toLayer: TerrainLayer,
	transitionSteps: number,
): TerrainLayer[] {
	const transition: TerrainLayer[] = [];

	const fromEnd = fromLayer.level + fromLayer.length;
	const stepLength = (toLayer.level - fromEnd) / transitionSteps;

	for (let i = 0; i < transitionSteps; i++) {
		const t = i / (transitionSteps - 1);
		const startLevel = fromEnd + i * stepLength;

		// Blend colors from the from-layer to the to-layer
		const blendedColor = interpolateHSLA(fromLayer.color, toLayer.color, t);

		// Blend step counts too for a smoother transition
		const steps = Math.round(
			fromLayer.steps + (toLayer.steps - fromLayer.steps) * t,
		);

		transition.push({
			name: `${fromLayer.name}-to-${toLayer.name}-${i + 1}`,
			color: blendedColor,
			level: startLevel,
			length: stepLength,
			steps: Math.max(1, steps),
		});
	}

	return transition;
}

/**
 * Helper function to create a complete terrain color map with smooth transitions between layers
 *
 * @param layers Base terrain layers
 * @param transitionSteps Number of steps to use for transitions between layers
 * @returns Complete color map with transitions
 */
function createTerrainColorMap(
	layers: TerrainLayer[],
	transitionSteps = 3,
): {
	colorMap: NoiseColorMap;
	errors: string[];
} {
	const sortedLayers = [...layers].sort((a, b) => a.level - b.level);
	let allLayers: TerrainLayer[] = [];

	// Add first layer
	allLayers.push(sortedLayers[0]!);

	// Add rest of layers with transitions
	for (let i = 1; i < sortedLayers.length; i++) {
		const prevLayer = sortedLayers[i - 1]!;
		const currentLayer = sortedLayers[i]!;

		const prevLayerEnd = prevLayer.level + prevLayer.length;

		// Only add transition if there's space between layers
		if (currentLayer.level - prevLayerEnd > 0.001) {
			const transition = createTerrainTransition(
				prevLayer,
				currentLayer,
				transitionSteps,
			);
			allLayers = [...allLayers, ...transition];
		}

		allLayers.push(currentLayer);
	}

	return generateColorMap(allLayers);
}

/**
 * Creates the default terrain color map using standard terrain layers
 */
export function withLayerColors(layers: TerrainLayer[]): NoiseColorMap {
	const { colorMap, errors } = createTerrainColorMap(layers);

	if (errors.length > 0) {
		console.error("Errors in default terrain color map:", errors);
	}

	return colorMap;
}
