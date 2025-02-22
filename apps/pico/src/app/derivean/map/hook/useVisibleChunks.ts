import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { OrthographicCamera } from "three";
import type { Chunk } from "~/app/derivean/type/Chunk";

export namespace useVisibleChunks {
	export namespace VisibleChunks {
		export interface Props {
			chunkSize: number;
		}

		export type Callback = (props: Props) => Chunk.Hash;
	}

	export interface Props {
		offset?: number;
	}
}

export const useVisibleChunks = ({
	offset = 0,
}: useVisibleChunks.Props): useVisibleChunks.VisibleChunks.Callback => {
	const { camera, size } = useThree(({ camera, size }) => ({
		camera: camera as OrthographicCamera,
		size,
	}));

	useEffect(() => {
		if (!(camera instanceof OrthographicCamera)) {
			console.error("This computation is designed for an orthographic camera.");
		}
	}, [camera]);

	return useMemo(() => {
		return ({ chunkSize }) => {
			const viewHeight = (camera.top - camera.bottom) / camera.zoom;
			const viewWidth = (camera.right - camera.left) / camera.zoom;

			const halfW = viewWidth * 0.5;
			const halfH = viewHeight * 0.5;
			const size = chunkSize / 2;

			const minX =
				Math.floor((camera.position.x - halfW + size) / chunkSize) - offset;
			const maxX =
				Math.ceil((camera.position.x + halfW + size) / chunkSize) + offset;
			const minZ =
				Math.floor((camera.position.z - halfH + size) / chunkSize) - offset;
			const maxZ =
				Math.ceil((camera.position.z + halfH + size) / chunkSize) + offset;

			return {
				hash: `[${minX} → ${maxX}]:[${minZ} → ${maxZ}]`,
				count: (maxX - minX) * (maxZ - minZ),
				minX,
				maxX,
				minZ,
				maxZ,
			};
		};
	}, [camera, size, offset]);
};
