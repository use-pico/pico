import { expose } from "comlink";
import { Game } from "~/app/derivean/Game";
import { withLandNoise } from "~/app/derivean/map/noise/withLandNoise";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";

export const generator = (seed: string, x: number, z: number) => {
	const generator = withGenerator({
		plotCount: Game.plotCount,
		plotSize: Game.plotSize,
		seed,
		scale: 1,
		noise({ seed }) {
			return {
				land: withLandNoise({ seed }),
			};
		},
		tile: {
			id: "grass",
			chance: 100,
			color: "#00FF00",
			noise: 1,
		},
		layers() {
			return [];
		},
	});

	return generator({ x, z });
};

const api = {
	generator,
};

expose(api);
