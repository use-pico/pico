import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useMemo, type MutableRefObject } from "react";
import { CanvasTexture } from "three";
import type { useGenerator } from "~/app/derivean/map/hook/useGenerator";

export namespace Chunks {
	export interface Config {
		chunkSize: number;
		plotCount: number;
		plotSize: number;
	}

	export interface Chunk {
		id: string;
		x: number;
		z: number;
		tiles: {
			tile: useGenerator.Config.Tile;
			x: number;
			z: number;
		}[];
	}

	export interface Props {
		config: Config;
		chunkHash: string;
		chunksRef: MutableRefObject<Chunk[]>;
	}
}

export const Chunks: FC<Chunks.Props> = ({ config, chunksRef, chunkHash }) => {
	const canvasPool = useMemo(() => new Map<string, HTMLCanvasElement>(), []);

	const { data: textures } = useQuery({
		queryKey: ["chunkTextures", chunkHash],
		async queryFn() {
			console.log("Generating textures for chunkHash:", chunkHash);

			const texturesPool = new Map<string, CanvasTexture>();

			for (const chunk of chunksRef.current) {
				let canvas = canvasPool.get(chunk.id);
				if (!canvas) {
					canvas = document.createElement("canvas");
					canvas.width = config.chunkSize;
					canvas.height = config.chunkSize;
					canvasPool.set(chunk.id, canvas);
				}
				const ctx = canvas.getContext("2d")!;
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				chunk.tiles.forEach((tile) => {
					ctx.fillStyle = tile.tile.color;
					ctx.fillRect(tile.x, tile.z, config.plotSize, config.plotSize);
				});

				const texture = new CanvasTexture(canvas);
				texture.needsUpdate = true;
				texturesPool.set(chunk.id, texture);
			}

			return texturesPool;
		},
		staleTime: Infinity,
		gcTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	const map = useMemo(() => {
		if (!textures) {
			return null;
		}

		return chunksRef.current.map((chunk) => {
			return (
				<mesh
					key={`chunk-${chunk.id}`}
					position={[chunk.x * config.chunkSize, 0, chunk.z * config.chunkSize]}
					rotation={[-Math.PI / 2, 0, 0]}
					receiveShadow
				>
					<planeGeometry args={[config.chunkSize, config.chunkSize]} />
					<meshStandardMaterial
						color={0xffffff}
						map={textures.get(chunk.id)}
						roughness={0.5}
					/>
				</mesh>
			);
		});
	}, [textures]);

	return map;
};
