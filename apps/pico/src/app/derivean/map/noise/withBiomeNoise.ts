import { BiomeNoise } from "~/app/derivean/map/noise/withBiomeNoise/BiomeNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export namespace withBiomeNoise {
	export interface Props {
		seed: string;
	}
}

export const withBiomeNoise = ({ seed }: withBiomeNoise.Props) => {
	return withNoise({
		seed,
		noise: BiomeNoise,
		variation: [],
		layers: [
			{
				name: "base-biome",
				noise: "cubic",
				scale: 0.05,
				weight: 2,
			},
		],
	});
};
