import { useQuery } from "@tanstack/react-query";
import { Timer } from "@use-pico/common";
import { decompressSync } from "fflate";
import { FC, useMemo } from "react";
import { DataTexture, RGBFormat } from "three";
import { Game } from "~/app/derivean/Game";
import type { Chunk } from "~/app/derivean/type/Chunk";
import type { ChunkHash } from "~/app/derivean/type/ChunkHash";
import { GameWorkerLoader } from "~/app/derivean/worker/GameWorkerLoader";

export namespace Chunks {
	export interface Config {
		chunkSize: number;
		plotCount: number;
		plotSize: number;
	}

	export interface Props {
		mapId: string;
		config: Config;
		hash?: ChunkHash;
	}
}

export const Chunks: FC<Chunks.Props> = ({ mapId, config, hash }) => {
	/**
	 * TODO Use stream instead of query
	 * Comlink.proxy can be used to create a callback for a stream
	 * - onChunk & onTexture
	 * - when a chunk is generated, it could be rendered and updated later on when a texture is available
	 * - useState may be useful for this case?
	 *      - throttle updates, like useDebounce or something similar
	 *
	 * TODO Because texture size is now somehow limited, it's possible to use texture atlas (just text the performance)
	 *      - Maybe generate a bigger texture in a generator?
	 *
	 * TODO Buildings & structures may occupy at least 4x4 pixels as one plot?
	 */

	const { data } = useQuery({
		queryKey: ["chunks", mapId, hash],
		async queryFn() {
			if (!hash) {
				return {
					chunks: [] as Chunk[],
					textures: new Map<string, DataTexture>(),
				} as const;
			}

			try {
				const timer = new Timer();
				timer.start();

				console.info(`Started map generator ${hash.hash}`);

				const { textures, chunks } = await GameWorkerLoader.generator({
					mapId,
					seed: mapId,
					hash,
					size: Game.plotCount,
					colorMap: Game.colorMap,
				});

				const texturesPool = new Map<string, DataTexture>();

				const awaitJobs = Object.entries(textures).map(([chunkId, bitmap]) => {
					return new Promise<void>((resolve) => {
						setTimeout(() => {
							const texture = new DataTexture(
								decompressSync(new Uint8Array(bitmap.data)),
								bitmap.width,
								bitmap.height,
								RGBFormat,
							);
							texture.internalFormat = "RGB8";
							texture.flipY = true;
							texture.needsUpdate = true;

							texturesPool.set(chunkId, texture);
							resolve();
						}, 0);
					});
				});

				await Promise.all(awaitJobs);

				console.info(`- Generator finished [${timer.format()}]`);

				return {
					chunks,
					textures: texturesPool,
				} as const;
			} catch (e) {
				console.error(e);
				throw e;
			}
		},
		staleTime: 0,
		gcTime: 0,
		refetchOnWindowFocus: false,
	});

	const map = useMemo(() => {
		if (!data) {
			return null;
		}

		return data.chunks.map((chunk) => {
			return (
				<mesh
					key={`chunk-${chunk.id}`}
					position={[
						chunk.x * config.chunkSize,
						-1,
						chunk.z * config.chunkSize,
					]}
					rotation={[-Math.PI / 2, 0, 0]}
					receiveShadow
				>
					<planeGeometry args={[config.chunkSize, config.chunkSize]} />
					<meshStandardMaterial
						color={0xffffff}
						map={data.textures.get(chunk.id)}
						roughness={0.5}
					/>
				</mesh>
			);
		});
	}, [data]);

	return (
		<>
			<mesh position={[config.plotSize / 2, 0, config.plotSize / 2]}>
				<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
			</mesh>
			{map}
		</>
	);
};
