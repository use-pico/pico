import { TemperatureNoise } from "~/app/derivean/map/noise/withTemperatureNoise/TemperatureNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export namespace withTemperatureNoise {
	export interface Props {
		seed: string;
	}
}

export const withTemperatureNoise = ({ seed }: withTemperatureNoise.Props) => {
	return withNoise({
		seed,
		noise: TemperatureNoise,
		variation: [],
		layers: [
			{
				name: "base-temperature",
				noise: "cubic",
				scale: 0.05,
				weight: 2,
			},
		],
	});
};
