import type { LRUCache } from "lru-cache";
import { FC } from "react";
import type { Chunk } from "~/app/derivean/type/Chunk";

export namespace Chunks {
	export interface Props {
		/**
		 * Stable reference to a chunk map
		 */
		chunks: LRUCache<string, Chunk.Runtime>;
		/**
		 * Controlled opacity of this layer of chunks.
		 */
		opacity?: number;
	}
}

/**
 * Render chunks, nothing interesting is here. Parent component is responsible for
 * optimization, so this component won't re-render.
 */
export const Chunks: FC<Chunks.Props> = ({ chunks, opacity = 1 }) => {
	if (opacity <= 0) {
		return null;
	}

	return Array.from(chunks.values()).map((chunk) => {
		return (
			<mesh
				key={`chunk-${chunk.id}`}
				position={[chunk.x * 1.001, -1, chunk.z * 1.001]}
				rotation={[-Math.PI / 2, 0, 0]}
				receiveShadow
			>
				<planeGeometry args={[chunk.size, chunk.size]} />
				<meshStandardMaterial
					color={0xffffff}
					map={chunk.texture.data}
					transparent
					opacity={opacity}
				/>
			</mesh>
		);
	});
};
