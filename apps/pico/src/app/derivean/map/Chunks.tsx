import type { LRUCache } from "lru-cache";
import { FC, useMemo } from "react";
import type { Chunk } from "~/app/derivean/type/Chunk";

export namespace Chunks {
	export interface Config {
		chunkSize: number;
		plotSize: number;
	}

	export interface Props {
		config: Config;
		/**
		 * Controls a re-render of chunks.
		 */
		hash: string | undefined;
		/**
		 * Stable reference to a chunk map
		 */
		chunks: LRUCache<string, Chunk.Texture>;
	}
}

export const Chunks: FC<Chunks.Props> = ({ config, hash, chunks }) => {
	const map = useMemo(() => {
		console.log("Chunks changed", chunks.size);

		return Array.from(chunks.values()).map(({ chunk, texture }) => (
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
		));
	}, [hash]);

	return (
		<>
			<mesh position={[config.plotSize / 2, 0, config.plotSize / 2]}>
				<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
			</mesh>

			{map}
		</>
	);
};
