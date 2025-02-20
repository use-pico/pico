import { decompressSync } from "fflate";
import { FC, useEffect, useState } from "react";
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
	const [chunks, setChunks] = useState<
		{ chunk: Chunk.SmallChunk; texture: DataTexture }[]
	>([]);

	useEffect(() => {
		if (!hash) {
			return;
		}

		GameWorkerLoader.generator({
			mapId,
			seed: mapId,
			hash,
			size: config.plotCount,
			colorMap: Game.colorMap,
		}).then((chunks) => {
			const map = new Array(chunks.length);
			chunks.forEach(({ chunk, texture }, index) => {
				const decompressed = decompressSync(new Uint8Array(texture.data));
				const dataTexture = new DataTexture(
					decompressed,
					texture.width,
					texture.height,
					RGBFormat,
				);
				dataTexture.internalFormat = "RGB8";
				dataTexture.flipY = true;
				dataTexture.needsUpdate = true;
				map[index] = { chunk, texture: dataTexture };
			});
			setChunks(map);
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
							map={texture}
							roughness={0.5}
						/>
					</mesh>
				);
			})}
		</>
	);
};
