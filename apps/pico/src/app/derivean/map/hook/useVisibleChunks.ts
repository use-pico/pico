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

		const minX = (cam.position.x - halfW) / chunkSize;
		const maxX = (cam.position.x + halfW) / chunkSize;
		const minZ = (cam.position.z - halfH) / chunkSize;
		const maxZ = (cam.position.z + halfH) / chunkSize;

		const minChunkX = Math.floor(minX);
		const maxChunkX = Math.ceil(maxX);
		const minChunkZ = Math.floor(minZ);
		const maxChunkZ = Math.ceil(maxZ);

		const width = maxChunkX - minChunkX + 1;
		const height = maxChunkZ - minChunkZ + 1;
		const chunkCount = width * height;

		const chunks = new Array(chunkCount);
		for (let i = 0; i < chunkCount; i++) {
			chunks[i] = {
				x: minChunkX + (i % width),
				z: minChunkZ + Math.floor(i / width),
			};
		}

		return {
			chunks,
			hash: `[${minChunkX} → ${maxChunkX}]:[${minChunkZ} → ${maxChunkZ}]`,
		};
	};
};
