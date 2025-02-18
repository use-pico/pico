import { withNoise } from "~/app/derivean/service/noise/withNoise";

export namespace withLandNoise {
	export interface Props {
		seed: string;
	}
}

export const withLandNoise = ({ seed }: withLandNoise.Props) => {
	return withNoise({
		seed,
		layers: [
			{
				name: "base-simplex",
				noise: "cellular",
				scale: 0.75,
				weight: 1.5,
			},
			{
				disabled: true,
				name: "base-simplex2",
				noise: "cellular",
				scale: 1,
				weight: 0.25,
				// limit: {
				// 	min: 0.25,
				// 	max: 0.75,
				// },
			},
			{
				disabled: true,
				name: "base-simplex3",
				noise: "cellular",
				scale: 0.5,
				weight: 0.25,
				inverse: true,
				// limit: {
				// 	min: -0.5,
				// 	max: -0.15,
				// },
			},
			{
				disabled: true,
				name: "base-simplex2",
				noise: "cellular",
				scale: 0.75,
				limit: {
					max: 0.25,
				},
			},
			{
				disabled: true,
				name: "fractal",
				noise: "perlinFractal",
				scale: 0.75,
				limit: {
					min: 0.35,
				},
				// subtract: true,
			},
			{
				disabled: true,
				name: "base-simplex2",
				noise: "simplex",
				scale: 1,
				weight: 0.25,
			},
			{
				disabled: true,
				name: "base-warp-x",
				noise: "cubic",
				scale: 4,
				weight: 0.25,
			},
			{
				disabled: true,
				name: "base-warp-z",
				noise: "simplexFractalWarpX",
				scale: 1,
				weight: 0.15,
				inverse: true,
			},
		],
	});
};
