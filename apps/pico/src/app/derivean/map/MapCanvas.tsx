import { OrthographicCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { FC, PropsWithChildren } from "react";
import { ACESFilmicToneMapping } from "three";

export namespace MapCanvas {
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

	export interface Props extends PropsWithChildren {
		config: Config;
	}
}

export const MapCanvas: FC<MapCanvas.Props> = ({ config, children }) => {
	return (
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
				zoom={1}
				position={[0, 10, 0]}
			/>

			{/* <gridHelper
				args={[config.chunkSize, config.plotSize, 0xff0000, 0xaaaaaa]}
			/> */}

			<ambientLight intensity={0.5} />
			<directionalLight
				color={0xffffff}
				intensity={1}
				position={[0, 100, 0]}
			/>

			{children}
		</Canvas>
	);
};
