import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
    useCallback,
    useEffect,
    useState,
    useTransition,
    type FC,
} from "react";
import { MOUSE } from "three";
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
			scale: 5,
		},
	});
	const [chunks, setChunks] = useState(
		new Map<
			string,
			{ x: number; z: number; tiles: useGenerator.Generator.Tile[] }
		>(),
	);
	const [, startTransition] = useTransition();

	const update = useCallback(() => {
		setTimeout(() => {
			startTransition(() => {
				chunks.clear();
				visibleChunks().forEach((chunk) => {
					setChunks((prev) => {
						const key = `${chunk.x}:${chunk.z}`;
						prev.set(key, {
							x: chunk.x,
							z: chunk.z,
							tiles: generator(chunk),
						});
						return new Map(prev);
					});
				});
				invalidate();
			});
		}, 0);
	}, [
		chunks,
		visibleChunks,
		setChunks,
		generator,
		invalidate,
		startTransition,
	]);

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
				mouseButtons={{ LEFT: MOUSE.PAN }}
				onChange={() => {
					update();
				}}
			/>

			{[...chunks.values()].map((chunk) => {
				return chunk.tiles.map((tile) => {
					const tileX = tile.id % config.plotCount;
					const tileZ = Math.floor(tile.id / config.plotCount);

					const x = chunk.x * config.chunkSize + tileX * config.plotSize;
					const z = chunk.z * config.chunkSize + tileZ * config.plotSize;

					return (
						<mesh
							key={`chunk-${chunk.x}:${chunk.z}-tile-${x}:${z}`}
							position={[x, 0, z]}
						>
							<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
							<meshLambertMaterial
								color={tiles[tile.tileId as keyof typeof tiles]!.color}
							/>
						</mesh>
					);
				});
			})}
		</>
	);
};
