import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useReducer, useRef, type FC } from "react";
import { MOUSE } from "three";
import { Chunks } from "~/app/derivean/map/Chunks";
import { useGenerator } from "~/app/derivean/map/hook/useGenerator";
import { useVisibleChunks } from "~/app/derivean/map/hook/useVisibleChunks";

const tiles: Record<string, useGenerator.Config.Tile> = {
	deepwater: {
		id: "deepwater",
		level: "terrain",
		noise: 0.0,
		chance: 50,
		color: 0x0000cc,
	},
	water: {
		id: "water",
		level: "terrain",
		noise: 0.15,
		chance: 50,
		color: 0x0000ff,
	},
	beach: {
		id: "beach",
		level: "terrain",
		noise: 0.2,
		chance: 100,
		color: 0xffcc00,
	},
	sand: {
		id: "sand",
		level: "terrain",
		noise: 0.25,
		chance: 40,
		color: 0xffff00,
	},
	mountain: {
		id: "mountain",
		level: "terrain",
		noise: 0.875,
		chance: 100,
		color: 0x999999,
	},
	snow: {
		id: "snow",
		level: "terrain",
		noise: 0.95,
		chance: 100,
		color: 0xffffff,
	},
	rock: {
		id: "rock",
		level: "terrain",
		noise: 0.8,
		chance: 100,
		color: 0xaaaaaa,
	},
	hill: {
		id: "hill",
		level: "terrain",
		noise: 0.7,
		chance: 100,
		color: 0x20cc45,
	},
	grass: {
		id: "grass",
		level: "terrain",
		noise: 0.4,
		chance: 100,
		color: 0x00ff00,
	},
	forest: {
		id: "forest",
		level: "terrain",
		noise: 0.45,
		chance: 100,
		color: 0x15dd33,
	},
} as const;

export namespace Loop {
	export interface Config {
		/**
		 * Number of plots in a chunk
		 */
		chunkSize: number;
		plotCount: number;
		/**
		 * Size of a plot
		 */
		plotSize: number;
	}

	export interface Props {
		mapId: string;
		config: Config;
	}
}

export const Loop: FC<Loop.Props> = ({ mapId, config }) => {
	const { invalidate } = useThree(({ invalidate }) => ({ invalidate }));
	const visibleChunks = useVisibleChunks({
		chunkSize: config.chunkSize,
	});
	const generator = useGenerator({
		config: {
			tiles,
			seed: mapId,
			plotCount: config.plotCount,
			plotSize: config.plotSize,
			scale: 5,
		},
	});
	const chunkRef = useRef(
		new Map<
			string,
			{ x: number; z: number; tiles: useGenerator.Generator.Tile[] }
		>(),
	);

	const [, render] = useReducer((x) => x + 1, 0);

	const update = useCallback(() => {
		chunkRef.current.clear();
		visibleChunks().forEach((chunk) => {
			chunkRef.current.set(`${chunk.x}:${chunk.z}`, {
				x: chunk.x,
				z: chunk.z,
				tiles: generator(chunk),
			});
		});
		invalidate();
		render();
	}, [chunkRef, visibleChunks, generator, invalidate]);

	useEffect(() => {
		update();
	}, []);

	return (
		<>
			<OrbitControls
				enableRotate={false}
				enablePan={true}
				enableZoom={true}
				enableDamping={false}
				screenSpacePanning={false}
				zoomToCursor
				/**
				 * How far
				 */
				minZoom={0.5}
				/**
				 * How close
				 */
				maxZoom={15}
				mouseButtons={{ LEFT: MOUSE.PAN }}
				onChange={update}
			/>

			<Chunks
				config={config}
				tiles={tiles}
				chunksRef={chunkRef}
			/>
		</>
	);
};
