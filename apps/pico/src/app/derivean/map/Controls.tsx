import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, type FC } from "react";
import { OrthographicCamera, Vector3 } from "three";

export namespace Controls {
	export interface Config {
		chunkSize: number;
	}
	export interface Props {
		config: Config;
	}
}

export const Controls: FC<Controls.Props> = ({ config }) => {
	const { camera, size } = useThree(({ camera, size }) => ({ camera, size }));
	const cornersRef = useRef([
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
	] as const);
	const chunksRef = useRef(new Set<string>());

	useEffect(() => {
		if (!(camera instanceof OrthographicCamera)) {
			console.error("This computation is designed for an orthographic camera.");
		}
	}, [camera]);

	const onChange = useCallback(() => {
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

		const minChunkX = Math.floor(cornersRef.current[0].x / config.chunkSize);
		const maxChunkX = Math.floor(cornersRef.current[1].x / config.chunkSize);
		const minChunkZ = Math.floor(cornersRef.current[0].z / config.chunkSize);
		const maxChunkZ = Math.floor(cornersRef.current[2].z / config.chunkSize);

		chunksRef.current.clear();

		for (let chunkX = minChunkX; chunkX <= maxChunkX; chunkX++) {
			for (let chunkZ = minChunkZ; chunkZ <= maxChunkZ; chunkZ++) {
				chunksRef.current.add(`${chunkX},${chunkZ}`);
			}
		}
	}, [camera, size, cornersRef, chunksRef]);

	return (
		<OrbitControls
			enableRotate={false}
			enablePan={true}
			enableZoom={true}
			enableDamping={false}
			screenSpacePanning={false}
			zoomToCursor
			mouseButtons={{ LEFT: 2 }}
			onChange={onChange}
		/>
	);
};
