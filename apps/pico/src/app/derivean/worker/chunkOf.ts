import { file, write } from "opfs-tools";
import { worker } from "workerpool";
import { GameConfig } from "~/app/derivean/GameConfig";
import { compressChunk } from "~/app/derivean/service/generator/chunk/compressChunk";
import { decompressChunk } from "~/app/derivean/service/generator/chunk/decompressChunk";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";
import type { Chunk } from "~/app/derivean/type/Chunk";

export namespace chunkOf {
	export interface Props {
		id: string;
		mapId: string;
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
	level,
	x,
	z,
}: chunkOf.Props): Promise<chunkOf.Result> {
	const generator = withGenerator({
		gameConfig: GameConfig,
		seed: mapId,
		level,
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
