import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { OrthographicCamera, Vector3 } from "three";

export namespace useVisibleChunks {
	export interface Props {
		chunkSize: number;
	}
}

export const useVisibleChunks = ({ chunkSize }: useVisibleChunks.Props) => {
	const { camera, size } = useThree(({ camera, size }) => ({ camera, size }));
	const cornersRef = useRef([
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
	] as const);
	const chunksRef = useRef(new Set<{ x: number; z: number }>());

	useEffect(() => {
		if (!(camera instanceof OrthographicCamera)) {
			console.error("This computation is designed for an orthographic camera.");
		}
	}, [camera]);

	return () => {
		const {
			top,
			bottom,
			zoom,
			position: { x, z },
		} = camera as OrthographicCamera;

		const viewHeight = (top - bottom) / zoom;
		const viewWidth = viewHeight * (size.width / size.height);

		cornersRef.current[0].set(x - viewWidth / 2, 0, z - viewHeight / 2);
		cornersRef.current[1].set(x + viewWidth / 2, 0, z - viewHeight / 2);
		cornersRef.current[2].set(x - viewWidth / 2, 0, z + viewHeight / 2);
		cornersRef.current[3].set(x + viewWidth / 2, 0, z + viewHeight / 2);

		const minChunkX = Math.floor(cornersRef.current[0].x / chunkSize);
		const maxChunkX = Math.floor(cornersRef.current[1].x / chunkSize);
		const minChunkZ = Math.floor(cornersRef.current[0].z / chunkSize);
		const maxChunkZ = Math.floor(cornersRef.current[2].z / chunkSize);

		chunksRef.current.clear();

		for (let chunkX = minChunkX; chunkX <= maxChunkX; chunkX++) {
			for (let chunkZ = minChunkZ; chunkZ <= maxChunkZ; chunkZ++) {
				chunksRef.current.add({ x: chunkX, z: chunkZ });
			}
		}
		// return Array.from({ length: 17 }, (_, x) => x - 8).flatMap((chunkX) =>
		// 	Array.from({ length: 17 }, (_, z) => z - 8).map((chunkZ) => ({
		// 		x: chunkX,
		// 		z: chunkZ,
		// 	})),
		// );
		// console.log("chunks", chunksRef.current);

		return {
			chunks: chunksRef.current,
			hash: `[${minChunkX} → ${maxChunkX}]:[${minChunkZ} → ${maxChunkZ}]`,
		};
	};
};
