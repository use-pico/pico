import { withHeightmapNoise } from "~/app/derivean/map/noise/withHeightmapNoise";
import { HeightmapNoise } from "~/app/derivean/map/noise/withHeightmapNoise/HeightmapNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export namespace withBiomeNoise {
	export interface Props {
		seed: string;
	}
}

export const withBiomeNoise = ({ seed }: withHeightmapNoise.Props) => {
	return withNoise({
		seed,
		noise: HeightmapNoise,
		layers: [
			{
				name: "continents",
				noise: "perlin",
				scale: 0.5,
				weight: 1,
			},
			{
				disabled: true,
				name: "continent-level-01",
				noise: "simplex",
				scale: 0.5,
				weight: 0.5,
			},
			{
				disabled: true,
				name: "continent-level-01",
				noise: "perlin",
				scale: 0.025,
				weight: 0.75,
			},
		],
	});
};
