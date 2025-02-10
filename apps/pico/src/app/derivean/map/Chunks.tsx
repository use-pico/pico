import { useQuery } from "@tanstack/react-query";
import { FC, type MutableRefObject } from "react";
import { CanvasTexture } from "three";
import type { useGenerator } from "~/app/derivean/map/hook/useGenerator";

export namespace Chunks {
	export interface Config {
		chunkSize: number;
		plotCount: number;
		plotSize: number;
	}

	export interface Chunk {
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
		chunksRef: MutableRefObject<Map<string, Chunk>>;
	}
}

export const Chunks: FC<Chunks.Props> = ({ config, chunksRef, chunkHash }) => {
	const hexToCssColor = (hex: number): string => {
		return `#${hex.toString(16).padStart(6, "0")}`;
	};

	const { data: textures } = useQuery({
		queryKey: ["chunkTextures", chunkHash],
		async queryFn() {
			console.log("Generating textures for chunkHash:", chunkHash);
			const textures = new Map<string, CanvasTexture>();

			for (const [key, chunk] of chunksRef.current.entries()) {
				const canvas = document.createElement("canvas");
				canvas.width = config.chunkSize;
				canvas.height = config.chunkSize;
				const ctx = canvas.getContext("2d")!;

				chunk.tiles.forEach((tile) => {
					ctx.fillStyle = hexToCssColor(tile.tile.color);
					ctx.fillRect(
						tile.x,
						tile.z,
						canvas.width / config.plotCount,
						canvas.height / config.plotCount,
					);
				});

				const texture = new CanvasTexture(canvas);
				texture.needsUpdate = true;
				textures.set(key, texture);
			}

			return textures;
		},
		staleTime: Infinity,
		gcTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	return (
		<>
			{textures &&
				Array.from(chunksRef.current.entries()).map(([key, chunk]) => (
					<mesh
						key={`chunk-${chunk.x}:${chunk.z}`}
						position={[
							chunk.x * config.chunkSize,
							0,
							chunk.z * config.chunkSize,
						]}
						rotation={[-Math.PI / 2, 0, 0]}
						receiveShadow
					>
						<planeGeometry args={[config.chunkSize, config.chunkSize]} />
						<meshStandardMaterial
							color={0xffffff}
							map={textures.get(key)}
							roughness={0.5}
						/>
					</mesh>
				))}
		</>
	);
};
