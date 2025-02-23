import { file, write } from "opfs-tools";
import { worker } from "workerpool";
import type { GameConfig } from "~/app/derivean/GameConfig";
import { withLandNoise } from "~/app/derivean/map/noise/withLandNoise";
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
}

export async function chunkOf({
	id,
	mapId,
	gameConfig,
	level,
	x,
	z,
}: chunkOf.Props) {
	const generator = withGenerator({
		gameConfig,
		seed: mapId,
		level,
		noise: ({ seed }) => ({
			land: withLandNoise({ seed }),
		}),
		tile: {
			id: "grass",
			chance: 100,
			color: "#00FF00",
			noise: 1,
		},
	});

	const chunkFile = `/chunk/${mapId}/${id}.bin`;

	return new Promise<Chunk.Data>((resolve) => {
		file(chunkFile)
			.exists()
			.then((exists) => {
				(exists ?
					new Promise<void>((resolve) => {
						resolve();
					})
				:	write(chunkFile, compressChunk(generator({ x, z })))
				).then(() => {
					file(chunkFile)
						.arrayBuffer()
						.then((buffer) => {
							resolve(decompressChunk(new Uint8Array(buffer)));
						});
				});
			});
	});
}

worker({
	chunkOf,
});
