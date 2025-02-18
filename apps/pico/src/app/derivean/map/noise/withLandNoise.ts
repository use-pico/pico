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
				noise: "perlin",
				scale: 0.75,
				weight: -0.05,
			},
			{
				// disabled: true,
				name: "base-simplex2",
				noise: "cubic",
				scale: 1,
				weight: 0.005,
			},
			{
				// disabled: true,
				name: "base-simplex3",
				noise: "cellular",
				scale: 0.5,
				boost: 1.75,
				subtract: true,
			},
			{
				disabled: true,
				name: "base-simplex2",
				noise: "simplex",
				scale: 0.75,
				// weight: 0.5,
				boost: 0.05,
				subtract: true,
			},
			{
				disabled: true,
				name: "fractal",
				noise: "perlinFractal",
				scale: 0.75,
				weight: -0.005,
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
				subtract: true,
			},
		],
	});
};
