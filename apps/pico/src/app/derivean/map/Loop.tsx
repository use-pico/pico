import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { MOUSE, type DirectionalLight } from "three";
import { useDebouncedCallback } from "use-debounce";
import { Chunks } from "~/app/derivean/map/Chunks";
import { useGenerator } from "~/app/derivean/map/hook/useGenerator";
import { useVisibleChunks } from "~/app/derivean/map/hook/useVisibleChunks";

const tiles: Record<string, useGenerator.Config.Tile> = {
	// ❄️ High Altitude
	snow: {
		id: "snow",
		level: "terrain",
		noise: 0.95,
		chance: 100,
		color: "#ffffff",
	},
	icy_rock: {
		id: "icy_rock",
		level: "terrain",
		noise: 0.92,
		chance: 100,
		color: "#d9e5f3",
	},
	rocky_mountain: {
		id: "rocky_mountain",
		level: "terrain",
		noise: 0.875,
		chance: 100,
		color: "#999999",
	},
	rock: {
		id: "rock",
		level: "terrain",
		noise: 0.8,
		chance: 100,
		color: "#aaaaaa",
	},

	// ⛰️ Mid Altitude
	mountain_hill: {
		id: "mountain_hill",
		level: "terrain",
		noise: 0.75,
		chance: 100,
		color: "#818181",
	},
	hill: {
		id: "hill",
		level: "terrain",
		noise: 0.7,
		chance: 100,
		color: "#20cc45",
	},
	wooded_hill: {
		id: "wooded_hill",
		level: "terrain",
		noise: 0.65,
		chance: 100,
		color: "#1ba937",
	},

	// 🌿 Lowlands
	grassland: {
		id: "grassland",
		level: "terrain",
		noise: 0.55,
		chance: 100,
		color: "#00cc00",
	},
	grass: {
		id: "grass",
		level: "terrain",
		noise: 0.4,
		chance: 100,
		color: "#00ff00",
	},
	forest_edge: {
		id: "forest_edge",
		level: "terrain",
		noise: 0.425,
		chance: 100,
		color: "#17c93d",
	},
	forest: {
		id: "forest",
		level: "terrain",
		noise: 0.45,
		chance: 100,
		color: "#15dd33",
	},

	// 🏝️ Coastal Areas
	sandy_grass: {
		id: "sandy_grass",
		level: "terrain",
		noise: 0.35,
		chance: 50,
		color: "#b5b83d",
	},
	beach_grass: {
		id: "beach_grass",
		level: "terrain",
		noise: 0.3,
		chance: 40,
		color: "#d7cc3b",
	},
	sand: {
		id: "sand",
		level: "terrain",
		noise: 0.25,
		chance: 40,
		color: "#ffff00",
	},
	beach: {
		id: "beach",
		level: "terrain",
		noise: 0.2,
		chance: 100,
		color: "#ffcc00",
	},

	// 🌊 Water Areas
	shallow_water: {
		id: "shallow_water",
		level: "terrain",
		noise: 0.175,
		chance: 50,
		color: "#0099ff",
	},
	water: {
		id: "water",
		level: "terrain",
		noise: 0.15,
		chance: 50,
		color: "#0000ff",
	},
	deepwater_edge: {
		id: "deepwater_edge",
		level: "terrain",
		noise: 0.075,
		chance: 50,
		color: "#0000aa",
	},
	deepwater: {
		id: "deepwater",
		level: "terrain",
		noise: 0.0,
		chance: 50,
		color: "#0000cc",
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
	const { camera, invalidate } = useThree(({ camera, invalidate }) => ({
		camera,
		invalidate,
	}));
	const visibleChunks = useVisibleChunks({ chunkSize: config.chunkSize });
	const generator = useGenerator({
		config: {
			tiles,
			seed: mapId,
			plotCount: config.plotCount,
			plotSize: config.plotSize,
			scale: 5,
		},
	});
	const chunkRef = useRef<Chunks.Chunk[]>([]);
	const [hash, setHash] = useState<string | undefined>();
	const lightRef = useRef<DirectionalLight>(null);

	const update = useDebouncedCallback(() => {
		if (lightRef.current) {
			lightRef.current.position.set(
				camera.position.x - 256,
				256,
				camera.position.z - 256,
			);
			lightRef.current.target.position.set(
				camera.position.x,
				0,
				camera.position.z,
			);
			lightRef.current.target.updateMatrixWorld();
		}

		const { minX, maxX, minZ, maxZ, count, hash: $hash } = visibleChunks();

		if ($hash === hash) {
			return;
		}

		const chunks = new Array(count);
		let index = 0;
		for (let x = minX; x <= maxX; x++) {
			for (let z = minZ; z <= maxZ; z++) {
				chunks[index++] = {
					id: `${x}:${z}`,
					x,
					z,
					tiles: generator({ x, z }),
				};
			}
		}

		chunkRef.current = chunks;
		setHash($hash);
		invalidate();
	}, 50);

	useEffect(() => {
		update();
	}, []);

	const chunks = useMemo(() => {
		return hash ?
				<Chunks
					config={config}
					chunksRef={chunkRef}
					chunkHash={hash}
				/>
			:	null;
	}, [hash]);

	return (
		<>
			<directionalLight
				ref={lightRef}
				castShadow
				color={0xffffff}
				intensity={2}
				position={[0, 256, 256]}
				shadow-mapSize={[4096, 4096]}
				shadow-bias={-0.0001}
				shadow-normalBias={0.1}
				shadow-radius={15}
			/>

			<OrbitControls
				enableRotate={true}
				enablePan={true}
				enableZoom={true}
				enableDamping={true}
				screenSpacePanning={false}
				zoomToCursor
				/**
				 * How far
				 */
				// minZoom={1.5}
				/**
				 * How close
				 */
				// maxZoom={32}
				mouseButtons={{ LEFT: MOUSE.PAN, RIGHT: MOUSE.ROTATE }}
				onChange={update}
			/>

			{chunks}
		</>
	);
};
