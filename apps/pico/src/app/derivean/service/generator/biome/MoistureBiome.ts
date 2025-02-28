import { DefaultTerrainLayers } from "~/app/derivean/service/DefaultTerrainLayers";
import type { Biome } from "~/app/derivean/type/Biome";
import { HSLA } from "~/app/derivean/type/Color";

export const MoistureBiome: Biome = {
	type: "Moisture",
	resolve({ color, source, base }) {
		// Get moisture level (-1 to 1 range)
		const { moisture, temperature, heightmap } = source;

		// Skip minimal moisture changes for better performance
		if (Math.abs(moisture) < 0.05) {
			return undefined;
		}

		// Check for transition by looking at types array
		const types = Array.isArray(base.type) ? base.type : [base.type];
		const isTransitionBiome = types.length > 1;

		// Check if any of the types is water
		const isWaterTransition =
			isTransitionBiome &&
			types.some(
				(type) =>
					type === DefaultTerrainLayers.DeepOcean.name ||
					type === DefaultTerrainLayers.Ocean.name ||
					type === DefaultTerrainLayers.ShallowWater.name,
			);

		// Use a curve to intensify the effect - stronger at extremes
		// Reduced for transition zones to avoid seams
		const intensityFactor =
			isTransitionBiome ?
				Math.abs(moisture)**0.6 * 0.3 // Even gentler for transitions
			:	Math.abs(moisture)**0.8 * 0.7; // Slightly reduced for standard biomes

		// We'll decide whether to modify or completely replace the color
		let newColor: [number, number, number, number] | null = null;
		let blendFactor = 0;
		let shouldReplace = false;

		// -----------------------------------------------------
		// MOISTURE-BASED ENVIRONMENT DETERMINATION
		// -----------------------------------------------------

		// Very dry environments (deserts, badlands, etc.)
		if (moisture < -0.6) {
			// Hot desert
			if (temperature > 0.2) {
				if (
					types.some(
						(type) =>
							type === DefaultTerrainLayers.Lowland.name ||
							type === DefaultTerrainLayers.Grassland.name ||
							type === DefaultTerrainLayers.Valley.name ||
							type === DefaultTerrainLayers.Midland.name ||
							type === DefaultTerrainLayers.Highland.name,
					)
				) {
					// More subdued desert colors - sandy beige
					newColor = [38, 50, 65, 1];
					// More subtle blending
					blendFactor = Math.min(0.8, (-moisture - 0.6) * 3);

					// Complete replacement only in extreme desert conditions
					if (moisture < -0.85 && temperature > 0.6) {
						shouldReplace = true;
					}
				}
			}
			// Cold desert / badlands
			else if (temperature < 0) {
				if (
					types.some(
						(type) =>
							type === DefaultTerrainLayers.Lowland.name ||
							type === DefaultTerrainLayers.Highland.name ||
							type === DefaultTerrainLayers.Midland.name,
					)
				) {
					// More subdued reddish-brown
					newColor = [20, 45, 35, 1];
					blendFactor = Math.min(0.7, (-moisture - 0.6) * 3);

					// Complete replacement only for extreme badlands
					if (moisture < -0.85) {
						shouldReplace = true;
					}
				}
			}

			// Rocky highlands and mountains in dry environments
			if (
				types.some(
					(type) =>
						type === DefaultTerrainLayers.Highland.name ||
						type === DefaultTerrainLayers.Foothills.name,
				) &&
				moisture < -0.5
			) {
				// Gray rocky appearance for dry highlands
				newColor = [200, 15, 40, 1]; // Desaturated gray with slight hue
				blendFactor = Math.min(0.7, (-moisture - 0.5) * 2.5);

				// Complete replacement for very dry highlands
				if (moisture < -0.8) {
					shouldReplace = true;
				}
			}
		}

		// Very wet environments (rainforests, swamps, etc.)
		else if (moisture > 0.6) {
			// Tropical rainforest conditions
			if (temperature > 0.2) {
				if (
					types.some(
						(type) =>
							type === DefaultTerrainLayers.Lowland.name ||
							type === DefaultTerrainLayers.Grassland.name ||
							type === DefaultTerrainLayers.Valley.name ||
							type === DefaultTerrainLayers.Midland.name,
					)
				) {
					// More natural rainforest green (less saturated)
					newColor = [125, 65, 25, 1];
					blendFactor = Math.min(0.8, (moisture - 0.6) * 3);

					// Complete replacement for dense rainforests
					if (moisture > 0.85 && temperature > 0.5) {
						shouldReplace = true;
					}
				}
			}
			// Temperate rainforest / swamp
			else if (temperature > -0.2 && temperature < 0.2) {
				if (
					types.some(
						(type) =>
							type === DefaultTerrainLayers.Lowland.name ||
							type === DefaultTerrainLayers.Valley.name ||
							type === DefaultTerrainLayers.Wetland.name,
					)
				) {
					// More natural swamp green (slightly muted)
					newColor = [135, 55, 22, 1];
					blendFactor = Math.min(0.7, (moisture - 0.6) * 3);

					// Complete replacement for swamplands
					if (
						moisture > 0.85 &&
						types.includes(DefaultTerrainLayers.Wetland.name)
					) {
						shouldReplace = true;
					}
				}
			}
			// Taiga/boreal forest
			else if (temperature < -0.2) {
				if (
					types.some(
						(type) =>
							type === DefaultTerrainLayers.Lowland.name ||
							type === DefaultTerrainLayers.Highland.name ||
							type === DefaultTerrainLayers.Midland.name,
					)
				) {
					// More natural dark pine green (less blue)
					newColor = [140, 55, 18, 1];
					blendFactor = Math.min(0.7, (moisture - 0.6) * 2.5);

					// Complete replacement for dense boreal forest
					if (moisture > 0.85 && temperature < -0.5) {
						shouldReplace = true;
					}
				}
			}
		}

		// For water bodies in extreme conditions
		if (
			Math.abs(moisture) > 0.7 &&
			types.some(
				(type) =>
					type === DefaultTerrainLayers.DeepOcean.name ||
					type === DefaultTerrainLayers.Ocean.name ||
					type === DefaultTerrainLayers.ShallowWater.name,
			)
		) {
			if (moisture < 0) {
				// Toned down saline waters - more subtle turquoise
				newColor = [190, 45, 50, 1];
				blendFactor = Math.min(0.5, (-moisture - 0.7) * 2.5);

				if (moisture < -0.92 && !isTransitionBiome) {
					shouldReplace = true;
				}
			} else {
				// Less intense algae waters - deeper blue with slight green tint
				newColor = [205, 60, 30, 1];
				blendFactor = Math.min(0.5, (moisture - 0.7) * 2.5);

				if (moisture > 0.92 && !isTransitionBiome) {
					shouldReplace = true;
				}
			}
		}

		// Water transitions need special care
		if (isWaterTransition) {
			// Modify blendFactor for water transitions to be much more subtle
			blendFactor *= 0.3;
			shouldReplace = false; // Never fully replace in water transitions
		}

		// -----------------------------------------------------
		// APPLY TRANSFORMATIONS
		// -----------------------------------------------------

		// If we've set up a special biome replacement
		if (newColor && blendFactor > 0) {
			// For transition zones, reduce the effect significantly
			if (isTransitionBiome) {
				blendFactor *= 0.4; // 60% reduction for transitions

				// Never do complete replacements in transition zones
				shouldReplace = false;
			}

			// Complete replacement for special biomes (not transitions)
			if (shouldReplace) {
				return {
					color: HSLA(newColor),
					exclusive: false, // Still allow other biomes to modify our color
				};
			}

			// Otherwise blend with the original color
			const [originalH, originalS, originalL, originalA] = color.color;
			const [newH, newS, newL, newA] = newColor;

			// Calculate hue transition the short way around the color wheel
			let hueDiff = newH - originalH;
			if (Math.abs(hueDiff) > 180) {
				hueDiff = hueDiff > 0 ? hueDiff - 360 : hueDiff + 360;
			}
			const blendedH =
				(((originalH + hueDiff * blendFactor) % 360) + 360) % 360;

			return {
				color: HSLA([
					blendedH,
					originalS * (1 - blendFactor) + newS * blendFactor,
					originalL * (1 - blendFactor) + newL * blendFactor,
					originalA,
				]),
				exclusive: false,
			};
		}

		// -----------------------------------------------------
		// STANDARD COLOR MODIFICATIONS FOR OTHER CONDITIONS
		// -----------------------------------------------------

		// Extract original color values
		let [h, s, l] = color.color;

		// Apply moisture effects based on terrain type for non-extreme cases
		switch (true) {
			// Water bodies (check if any type is water)
			case types.some(
				(type) =>
					type === DefaultTerrainLayers.DeepOcean.name ||
					type === DefaultTerrainLayers.Ocean.name ||
					type === DefaultTerrainLayers.ShallowWater.name,
			):
				if (moisture < 0) {
					// Dry conditions: slightly more turquoise, clearer water (more subtle)
					h = Math.max(0, Math.min(360, h + moisture * -2 * intensityFactor));
					s = Math.max(0, Math.min(100, s + moisture * -4 * intensityFactor));
					l = Math.max(0, Math.min(100, l + moisture * -1 * intensityFactor));
				} else {
					// Wet conditions: deeper blue, more saturated (more subtle)
					h = Math.max(0, Math.min(360, h - moisture * 1 * intensityFactor));
					s = Math.max(0, Math.min(100, s + moisture * 5 * intensityFactor));
					l = Math.max(0, Math.min(100, l - moisture * 2 * intensityFactor));
				}
				break;

			// Coastal areas (check if any type is coastal)
			case types.some(
				(type) =>
					type === DefaultTerrainLayers.Beach.name ||
					type === DefaultTerrainLayers.Coast.name ||
					type === DefaultTerrainLayers.Foam.name,
			):
				if (moisture < 0) {
					// Dry coasts: more yellow/white, like dried salt flats (more subtle)
					const targetHue = 42; // More natural yellow-tan
					const blendFactor = -moisture * 0.4 * intensityFactor;
					h = h * (1 - blendFactor) + targetHue * blendFactor;
					s = Math.max(0, Math.min(100, s + moisture * -7 * intensityFactor));
					l = Math.max(0, Math.min(100, l + moisture * -4 * intensityFactor));
				} else {
					// Wet coasts: darker, muddy (more subtle)
					const targetHue = 32; // More natural brown-tan
					const blendFactor = moisture * 0.2 * intensityFactor;
					h = h * (1 - blendFactor) + targetHue * blendFactor;
					s = Math.max(0, Math.min(100, s + moisture * 6 * intensityFactor));
					l = Math.max(0, Math.min(100, l - moisture * 6 * intensityFactor));
				}
				break;

			// Wetlands
			case types.includes(DefaultTerrainLayers.Wetland.name):
				if (moisture < 0) {
					// Dry wetlands: shift to cracked mud/clay (more subtle)
					const targetHue = 32; // More natural orange-brown
					const blendFactor = -moisture * 0.5 * intensityFactor;
					h = h * (1 - blendFactor) + targetHue * blendFactor;
					s = Math.max(0, Math.min(100, s + moisture * -7 * intensityFactor));
					l = Math.max(0, Math.min(100, l + moisture * -3 * intensityFactor));
				} else {
					// Very wet wetlands: lush and green (more subtle)
					const targetHue = 115; // More natural green
					const blendFactor = moisture * 0.4 * intensityFactor;
					h = h * (1 - blendFactor) + targetHue * blendFactor;
					s = Math.max(0, Math.min(100, s + moisture * 12 * intensityFactor));
					l = Math.max(0, Math.min(100, l - moisture * 5 * intensityFactor));
				}
				break;

			// Low/mid elevation areas
			case types.some(
				(type) =>
					type === DefaultTerrainLayers.Grassland.name ||
					type === DefaultTerrainLayers.Lowland.name ||
					type === DefaultTerrainLayers.Valley.name ||
					type === DefaultTerrainLayers.Midland.name,
			):
				if (moisture < 0) {
					// Dry grasslands: yellow-brown, desert-like (more subtle)
					const targetHue = 43; // More natural sand/desert yellow
					const blendFactor = -moisture * 0.5 * intensityFactor;
					h = h * (1 - blendFactor) + targetHue * blendFactor;
					s = Math.max(0, Math.min(100, s + moisture * -8 * intensityFactor));
					l = Math.max(0, Math.min(100, l - moisture * -10 * intensityFactor));
				} else {
					// Wet grasslands: lush green (more subtle)
					const targetHue = 112; // More natural vibrant green
					const blendFactor = moisture * 0.4 * intensityFactor;
					h = h * (1 - blendFactor) + targetHue * blendFactor;
					s = Math.max(0, Math.min(100, s + moisture * 15 * intensityFactor));
					l = Math.max(0, Math.min(100, l - moisture * 5 * intensityFactor));
				}
				break;

			// Higher elevation areas
			case types.some(
				(type) =>
					type === DefaultTerrainLayers.Highland.name ||
					type === DefaultTerrainLayers.Foothills.name,
			):
				// Extract the original values for transition blending
				const originalHighlandH = h;
				const originalHighlandS = s;
				const originalHighlandL = l;

				// Minimal earth tone adjustment - no gray
				const highlandEarthHue = 35; // Earth tone tint
				const highlandTintFactor = isTransitionBiome ? 0.05 : 0.1; // Almost no tint for transitions

				// Apply a more natural earth tone appearance
				h =
					h * (1 - highlandTintFactor) + highlandEarthHue * highlandTintFactor;

				// Slightly increase saturation for more color
				s = Math.max(0, Math.min(100, s * 1.05));

				if (moisture < 0) {
					// Dry highlands: rich earth tones
					const dryTint = 28; // Warmer red-orange tint
					const dryTintFactor = -moisture * 0.3 * intensityFactor;
					h = h * (1 - dryTintFactor) + dryTint * dryTintFactor;
					s = Math.max(0, Math.min(100, s + moisture * -12 * intensityFactor));
					l = Math.max(0, Math.min(100, l + moisture * -3 * intensityFactor));
				} else {
					// Wet highlands: forest-covered
					const targetHue = 100; // Natural forest green
					const blendFactor = moisture * 0.4 * intensityFactor;
					h = h * (1 - blendFactor) + targetHue * blendFactor;
					s = Math.max(0, Math.min(100, s + moisture * 15 * intensityFactor));
					l = Math.max(0, Math.min(100, l - moisture * 5 * intensityFactor));
				}

				// For transition zones, blend back toward original color to avoid seams
				if (isTransitionBiome) {
					// Different blending based on which transition we're in
					const transitionBlendFactor = 0.8; // Very strong blend back to original

					h =
						h * (1 - transitionBlendFactor) +
						originalHighlandH * transitionBlendFactor;
					s =
						s * (1 - transitionBlendFactor) +
						originalHighlandS * transitionBlendFactor;
					l =
						l * (1 - transitionBlendFactor) +
						originalHighlandL * transitionBlendFactor;
				}

				// Elevation variation to reduce flatness
				if (heightmap > 0.7) {
					// Higher areas get slightly more rock detail but no gray
					const rockDetailFactor = (heightmap - 0.7) * 0.4;
					const rockDetailHue = 25; // Reddish-brown
					h = h * (1 - rockDetailFactor) + rockDetailHue * rockDetailFactor;
					s = Math.max(0, Math.min(100, s + rockDetailFactor * 10));
					l = Math.max(0, Math.min(100, l * (1 - rockDetailFactor * 0.2)));
				}
				break;

			// Mountain areas
			case types.some(
				(type) =>
					type === DefaultTerrainLayers.Mountain.name ||
					type === DefaultTerrainLayers.HighMountain.name,
			):
				// Less dominant rocky appearance with richer coloration
				const grayRockHue = 30; // Switch to a brown-tan tint instead of blue-gray
				const baseGrayFactor = isTransitionBiome ? 0.1 : 0.15; // Much less gray factor

				// Extract the original hue to blend with
				const originalH = h;

				// Apply a more subtle earthy appearance
				h = h * (1 - baseGrayFactor) + grayRockHue * baseGrayFactor;

				// Instead of desaturating, we'll actually increase saturation slightly
				// to prevent the gray, flat appearance
				s = Math.max(0, Math.min(100, s * 1.1));

				if (moisture < 0) {
					// Dry mountains: rich earth tones - more reddish-brown
					const dryTint = 20; // Warm earth tint
					const dryTintFactor = -moisture * 0.3 * intensityFactor;
					h = h * (1 - dryTintFactor) + dryTint * dryTintFactor;
					s = Math.max(0, Math.min(100, s + 20)); // More saturation for rich earth tones
					l = Math.max(0, Math.min(100, l * 0.9)); // Slightly darker
				} else {
					// Wet mountains: vegetation with rock
					const wetTint = 100; // Green vegetation tint
					const wetTintFactor = moisture * 0.35 * intensityFactor;
					h = h * (1 - wetTintFactor) + wetTint * wetTintFactor;
					s = Math.max(0, Math.min(100, s + moisture * 15 * intensityFactor));
					l = Math.max(0, Math.min(100, l - moisture * 5 * intensityFactor));
				}

				// Additional variation based on heightmap to break up flatness
				if (heightmap > 0.7) {
					// Higher elevations - more rock detail but not gray
					const highRockTint = 25; // Reddish rock
					const highRockFactor = (heightmap - 0.7) * 0.6;
					h = h * (1 - highRockFactor) + highRockTint * highRockFactor;
					s = Math.max(0, Math.min(100, s + highRockFactor * 10)); // More color at peaks
					l = Math.max(0, Math.min(100, l * (1 - highRockFactor * 0.2))); // Slightly darker at peaks
				} else {
					// Lower elevations - more terrain color
					// Gradually blend back to original hue at lower elevations
					const blendToOriginal = Math.max(0, 0.7 - heightmap) * 0.7;
					h = h * (1 - blendToOriginal) + originalH * blendToOriginal;
					s = Math.max(0, Math.min(100, s + blendToOriginal * 15)); // More saturated
				}

				// If this is a transition zone, blend back toward original
				if (isTransitionBiome) {
					const transitionBlendFactor = 0.7; // Stronger blend back
					h =
						h * (1 - transitionBlendFactor) + originalH * transitionBlendFactor;
					s = Math.max(0, Math.min(100, s * 0.9 + 10)); // Prevent extreme saturation
					l = Math.max(0, Math.min(100, l * 0.95 + 2)); // Prevent extreme darkness
				}
				break;

			// Mountain peaks
			case types.includes(DefaultTerrainLayers.MountainPeak.name):
				// Extract original values
				const originalPeakH = h;
				const originalPeakS = s;
				const originalPeakL = l;

				// Brown-tan base instead of gray
				const peakRockHue = 30; // Brown-tan tint
				const peakRockFactor = isTransitionBiome ? 0.1 : 0.2; // Very minimal rock effect

				// Apply a more earthy rocky appearance
				h = h * (1 - peakRockFactor) + peakRockHue * peakRockFactor;

				// Increase saturation slightly
				s = Math.max(0, Math.min(100, s * 1.1));

				if (moisture < 0) {
					// Dry peaks: exposed rock with rich tints
					const dryTint = 18; // Reddish-brown tint
					const dryTintFactor = -moisture * 0.4 * intensityFactor;
					h = h * (1 - dryTintFactor) + dryTint * dryTintFactor;
					s = Math.max(0, Math.min(100, s + 15)); // More saturation for color
					l = Math.max(0, Math.min(100, l * 0.85)); // Slightly darker

					// Extra variation based on extreme dryness
					if (moisture < -0.7) {
						// Reddish-brown rocky peaks in very dry areas
						const veryDryTint = 15; // Reddish-brown
						const veryDryFactor = Math.min(0.5, (-moisture - 0.7) * 1.5);
						h = h * (1 - veryDryFactor) + veryDryTint * veryDryFactor;
						s = Math.max(0, Math.min(100, s + veryDryFactor * 20));
					}
				} else {
					// Wet peaks: snow-capped with underlying rock
					// More gradual snow effect
					const snowFactor = Math.min(0.7, moisture * 1.2);
					l = Math.max(0, Math.min(100, l + snowFactor * 20)); // Brighter for snow
					s = Math.max(0, Math.min(100, s - snowFactor * 15)); // Less saturated for snow

					// Some rocky detail showing through snow
					if (heightmap > 0.85) {
						// Very highest point - more white
						l = Math.max(0, Math.min(100, l + (heightmap - 0.85) * 30));
						s = Math.max(0, Math.min(100, s - (heightmap - 0.85) * 25));
					}
				}

				// For transition zones, blend back much more toward original color to avoid seams
				if (isTransitionBiome) {
					const transitionBlendFactor = 0.8; // Very strong blend back
					h =
						h * (1 - transitionBlendFactor) +
						originalPeakH * transitionBlendFactor;
					s =
						s * (1 - transitionBlendFactor) +
						originalPeakS * transitionBlendFactor;
					l =
						l * (1 - transitionBlendFactor) +
						originalPeakL * transitionBlendFactor;
				}
				break;

			// Default for transitions and other terrain types
			default:
				// Special case for black areas that might be appearing
				if (l < 15) {
					// For very dark areas, prevent them from getting darker
					l = Math.max(15, l);
					s = Math.min(90, s); // Prevent oversaturation in dark areas
				}

				if (moisture < 0) {
					// Dry areas: more yellow/orange (more subtle)
					const targetHue = 38; // More natural desert tan
					const blendFactor = -moisture * 0.2 * intensityFactor;
					h = h * (1 - blendFactor) + targetHue * blendFactor;
					s = Math.max(0, Math.min(100, s + moisture * -5 * intensityFactor));
				} else {
					// Wet areas: more green (more subtle)
					const targetHue = 108; // More natural forest green
					const blendFactor = moisture * 0.25 * intensityFactor;
					h = h * (1 - blendFactor) + targetHue * blendFactor;
					s = Math.max(0, Math.min(100, s + moisture * 8 * intensityFactor));
					l = Math.max(0, Math.min(100, l - moisture * 3 * intensityFactor));
				}

				// Extra check for transition zones
				if (isTransitionBiome) {
					// For transition zones, make changes even more subtle
					const originalTransH = color.color[0];
					const originalTransS = color.color[1];
					const originalTransL = color.color[2];

					// Blend back strongly to original color
					const transBlendFactor = 0.7;
					h = h * (1 - transBlendFactor) + originalTransH * transBlendFactor;
					s = s * (1 - transBlendFactor) + originalTransS * transBlendFactor;
					l = l * (1 - transBlendFactor) + originalTransL * transBlendFactor;
				}
				break;
		}

		// Ensure values stay in valid ranges and prevent black areas
		h = ((h % 360) + 360) % 360;
		s = Math.max(0, Math.min(100, s));

		// Special handling to prevent very dark areas
		if (l < 12) {
			// For extremely dark areas (potential black spots), boost lightness
			l = Math.max(12, l + 5);
			// Also reduce saturation to prevent vibrant dark colors
			s = Math.min(80, s);
		} else {
			l = Math.max(0, Math.min(100, l));
		}

		return {
			color: HSLA([h, s, l, 1]),
			exclusive: false,
		};
	},
};
