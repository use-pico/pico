import { LandNoise } from "~/app/derivean/map/noise/withLandNoise/LandNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export namespace withLandNoise {
	export interface Props {
		seed: string;
	}
}

export const withLandNoise = ({ seed }: withLandNoise.Props) => {
	return withNoise({
		seed,
		noise: LandNoise,
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
				scale: 0.25,
				weight: 0.35,
			},
			{
				disabled: true,
				name: "continent-level-01",
				noise: "perlin",
				scale: 1,
				weight: 0.75,
			},
		],
	});
};
