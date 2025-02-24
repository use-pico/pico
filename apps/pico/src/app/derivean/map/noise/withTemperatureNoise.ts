import { withHeightmapNoise } from "~/app/derivean/map/noise/withHeightmapNoise";
import { HeightmapNoise } from "~/app/derivean/map/noise/withHeightmapNoise/HeightmapNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export namespace withTemperatureNoise {
	export interface Props {
		seed: string;
	}
}

export const withTemperatureNoise = ({ seed }: withHeightmapNoise.Props) => {
    return withNoise({
        seed,
        noise: HeightmapNoise,
        layers: [
            {
                name: "continents",
                noise: "pingPongCellular",
                scale: 0.1,
                weight: 2,
            },
            {
                // disabled: true,
                name: "continent-level-01",
                noise: "simplex",
                scale: 0.5,
                weight: 0.35,
            },
            {
                disabled: true,
                name: "continent-level-01",
                noise: "perlin",
                scale: 2,
                weight: 0.75,
            },
        ],
    });
};
;
