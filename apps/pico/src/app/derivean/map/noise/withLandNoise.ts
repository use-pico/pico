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
				name: "landmass",
				layers: [
					{
						name: "base",
						scale: 0.025,
						weight: 1,
						boost: 1.5,
						limit: { min: 0.0, max: 0.15 },
					},
					{
						name: "variation-01",
						scale: 0.05,
						weight: 1,
						boost: 1.25,
						limit: { min: 0, max: 0.15 },
					},
					{
						name: "variation-02",
						scale: 0.1,
						weight: 0.75,
						boost: 1.25,
						inverse: true,
						limit: { min: 0, max: 0.05 },
					},
				],
				weight: 1,
			},
			// {
			// 	name: "detail-01",
			// 	limit: { min: 0, max: 0.5 },
			// 	layers: [
			// 		{
			// 			name: "base",
			// 			scale: 0.05,
			// 			weight: 1,
			// 			// limit: { min: 0, max: 0.55 },
			// 		},
			// 		{
			// 			name: "variation",
			// 			scale: 0.5,
			// 			weight: 0.5,
			// 			// limit: { min: 0, max: 0.15 },
			// 		},
			// 	],
			// 	weight: 0.025,
			// },
			// {
			// 	name: "inverse-detail-01",
			// 	limit: { min: 0, max: 0.5 },
			// 	inverse: true,
			// 	layers: [
			// 		{
			// 			name: "base",
			// 			scale: 0.5,
			// 			weight: 1,
			// 			// limit: { min: 0, max: 0.55 },
			// 		},
			// 		{
			// 			name: "variation",
			// 			scale: 0.5,
			// 			weight: 0.5,
			// 			// limit: { min: 0, max: 0.15 },
			// 		},
			// 	],
			// 	weight: 0.025,
			// },
			// {
			// 	name: "biomes",
			// 	limit: { min: 0.25, max: 0.5 },
			// 	layers: [
			// 		{ name: "forest", scale: 0.05, weight: 1 },
			// 		{ name: "desert", scale: 0.08, weight: 1 },
			// 		{ name: "tundra", scale: 0.12, weight: 1 },
			// 	],
			// 	weight: 1,
			// },
			// {
			// 	name: "features",
			// 	limit: { min: 0.5, max: 1.0 },
			// 	layers: [
			// 		{ name: "mountains", scale: 0.02, weight: 0.9 },
			// 		{ name: "rivers", scale: 0.15, weight: 0.4 },
			// 		{ name: "lakes", scale: 0.2, weight: 0.2 },
			// 	],
			// 	weight: 1.0,
			// },
		],
	});
};
