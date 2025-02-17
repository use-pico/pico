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
				name: "base",
				weight: 1,
				// limit: { min: 0, max: 0.5 },
				layers: [
					{
						name: "base-simplex",
						noise: "perlin",
						scale: 0.75,
						weight: 1,
					},
					{
						name: "base-simplex2",
						noise: "cubic",
						scale: 1,
						weight: 1,
					},
					{
						name: "base-simplex3",
						noise: "cellular",
						scale: 0.5,
						weight: 0.75,
						inverse: true,
					},
					{
						name: "base-simplex2",
						noise: "simplex",
						scale: 0.75,
						weight: 0.25,
						inverse: true,
					},
					{
						disabled: true,
						name: "fractal",
						noise: "perlinFractal",
						scale: 0.75,
						weight: 0.75,
						inverse: true,
					},
					{
						disabled: true,
						name: "base-simplex2",
						noise: "simplex",
						scale: 1,
						weight: 0.25,
					},
				],
			},
			{
				disabled: true,
				name: "base-reducer",
				weight: 1,
				// limit: { min: 0.5, max: 0.75 },
				inverse: true,
				layers: [
					{
						name: "base-warp-x",
						noise: "cubic",
						scale: 4,
						weight: 0.75,
						crop: { min: 0.25, max: 0.275 },
					},
					// {
					// 	name: "base-warp-z",
					// 	noise: "simplexFractalWarpX",
					// 	scale: 1,
					// 	weight: 1,
					// 	inverse: true,
					// 	limit: { min: 0, max: 0.35 },
					// },
				],
			},
			{
				disabled: true,
				name: "detail",
				weight: 0.75,
				limit: { min: 0.25, max: 0.5 },
				layers: [
					{
						name: "base-warp-x",
						noise: "perlinFractal",
						scale: 0.85,
						weight: 1,
					},
					{
						name: "base-warp-z",
						noise: "simplexFractal",
						scale: 0.95,
						weight: 1,
					},
				],
			},
		],
	});
};
