import type { Chunk } from "~/app/derivean/type/Chunk";

export namespace withChunkView {
	export interface Props {
		chunkSize: number;
		level: Chunk.Level;
		offset?: number;
		position: { x: number; z: number };
		top: number;
		bottom: number;
		right: number;
		left: number;
		zoom: number;
	}
}

export const withChunkView = ({
	chunkSize,
	level,
	offset = 0,
	position: { x, z },
	top,
	bottom,
	left,
	right,
	zoom,
}: withChunkView.Props) => {
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

	return {
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
	};
};
