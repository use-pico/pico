import { Timer } from "@use-pico/common";
import { FC, useEffect, useState } from "react";
import { DataTexture, type Texture } from "three";
import { Game } from "~/app/derivean/Game";
import { decompressChunk } from "~/app/derivean/service/decompressChunk";
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
	const [chunks, setChunks] = useState<
		{ chunk: Chunk.Lightweight; texture: Texture }[]
	>([]);

	useEffect(() => {
		if (!hash) {
			return;
		}

		const timer = new Timer();
		timer.start();
		console.log(`[Chunks] Requesting chunks [${hash.count}] ${hash.hash}`);

		GameWorkerLoader.generator({
			mapId,
			seed: mapId,
			hash,
			skip: chunks.map(({ chunk: { id } }) => id),
		}).then((chunks) => {
			console.log(`[Chunks] - Received chunks ${timer.format()}`);

			const chunkTimer = new Timer();
			chunkTimer.start();

			Promise.all(
				chunks.map(async (chunk) => {
					return new Promise<{ chunk: Chunk.Lightweight; texture: Texture }>(
						(resolve) => {
							setTimeout(() => {
								const { tiles: _, ...$chunk } = decompressChunk(chunk);

								const texture = new DataTexture(
									new Uint8Array($chunk.texture.data),
									Game.plotCount,
									Game.plotCount,
								);
								texture.needsUpdate = true;

								resolve({
									chunk: $chunk,
									texture,
								});
							}, 50);
						},
					);
				}),
			).then((chunks) => {
				setTimeout(() => {
					console.log(
						`[Chunks] - done ${timer.format()}; chunk processing ${chunkTimer.format()}`,
					);

					setChunks((prev) => [...prev, ...chunks]);
				}, 50);
			});
		});
	}, [hash, mapId]);

	console.log("chunks", chunks.length);

	return (
		<>
			<mesh position={[config.plotSize / 2, 0, config.plotSize / 2]}>
				<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
			</mesh>

			{chunks.map(({ chunk, texture }) => (
				<mesh
					key={`chunk-${chunk.id}`}
					position={[
						chunk.x * config.chunkSize * 1.001,
						-1,
						chunk.z * config.chunkSize * 1.001,
					]}
					rotation={[-Math.PI / 2, 0, 0]}
					receiveShadow
				>
					<planeGeometry args={[config.chunkSize, config.chunkSize]} />
					<meshStandardMaterial
						color={0xffffff}
						map={texture}
					/>
				</mesh>
			))}
		</>
	);
};
