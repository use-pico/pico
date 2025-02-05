import { OrthographicCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { tvc } from "@use-pico/common";
import { FC } from "react";
import { ACESFilmicToneMapping } from "three";
import { Game } from "~/app/derivean/Game";
import { Controls } from "~/app/derivean/map/Controls";

export namespace Map {
	export interface Land {
		id: string;
		regionId: string;
		position: number;
	}

	export interface Props {
		mapId: string;
		userId: string;
		cycle: number;
		land: Land[];
	}
}

export const Map: FC<Map.Props> = ({ mapId, land }) => {
	const { size } = Game.world;

	return (
		<div className={tvc(["w-screen", "h-screen", "overflow-hidden"])}>
			<Canvas
				frameloop={"demand"}
				gl={{
					preserveDrawingBuffer: false,
					powerPreference: "high-performance",
					toneMapping: ACESFilmicToneMapping,
					toneMappingExposure: 1.0,
				}}
			>
				<Stats />

				<color
					attach={"background"}
					args={[0x101510]}
				/>

				<OrthographicCamera
					makeDefault
					position={[0, 16, 0]}
				/>

				<Controls />

				<gridHelper args={[128, 128]} />

				<ambientLight intensity={0.1} />
				<directionalLight
					color={0xffffff}
					position={[0, 100, 0]}
				/>

				<instancedMesh matrixAutoUpdate={false}>
					<mesh>
						<boxGeometry args={[10, 0.5, 10]} />
						<meshLambertMaterial color={0x00ff00} />
					</mesh>
				</instancedMesh>
			</Canvas>
		</div>
	);
};
