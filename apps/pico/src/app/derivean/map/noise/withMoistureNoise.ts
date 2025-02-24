import { withHeightmapNoise } from "~/app/derivean/map/noise/withHeightmapNoise";
import { HeightmapNoise } from "~/app/derivean/map/noise/withHeightmapNoise/HeightmapNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export namespace withMoistureNoise {
	export interface Props {
		seed: string;
	}
}

export const withMoistureNoise = ({ seed }: withHeightmapNoise.Props) => {
	return withNoise({
		seed,
		noise: HeightmapNoise,
		layers: [
			{
				name: "continents",
				noise: "pingPongCellular",
				scale: 0.05,
				weight: 2,
			},
			{
				// disabled: true,
				name: "continent-level-01",
				noise: "simplex",
				scale: 0.05,
				weight: 0.35,
			},
			{
				disabled: true,
				name: "continent-level-01",
				noise: "perlin",
				scale: 0.75,
				weight: 0.75,
			},
		],
	});
};
