import { useQuery } from "@tanstack/react-query";
import { FC, useMemo, type MutableRefObject } from "react";
import { CanvasTexture } from "three";
import { Game } from "~/app/derivean/Game";
import type { EntitySchema } from "~/app/derivean/service/generator/EntitySchema";

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
		tiles: EntitySchema.Type[];
	}

	export interface Props {
		config: Config;
		chunkHash: string;
		chunksRef: MutableRefObject<Chunk[]>;
	}
}

const floatToGrayscaleHex = (value: number): string => {
	const $value = Math.max(0, Math.min(1, value));

	// Convert to 8-bit grayscale (0-255 range)
	const gray = Math.round($value * 255);

	// Format as hexadecimal color
	const hex = gray.toString(16).padStart(2, "0");
	return `#${hex}${hex}${hex}`;
};

export const Chunks: FC<Chunks.Props> = ({ config, chunksRef, chunkHash }) => {
	const canvasPool = useMemo(() => new Map<string, HTMLCanvasElement>(), []);

	const { data: textures } = useQuery({
		queryKey: ["chunkTextures", chunkHash],
		async queryFn() {
			console.log("Generating textures for chunkHash:", {
				chunkHash,
				count: chunksRef.current.length,
				size: config.chunkSize,
			});

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
					ctx.fillStyle = floatToGrayscaleHex(tile.noise);
					ctx.fillRect(tile.pos.x, tile.pos.z, Game.plotSize, Game.plotSize);
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
					position={[
						chunk.x * config.chunkSize,
						-1,
						chunk.z * config.chunkSize,
					]}
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

	return (
		<>
			<mesh position={[config.plotSize / 2, 0, config.plotSize / 2]}>
				<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
			</mesh>
			{map}
		</>
	);
};
