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
		chunkSize: number;
		plotSize: number;
		offset: number;
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
	chunkSize,
	plotSize,
	offset,
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
					chunk.x * chunkSize * 1.001 + offset,
					-1,
					chunk.z * chunkSize * 1.001 + offset,
				]}
				rotation={[-Math.PI / 2, 0, 0]}
				receiveShadow
			>
				<planeGeometry args={[chunkSize, chunkSize]} />
				<meshStandardMaterial
					color={0xffffff}
					map={texture}
					transparent
					opacity={opacity}
				/>
			</mesh>
		));
	}, [hash, offset, opacity]);

	if (opacity <= 0) {
		return null;
	}

	return (
		<>
			<mesh position={[plotSize / 2, 0, plotSize / 2]}>
				<boxGeometry args={[plotSize, 1, plotSize]} />
			</mesh>

			{map}

			{chunkIdOf(currentHash).map(({ id, x, z }) => {
				return (
					<mesh
						key={`placeholder-chunk-${id}`}
						position={[
							x * chunkSize * 1.001 + offset,
							-2,
							z * chunkSize * 1.001 + offset,
						]}
						rotation={[-Math.PI / 2, 0, 0]}
						receiveShadow
					>
						<planeGeometry args={[chunkSize, chunkSize]} />
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
