import type { LRUCache } from "lru-cache";
import { FC, useMemo } from "react";
import { chunkIdOf } from "~/app/derivean/service/chunkIdOf";
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
		currentHash: Chunk.Hash;
		/**
		 * Stable reference to a chunk map
		 */
		chunks: LRUCache<string, Chunk.Texture>;
		/**
		 * Controlled opacity of this layer of chunks.
		 */
		opacity?: number;
	}
}

export const Chunks: FC<Chunks.Props> = ({
	config,
	currentHash,
	hash,
	chunks,
	opacity = 1,
}) => {
	const map = useMemo(() => {
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
					transparent
					opacity={opacity}
				/>
			</mesh>
		));
	}, [hash, opacity]);

	if (opacity <= 0) {
		return null;
	}

	return (
		<>
			<mesh position={[config.plotSize / 2, 0, config.plotSize / 2]}>
				<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
			</mesh>

			{map}

			{chunkIdOf(currentHash).map(({ id, x, z }) => {
				return (
					<mesh
						key={`placeholder-chunk-${id}`}
						position={[
							x * config.chunkSize * 1.001,
							-2,
							z * config.chunkSize * 1.001,
						]}
						rotation={[-Math.PI / 2, 0, 0]}
						receiveShadow
					>
						<planeGeometry args={[config.chunkSize, config.chunkSize]} />
						<meshStandardMaterial
							color={0x455667}
							transparent
							opacity={opacity}
						/>
					</mesh>
				);
			})}
		</>
	);
};
