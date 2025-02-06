import { useThree } from "@react-three/fiber";
import { useEffect, useState, type FC } from "react";
import { useGenerator } from "~/app/derivean/map/useGenerator";
import { useVisibleChunks } from "~/app/derivean/map/useVisibleChunks";

export namespace Chunks {
	export interface Config {
		chunkSize: number;
		plotSize: number;
	}

	export interface Props {
		config: Config;
	}
}

export const Chunks: FC<Chunks.Props> = ({ config }) => {
	const { controls } = useThree(({ controls }) => ({ controls }));
	const generator = useGenerator({});
	const visibleChunks = useVisibleChunks(config);

	const { camera } = useThree();
	const [cameraPosition, setCameraPosition] = useState(camera.position.clone());

	console.log(
		"Camera",
		camera.position.x,
		camera.position.y,
		camera.position.z,
		camera.zoom,
	);

	useEffect(() => {
		console.log("Camera changed!", camera.position);
		if (!camera.position.equals(cameraPosition)) {
			setCameraPosition(camera.position.clone());
			console.log("Camera moved!", camera.position);
		}
	}, [camera.position.x, camera.position.y, camera.position.z, camera.zoom]);

	return <></>;
};
