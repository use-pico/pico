import { Bvh, OrthographicCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { tvc } from "@use-pico/common";
import { FC } from "react";
import { ACESFilmicToneMapping } from "three";
import { Game } from "~/app/derivean/Game";
import { Controls } from "~/app/derivean/map/Controls";
import { Lands } from "~/app/derivean/map/Lands";

export namespace Map {
	export interface Land {
		id: string;
		regionId: string;
		position: number;
		image?: string | null;
	}

	export interface Props {
		mapId: string;
		userId: string;
		cycle: number;
		land: Land[];
	}
}

export const Map: FC<Map.Props> = ({ mapId, land }) => {
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
				<color
					attach={"background"}
					args={[0x101510]}
				/>
				<Stats />

				<OrthographicCamera
					makeDefault
					zoom={5}
					position={[0, 5, 0]}
				/>

				<Controls />

				<gridHelper
					args={[Game.world.size * 2, Game.world.lands, 0xff0000, 0xaaaaaa]}
				/>

				<ambientLight intensity={0.1} />
				<directionalLight
					color={0xffffff}
					position={[0, 100, 0]}
				/>

				<Bvh firstHitOnly>
					<Lands land={land} />
				</Bvh>
			</Canvas>
		</div>
	);
};
