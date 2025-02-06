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
import { useGenerator } from "~/app/derivean/map/useGenerator";
import { useVisibleChunks } from "~/app/derivean/map/useVisibleChunks";

const tiles = {
	water: {
		id: "water",
		chance: 50,
		color: 0x0000ff,
		link: {
			water: {
				id: "water",
				chance: 50,
			},
			sand: {
				id: "sand",
				chance: 15,
			},
		},
	},
	sand: {
		id: "sand",
		chance: 40,
		color: 0xffff00,
		link: {
			sand: {
				id: "sand",
				chance: 40,
			},
			grass: {
				id: "grass",
				chance: 35,
			},
		},
	},
	grass: {
		id: "grass",
		chance: 85,
		color: 0x00ff00,
		link: {
			tree: {
				id: "tree",
				chance: 10,
			},
			rock: {
				id: "rock",
				chance: 5,
			},
			sand: {
				id: "sand",
				chance: 35,
			},
		},
	},
	tree: {
		id: "tree",
		chance: 75,
		color: 0x00aa33,
		link: {
			tree: {
				id: "tree",
				chance: 75,
			},
			grass: {
				id: "grass",
				chance: 65,
			},
			rock: {
				id: "rock",
				chance: 5,
			},
		},
	},
	mountain: {
		id: "mountain",
		chance: 60,
		color: 0x999999,
		link: {
			mountain: {
				id: "mountain",
				chance: 30,
			},
			tree: {
				id: "tree",
				chance: 20,
			},
			rock: {
				id: "rock",
				chance: 10,
			},
		},
	},
} as const;

export namespace Loop {
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
		config: Config;
	}
}

export const Loop: FC<Loop.Props> = ({ config }) => {
	const { invalidate } = useThree(({ invalidate }) => ({ invalidate }));
	const visibleChunks = useVisibleChunks({
		chunkSize: config.chunkSize * config.plotSize,
	});
	const generator = useGenerator({
		config: {
			tiles,
			seed: 1234,
			size: config.chunkSize,
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
				const chunkSize = config.chunkSize * config.plotSize;
				return chunk.tiles.map((tile) => {
					const tileX = tile.id % config.chunkSize;
					const tileZ = Math.floor(tile.id / config.chunkSize);

					const x = chunk.x * chunkSize + tileX * config.plotSize;
					const z = chunk.z * chunkSize + tileZ * config.plotSize;

					return (
						<mesh
							key={`chunk-${chunk.x}:${chunk.z}-tile-${x}:${z}`}
							position={[x, 0, z]}
						>
							<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
							<meshLambertMaterial
								color={tiles[tile.tileId as keyof typeof tiles].color}
							/>
						</mesh>
					);
				});
			})}
		</>
	);
};
