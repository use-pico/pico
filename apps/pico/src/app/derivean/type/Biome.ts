import type { Color } from "~/app/derivean/type/Color";
import type { NoiseType } from "~/app/derivean/type/NoiseType";

export namespace Biome {
	export namespace Resolve {
		export interface Props {
			/**
			 * List of types contributed to this color.
			 */
			type: string[];
			color: Color.HSLA;
			source: Partial<Record<NoiseType, number>>;
		}
	}

	/**
	 * Resolve biome color; if undefined, color is unchanged.
	 *
	 * Input color is the color from the previous biome (or heightmap color).
	 */
	export type Resolve = (props: Resolve.Props) => Color.HSLA | undefined;
}

export interface Biome {
	type: string;
	/**
	 * Resolve biome color
	 */
	resolve: Biome.Resolve;
}
