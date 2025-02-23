import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { FC, PropsWithChildren } from "react";
import { ACESFilmicToneMapping } from "three";

export namespace MapCanvas {
	export interface Props extends PropsWithChildren {
		zoom: number;
	}
}

export const MapCanvas: FC<MapCanvas.Props> = ({ zoom, children }) => {
	console.log("MapCanvas re-render");

	return (
		<Canvas
			frameloop={"demand"}
			gl={{
				preserveDrawingBuffer: false,
				powerPreference: "high-performance",
				toneMapping: ACESFilmicToneMapping,
				toneMappingExposure: 1.0,
				antialias: true,
			}}
			camera={{
				zoom,
				position: [0, 16, 0],
				up: [0, 0, -1],
				near: 0.1,
				far: 4096,
			}}
			shadows
			dpr={[1, 2]}
			orthographic
		>
			<color
				attach={"background"}
				args={[0x101510]}
			/>
			<Stats />

			{/* <gridHelper
				args={[GameConfig.chunkSize, GameConfig.plotCount, 0xff0000, 0xaaaaaa]}
			/> */}

			<ambientLight intensity={0.25} />
			{/* 
			<EffectComposer enableNormalPass>
				<SSAO
					radius={0.8}
					intensity={60}
					luminanceInfluence={0.5}
					color={new Color(0x101510)}
					worldDistanceFalloff={0.2}
					worldDistanceThreshold={1.0}
					worldProximityFalloff={0.5}
					worldProximityThreshold={0.6}
				/>
			</EffectComposer> */}

			{children}
		</Canvas>
	);
};
