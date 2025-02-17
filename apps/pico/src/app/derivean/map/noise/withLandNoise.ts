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
				name: "continent",
				weight: 1,
				// limit: { min: 0, max: 0.5 },
				layers: [
					{
						name: "base",
						noise: "fractal",
						scale: 1,
						weight: 1,
					},
					{
						// disabled: true,
						name: "base",
						noise: "warpX",
						scale: 2.85,
						weight: 1,
						boost: 1,
						limit: { min: 0.2, max: 0.8 },
					},
					{
						disabled: true,
						name: "base",
						noise: "warpZ",
						scale: 2.15,
						weight: 1,
						boost: 1,
						inverse: true,
						limit: { min: 0.6, max: 0.75 },
					},
					{
						disabled: true,
						name: "base",
						scale: 0.25,
						weight: 1,
						boost: 1,
						inverse: true,
						crop: { min: 0.2 },
					},
					{
						disabled: true,
						name: "base",
						scale: 0.2,
						weight: 1,
						boost: 1,
					},
					{
						disabled: true,
						name: "variation",
						scale: 0.125,
						weight: 0.75,
						boost: 1,
						limit: { min: 0.35, max: 0.45 },
					},
					{
						disabled: true,
						name: "landmass",
						scale: 0.5,
						weight: 1,
						boost: 1,
						inverse: true,
						crop: { max: 0.25 },
					},
				],
			},
			{
				disabled: true,
				name: "detail",
				weight: 0.75,
				limit: { min: 0.5, max: 0.75 },
				layers: [
					{
						name: "base",
						scale: 0.5,
						weight: 1,
						boost: 1,
						// limit: { min: 0, max: 0.5 },
					},
					// {
					// 	name: "detail",
					// 	scale: 0.75,
					// 	weight: 1.25,
					// 	boost: 1,
					// },
				],
			},
			{
				disabled: true,
				name: "mountain",
				weight: 0.25,
				layers: [
					{
						name: "base",
						scale: 0.25,
						weight: 1,
						boost: 1,
						limit: { min: 0, max: 0.65 },
					},
					{
						name: "base",
						scale: 1.25,
						weight: 0.5,
						boost: 1,
						limit: { min: 0, max: 0.35 },
					},
					{
						name: "base",
						scale: 0.75,
						weight: 0.75,
						boost: 1,
						inverse: true,
						limit: { min: 0, max: 0.35 },
					},
					{
						name: "base",
						scale: 0.1,
						weight: 1,
						boost: 1,
						inverse: true,
						crop: { min: 0.2, max: 0.75 },
					},
					{
						name: "base",
						scale: 0.5,
						weight: 1,
						boost: 1.5,
						inverse: true,
						crop: { min: 0.25, max: 0.35 },
					},
				],
			},
		],
	});
};
