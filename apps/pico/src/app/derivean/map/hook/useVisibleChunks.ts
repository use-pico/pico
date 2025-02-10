import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrthographicCamera } from "three";

export namespace useVisibleChunks {
	export interface Props {
		chunkSize: number;
	}
}

export const useVisibleChunks = ({ chunkSize }: useVisibleChunks.Props) => {
	const { camera, size } = useThree(({ camera, size }) => ({ camera, size }));

	useEffect(() => {
		if (!(camera instanceof OrthographicCamera)) {
			console.error("This computation is designed for an orthographic camera.");
		}
	}, [camera]);

	return () => {
		const cam = camera as OrthographicCamera;
		const viewHeight = (cam.top - cam.bottom) / cam.zoom;
		const viewWidth = viewHeight * (size.width / size.height);
		const halfW = viewWidth * 0.5;
		const halfH = viewHeight * 0.5;

		const minChunkX = Math.floor((cam.position.x - halfW) / chunkSize);
		const maxChunkX = Math.floor((cam.position.x + halfW) / chunkSize);
		const minChunkZ = Math.floor((cam.position.z - halfH) / chunkSize);
		const maxChunkZ = Math.floor((cam.position.z + halfH) / chunkSize);

		const chunks: { x: number; z: number }[] = [];
		for (let chunkX = minChunkX; chunkX <= maxChunkX; chunkX++) {
			for (let chunkZ = minChunkZ; chunkZ <= maxChunkZ; chunkZ++) {
				chunks.push({ x: chunkX, z: chunkZ });
			}
		}

		return {
			chunks,
			hash: `[${minChunkX} → ${maxChunkX}]:[${minChunkZ} → ${maxChunkZ}]`,
		};
	};
};
