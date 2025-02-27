import type { Color } from "~/app/derivean/type/Color";
import type { NoiseType } from "~/app/derivean/type/NoiseType";

export namespace Biome {
	export namespace Resolve {
		export interface Props {
			/**
			 * List of types contributed to this color.
			 */
			type: string[];
			/**
			 * Access to a base color (from heightmap).
			 */
			base: Color.HSLA;
			/**
			 * Access to a current color (may be already modified by previous biomes).
			 */
			color: Color.HSLA;
			/**
			 * All available noise values a new color may be calculated from.
			 */
			source: Record<NoiseType, number>;
		}

		export interface Result {
			/**
			 * Resolved color
			 */
			color: Color.HSLA;
			/**
			 * Exclusive flag; if true, this is the last biome to resolve color.
			 */
			exclusive: boolean;
		}
	}

	/**
	 * Resolve biome color; if undefined, color is unchanged.
	 *
	 * Input color is the color from the previous biome (or heightmap color).
	 */
	export type Resolve = (props: Resolve.Props) => Resolve.Result | undefined;
}

export interface Biome {
	/**
	 * Biome type, may be used in resolve to check for conflicting/exclusive biomes.
	 */
	type: string;
	/**
	 * Resolve biome color
	 */
	resolve: Biome.Resolve;
}
