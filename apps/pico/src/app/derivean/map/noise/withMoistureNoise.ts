import { MoistureNoise } from "~/app/derivean/map/noise/withMoistureNoise/MoistureNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export namespace withMoistureNoise {
	export interface Props {
		seed: string;
	}
}

export const withMoistureNoise = ({ seed }: withMoistureNoise.Props) => {
	return withNoise({
		seed,
		noise: MoistureNoise,
		variation: [],
		layers: [
			{
				name: "base-moisture",
				noise: "cubic",
				scale: 0.05,
				weight: 2,
			},
		],
	});
};
