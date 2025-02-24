import { file, write } from "opfs-tools";
import { worker } from "workerpool";
import type { GameConfig } from "~/app/derivean/GameConfig";
import { withBiomeNoise } from "~/app/derivean/map/noise/withBiomeNoise";
import { withHeightmapNoise } from "~/app/derivean/map/noise/withHeightmapNoise";
import { withMoistureNoise } from "~/app/derivean/map/noise/withMoistureNoise";
import { withTemperatureNoise } from "~/app/derivean/map/noise/withTemperatureNoise";
import { compressChunk } from "~/app/derivean/service/compressChunk";
import { decompressChunk } from "~/app/derivean/service/decompressChunk";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";
import type { Chunk } from "~/app/derivean/type/Chunk";

export namespace chunkOf {
	export interface Props {
		id: string;
		mapId: string;
		gameConfig: GameConfig;
		level: Chunk.View.Level;
		x: number;
		z: number;
	}

	export interface Result {
		hit: boolean;
		chunk: Chunk.Data;
	}
}

export async function chunkOf({
	id,
	mapId,
	gameConfig,
	level,
	x,
	z,
}: chunkOf.Props): Promise<chunkOf.Result> {
	const generator = withGenerator({
		gameConfig,
		seed: mapId,
		level,
		noise: ({ seed }) => ({
			heightmap: withHeightmapNoise({ seed }),
			biome: withBiomeNoise({ seed }),
			temperature: withTemperatureNoise({ seed }),
			moisture: withMoistureNoise({ seed }),
		}),
		tile: {
			id: "grass",
			chance: 100,
			color: "#00FF00",
			noise: 1,
		},
	});

	const chunkFile = `/chunk/${mapId}/${id}.bin`;

	return new Promise<chunkOf.Result>((resolve) => {
		file(chunkFile)
			.exists()
			.then((exists) => {
				(exists ?
					// new Promise<boolean>((resolve) => {
					// 	resolve(true);
					// })
					write(chunkFile, compressChunk(generator({ x, z }))).then(() => false)
				:	write(chunkFile, compressChunk(generator({ x, z }))).then(() => false)
				).then((hit) => {
					file(chunkFile)
						.arrayBuffer()
						.then((buffer) => {
							resolve({
								hit,
								chunk: decompressChunk(new Uint8Array(buffer)),
							});
						});
				});
			});
	});
}

worker({
	chunkOf,
});
