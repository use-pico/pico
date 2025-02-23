import type { GameConfig } from "~/app/derivean/GameConfig";
import type { Chunk } from "~/app/derivean/type/Chunk";

export namespace useVisibleChunks {
	export namespace VisibleChunks {
		export interface Props {
			x: number;
			z: number;
			bottom: number;
			top: number;
			right: number;
			left: number;
			zoom: number;
		}

		export type Callback = (props: Props) => Chunk.View;
	}

	export interface Props {
		gameConfig: GameConfig;
	}
}

export const useVisibleChunks = ({
	gameConfig: { chunkSize, layers },
}: useVisibleChunks.Props): useVisibleChunks.VisibleChunks.Callback => {
	return ({ x, z, bottom, top, left, right, zoom }) => {
		const levels: Chunk.View.Level[] = [];

		for (const { min, max, level, offset = 0 } of layers) {
			if (zoom >= min && zoom <= max) {
				const $chunkSize = chunkSize * level;
				const viewHeight = (top - bottom) / zoom;
				const viewWidth = (right - left) / zoom;

				const halfW = viewWidth * 0.5;
				const halfH = viewHeight * 0.5;
				const size = $chunkSize / 2;

				const minX = Math.floor((x - halfW + size) / $chunkSize) - offset;
				const maxX = Math.ceil((x + halfW + size) / $chunkSize) + offset;
				const minZ = Math.floor((z - halfH + size) / $chunkSize) - offset;
				const maxZ = Math.ceil((z + halfH + size) / $chunkSize) + offset;

				levels.push({
					hash: `[${minX} → ${maxX}]:[${minZ} → ${maxZ}]:${level}`,
					count: (maxX - minX) * (maxZ - minZ),
					x: {
						min: minX,
						max: maxX,
					},
					z: {
						min: minZ,
						max: maxZ,
					},
					level,
				});
			}
		}

		return {
			levels,
		};
	};
};
