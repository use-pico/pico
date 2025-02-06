import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { genId } from "@use-pico/common";
import { useCallback, useEffect, useState, type FC } from "react";
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

	useEffect(() => {
		if (!(camera instanceof OrthographicCamera)) {
			console.error("This computation is designed for an orthographic camera.");
		}
	}, [camera]);

	const [groundCorners, setGroundCorners] = useState<Vector3[]>([]);

	const onChange = useCallback(() => {
		const {
			top,
			bottom,
			zoom,
			position: { x, z },
		} = camera as OrthographicCamera;

		const viewHeight = (top - bottom) / zoom;
		const viewWidth = viewHeight * (size.width / size.height);

		const projectedCorners = [
			new Vector3(x - viewWidth / 2, 0, z - viewHeight / 2),
			new Vector3(x + viewWidth / 2, 0, z - viewHeight / 2),
			new Vector3(x - viewWidth / 2, 0, z + viewHeight / 2),
			new Vector3(x + viewWidth / 2, 0, z + viewHeight / 2),
		];

		setGroundCorners(projectedCorners);
	}, [camera, setGroundCorners]);

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
