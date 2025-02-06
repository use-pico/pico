import { Bvh, OrthographicCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { tvc } from "@use-pico/common";
import { FC } from "react";
import { ACESFilmicToneMapping } from "three";
import { Chunks } from "~/app/derivean/map/Chunks";
import { Controls } from "~/app/derivean/map/Controls";

export namespace Map {
	export interface Config {
		/**
		 * Number of plots in a chunk
		 */
		chunkSize: number;
		/**
		 * Size of a plot
		 */
		plotSize: number;
	}

	export interface Props {
		config?: Config;
	}
}

export const Map: FC<Map.Props> = ({
	config = { chunkSize: 32, plotSize: 16 },
}) => {
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
				orthographic
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

				<Controls
					config={{
						chunkSize: config.chunkSize,
					}}
				/>

				<gridHelper
					args={[
						config.chunkSize * config.plotSize,
						config.plotSize,
						0xff0000,
						0xaaaaaa,
					]}
				/>

				<mesh>
					<boxGeometry args={[100, 1, 100]} />
				</mesh>

				<ambientLight intensity={0.1} />
				<directionalLight
					color={0xffffff}
					position={[0, 100, 0]}
				/>

				<Bvh firstHitOnly>
					<Chunks config={config} />
				</Bvh>
			</Canvas>
		</div>
	);
};
