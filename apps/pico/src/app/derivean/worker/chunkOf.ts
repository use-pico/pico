import { file, write } from "opfs-tools";
import { worker } from "workerpool";
import { withLandNoise } from "~/app/derivean/map/noise/withLandNoise";
import { compressChunk } from "~/app/derivean/service/compressChunk";
import { decompressChunk } from "~/app/derivean/service/decompressChunk";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";
import type { Chunk } from "~/app/derivean/type/Chunk";

export namespace chunkOf {
	export interface Props {
		seed: string;
		mapId: string;
		plotCount: number;
		x: number;
		z: number;
	}
}

export async function chunkOf({ seed, mapId, plotCount, x, z }: chunkOf.Props) {
	const generator = withGenerator({
		plotCount,
		seed,
		scale: 1,
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

	const chunkFile = `/chunk/${mapId}/${x}:${z}.bin`;

	performance.mark(`chunkOf-${x}:${z}-start`);

	return new Promise<Chunk>((resolve) => {
		file(chunkFile)
			.exists()
			.then((exists) => {
				(exists ?
					new Promise((resolve) => {
						resolve(undefined);
					})
				:	write(chunkFile, compressChunk(generator({ x, z })))
				).then(() => {
					file(chunkFile)
						.arrayBuffer()
						.then((buffer) => {
							resolve(decompressChunk(new Uint8Array(buffer)));
							performance.mark(`chunkOf-${x}:${z}-end`);
							performance.measure(
								`chunkOf-${x}:${z}`,
								`chunkOf-${x}:${z}-start`,
								`chunkOf-${x}:${z}-end`,
							);
						});
				});
			});
	});
}

worker({
	chunkOf,
});
