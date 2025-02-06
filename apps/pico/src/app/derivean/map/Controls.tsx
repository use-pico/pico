import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { genId } from "@use-pico/common";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
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
	const [groundCorners, setGroundCorners] = useState<readonly Vector3[]>([]);

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

		setGroundCorners([...cornersRef.current]);
	}, [camera, cornersRef, setGroundCorners]);

	return (
		<>
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

			{groundCorners.map((corner, i) => (
				<mesh
					position={corner}
					key={genId()}
				>
					<sphereGeometry args={[10 * camera.zoom]} />
					<meshBasicMaterial color={0xaa00ff} />
				</mesh>
			))}
		</>
	);
};
