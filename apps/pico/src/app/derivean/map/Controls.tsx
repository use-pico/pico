import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { genId } from "@use-pico/common";
import { useRef, useState, type FC } from "react";
import { Frustum, Matrix4, MOUSE, Plane, Ray, Vector3 } from "three";

export namespace Controls {
	export interface Config {
		chunkSize: number;
	}

	export interface Props {
		config: Config;
	}
}

export const Controls: FC<Controls.Props> = ({ config }) => {
	const frustumRef = useRef(new Frustum());
	const matrixRef = useRef(new Matrix4());
	const cornersRef = useRef([
		new Vector3(-1, -1, -1),
		new Vector3(1, -1, -1),
		new Vector3(-1, 1, -1),
		new Vector3(1, 1, -1),
		new Vector3(-1, -1, 1),
		new Vector3(1, -1, 1),
		new Vector3(-1, 1, 1),
		new Vector3(1, 1, 1),
	] as const);
	const frustumCornersRef = useRef([
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
	] as const);
	const [groundCornersRef, setGroundCornersRef] = useState({
		current: [
			new Vector3(),
			new Vector3(),
			new Vector3(),
			new Vector3(),
			new Vector3(),
			new Vector3(),
			new Vector3(),
			new Vector3(),
		],
	} as const);
	const visibleRef = useRef(new Set<string>());
	const { camera } = useThree(({ camera }) => ({
		camera,
	}));

	return (
		<>
			<OrbitControls
				enableRotate={false}
				enablePan={true}
				enableZoom={true}
				enableDamping={false}
				screenSpacePanning={false}
				zoomToCursor
				minZoom={1}
				// maxZoom={4096}
				mouseButtons={{
					LEFT: MOUSE.PAN,
				}}
				onEnd={() => {
					matrixRef.current.multiplyMatrices(
						camera.projectionMatrix,
						camera.matrixWorldInverse,
					);
					frustumRef.current.setFromProjectionMatrix(matrixRef.current);

					visibleRef.current.clear();

					cornersRef.current.forEach((ndc, i) => {
						frustumCornersRef.current[i]!.copy(ndc).applyMatrix4(
							camera.matrixWorld,
						);
					});

					const groundPlane = new Plane(new Vector3(0, 1, 0), 0);
					const newGroundCorners = frustumCornersRef.current.map((corner) => {
						const ray = new Ray(
							camera.position,
							corner.clone().sub(camera.position).normalize(),
						);
						const projected = new Vector3();
						ray.intersectPlane(groundPlane, projected);
						return projected.divideScalar(config.chunkSize);
					});

					const minX = Math.floor(
						Math.min(...newGroundCorners.map((c) => c.x)),
					);
					const maxX = Math.floor(
						Math.max(...newGroundCorners.map((c) => c.x)),
					);
					const minZ = Math.floor(
						Math.min(...newGroundCorners.map((c) => c.z)),
					);
					const maxZ = Math.floor(
						Math.max(...newGroundCorners.map((c) => c.z)),
					);

					for (let x = minX; x <= maxX; x++) {
						for (let z = minZ; z <= maxZ; z++) {
							visibleRef.current.add(`${x},${z}`);
						}
					}

					setGroundCornersRef({ current: newGroundCorners as any });

					console.log("ground", newGroundCorners);

					console.log("Visible chunks", visibleRef.current);
				}}
			/>

			{groundCornersRef.current.map((corner, i) => {
				return (
					<mesh
						position={corner}
						key={genId()}
					>
						<sphereGeometry args={[1]} />
						<meshBasicMaterial color={0xaa00ff} />
					</mesh>
				);
			})}
		</>
	);
};
