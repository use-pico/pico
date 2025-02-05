import { OrbitControls } from "@react-three/drei";
import type { FC } from "react";
import { MOUSE } from "three";

export namespace Controls {
	export interface Props {
		//
	}
}

export const Controls: FC<Controls.Props> = () => {
	return (
		<OrbitControls
			enableRotate={false}
			enablePan={true}
			enableZoom={true}
			enableDamping
			screenSpacePanning={false}
			zoomToCursor
			minZoom={0.5}
			maxZoom={4096}
			mouseButtons={{
				LEFT: MOUSE.PAN,
			}}
		/>
	);
};
