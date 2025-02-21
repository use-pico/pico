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
		 * Stable reference to a chunk map
		 */
		chunks: Map<string, Chunk.Texture>;
	}
}

export const Chunks: FC<Chunks.Props> = ({ config, chunks }) => {
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
	}, [chunks]);

	return (
		<>
			<mesh position={[config.plotSize / 2, 0, config.plotSize / 2]}>
				<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
			</mesh>

			{map}
		</>
	);
};
