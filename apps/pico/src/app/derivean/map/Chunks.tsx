import { useQuery } from "@tanstack/react-query";
import { FC, useMemo } from "react";
import { CanvasTexture } from "three";
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
		config: Config;
		/**
		 * **Stable** reference to chunks
		 */
		chunks: Chunk[];
		hash: string;
	}
}

export const Chunks: FC<Chunks.Props> = ({ config, chunks, hash }) => {
	const { data: textures } = useQuery({
		queryKey: ["chunkTextures", hash],
		async queryFn() {
			try {
				const textures = await GameWorkerLoader.textures(
					chunks,
					config.chunkSize,
					hash,
				);

				const texturesPool = new Map();

				for (const [chunkId, bitmap] of Object.entries(textures)) {
					const image = new ImageData(
						new Uint8ClampedArray(bitmap.data),
						bitmap.width,
						bitmap.height,
					);
					const texture = new CanvasTexture(image);
					texture.needsUpdate = true;
					texturesPool.set(chunkId, texture);
				}

				return texturesPool;
			} catch (e) {
				console.error(e);
			}
		},
		staleTime: Infinity,
		gcTime: 1000 * 60 * 5,
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
