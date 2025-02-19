import { useQuery } from "@tanstack/react-query";
import { Timer } from "@use-pico/common";
import { decompressSync } from "fflate";
import { FC, useMemo } from "react";
import { DataTexture, RGBFormat } from "three";
import { Game } from "~/app/derivean/Game";
import type { EntitySchema } from "~/app/derivean/service/generator/EntitySchema";
import { GameWorkerLoader } from "~/app/derivean/worker/GameWorkerLoader";

export namespace Chunks {
	export interface Config {
		chunkSize: number;
		plotCount: number;
		plotSize: number;
	}

	export interface Chunk {
		id: string;
		x: number;
		z: number;
		tiles: EntitySchema.Type[];
	}

	export interface Props {
		mapId: string;
		config: Config;
		/**
		 * **Stable** reference to chunks
		 */
		chunks: Chunk[];
		hash: string;
	}
}

export const Chunks: FC<Chunks.Props> = ({ mapId, config, chunks, hash }) => {
	const { data: textures } = useQuery({
		queryKey: ["textures", mapId, hash],
		async queryFn() {
			try {
				const timer = new Timer();
				timer.start();

				const textures = await GameWorkerLoader.textures({
					id: mapId,
					chunks,
					hash,
					size: Game.plotCount,
					colorMap: Game.colorMap,
				});

				const texturesPool = new Map();

				for (const [chunkId, bitmap] of Object.entries(textures)) {
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
				}

				console.log(`\t - Textures finished [${timer.format()}]`);

				return texturesPool;
			} catch (e) {
				console.error(e);
			}
		},
		staleTime: 0,
		gcTime: 0,
		refetchOnWindowFocus: false,
	});

	const map = useMemo(() => {
		if (!textures) {
			return null;
		}

		return chunks.map((chunk) => {
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
						map={textures.get(chunk.id)}
						roughness={0.5}
					/>
				</mesh>
			);
		});
	}, [textures]);

	return (
		<>
			<mesh position={[config.plotSize / 2, 0, config.plotSize / 2]}>
				<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
			</mesh>
			{map}
		</>
	);
};
