import { Timer } from "@use-pico/common";
import { FC, useEffect, useState } from "react";
import { DataTexture, RGBFormat } from "three";
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
		{ chunk: Chunk.Lightweight; texture: DataTexture }[]
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
		}).then((chunks) => {
			const map = new Array<{ chunk: Chunk.Lightweight; texture: DataTexture }>(
				chunks.length,
			);
			chunks.forEach((chunk, index) => {
				const { tiles: _, ...$chunk } = decompressChunk(chunk);

				const dataTexture = new DataTexture(
					new Uint8Array($chunk.texture.data),
					$chunk.texture.size,
					$chunk.texture.size,
					RGBFormat,
				);
				dataTexture.internalFormat = "RGB8";
				dataTexture.flipY = true;
				dataTexture.needsUpdate = true;

				map[index] = { chunk: $chunk, texture: dataTexture };
			});
			setChunks(map);

			console.log(`[Chunks] \t- done ${timer.format()}`);
		});
	}, [hash]);

	return (
		<>
			<mesh position={[config.plotSize / 2, 0, config.plotSize / 2]}>
				<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
			</mesh>

			{chunks.map(({ chunk, texture }) => {
				return (
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
							roughness={0.5}
						/>
					</mesh>
				);
			})}
		</>
	);
};
