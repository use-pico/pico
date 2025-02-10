import { FC, type MutableRefObject } from "react";
import { CanvasTexture } from "three";
import type { useGenerator } from "~/app/derivean/map/hook/useGenerator";

export namespace Chunks {
	export interface Config {
		chunkSize: number;
		plotCount: number;
		plotSize: number;
	}

	export interface Props {
		config: Config;
		chunksRef: MutableRefObject<
			Map<
				string,
				{
					x: number;
					z: number;
					tiles: {
						tile: useGenerator.Config.Tile;
						x: number;
						z: number;
					}[];
				}
			>
		>;
	}
}

export const Chunks: FC<Chunks.Props> = ({ config, chunksRef }) => {
	const hexToCssColor = (hex: number): string => {
		return `#${hex.toString(16).padStart(6, "0")}`;
	};

	const generateChunkTexture = (chunk: {
		tiles: {
			tile: useGenerator.Config.Tile;
			x: number;
			z: number;
		}[];
	}) => {
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
		return texture;
	};

	return (
		<>
			{Array.from(chunksRef.current.values()).map((chunk) => {
				const texture = generateChunkTexture(chunk);
				console.log("generating", { x: chunk.x, z: chunk.z });

				return (
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
							map={texture}
							roughness={0.5}
						/>
					</mesh>
				);
			})}
		</>
	);
};
