import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { MOUSE, type DirectionalLight } from "three";
import { useDebouncedCallback } from "use-debounce";
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
