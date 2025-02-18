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

const floatToGrayscaleHex = (value: number, step = 64): string => {
	const $value = Math.max(0, Math.min(1, value));

	const color = Math.round(Math.round(($value * 255) / step) * step);

	const map = [
		/**
		 * Deep Ocean (Dark to Vibrant Blues)
		 */
		{ level: -1.0, color: "#000022" },
		{ level: -0.95, color: "#000044" },
		{ level: -0.9, color: "#001f7f" },
		{ level: -0.85, color: "#002b9f" },
		{ level: -0.8, color: "#0037bf" },
		{ level: -0.75, color: "#0043df" },
		{ level: -0.7, color: "#0050ff" },
		{ level: -0.65, color: "#0062ff" },
		{ level: -0.6, color: "#0074ff" },
		{ level: -0.55, color: "#0086ff" },
		{ level: -0.5, color: "#0098ff" },
		/**
		 * Shallow Waters & Beaches (Yellowish Transition)
		 */
		{ level: -0.45, color: "#00aaff" },
		{ level: -0.4, color: "#11ccff" },
		{ level: -0.35, color: "#33ddff" },
		{ level: -0.3, color: "#55eeff" },
		{ level: -0.25, color: "#77ffff" },
		{ level: -0.2, color: "#ccdd77" },
		{ level: -0.15, color: "#eedd66" },
		{ level: -0.1, color: "#ffcc44" },
		{ level: -0.05, color: "#ffaa22" },
		/**
		 * Grasslands (Vibrant Greens)
		 */
		{ level: 0.0, color: "#44dd44" },
		{ level: 0.05, color: "#33cc33" },
		{ level: 0.1, color: "#22bb22" },
		{ level: 0.15, color: "#22aa22" },
		{ level: 0.2, color: "#119911" },
		{ level: 0.25, color: "#008800" },
		/**
		 * Forests (Dense and Deep Greens)
		 */
		{ level: 0.3, color: "#007700" },
		{ level: 0.35, color: "#006600" },
		{ level: 0.4, color: "#005500" },
		{ level: 0.45, color: "#004c00" },
		{ level: 0.5, color: "#004400" },
		{ level: 0.55, color: "#003b00" },
		{ level: 0.6, color: "#003300" },
		/**
		 * Hills (Extended Transition)
		 */
		{ level: 0.65, color: "#778822" },
		{ level: 0.7, color: "#889933" },
		{ level: 0.75, color: "#99aa22" },
		{ level: 0.8, color: "#aaa833" },
		{ level: 0.85, color: "#bbb844" },
		{ level: 0.875, color: "#cccc55" },
		{ level: 0.9, color: "#dddd66" },
		/**
		 * Mountains (Vibrant Rocky Shades)
		 */
		{ level: 0.925, color: "#666677" },
		{ level: 0.95, color: "#777788" },
		{ level: 0.975, color: "#888899" },
		{ level: 0.99, color: "#aaaaaa" },
		{ level: 1.0, color: "#ffffff" },
	].sort((a, b) => b.level - a.level);

	return map.filter(({ level }) => value >= level)[0]?.color || "#ff0000";

	// const hex = color.toString(16).padStart(2, "0");
	// return `#${hex}${hex}${hex}`;
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
