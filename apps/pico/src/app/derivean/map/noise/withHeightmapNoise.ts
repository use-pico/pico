import { HeightmapNoise } from "~/app/derivean/map/noise/withHeightmapNoise/HeightmapNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export namespace withHeightmapNoise {
	export interface Props {
		seed: string;
	}
}

export const withHeightmapNoise = ({ seed }: withHeightmapNoise.Props) => {
	return withNoise({
		seed,
		noise: HeightmapNoise,
		variation: [
			{
				name: "water",
				min: -1,
				max: -0.9,
				weight: 1,
				layers: [
					{
						name: "warp",
						noise: "perlinWarpX",
						scale: 0.75,
					},
					{
						name: "cell",
						noise: "cubic",
						scale: 0.2,
						weight: 0.5,
					},
				],
			},
			{
				name: "mountain",
				min: 0.95,
				max: 1,
				weight: 1,
				layers: [
					{
						name: "perlin",
						noise: "perlin",
						scale: 0.25,
						weight: 0.5,
					},
					{
						name: "warp",
						noise: "cubicWarpX",
						scale: 1.5,
					},
				],
			},
		],
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
