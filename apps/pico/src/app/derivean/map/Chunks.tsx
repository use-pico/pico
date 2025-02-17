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
		 * Deep Water
		 */
		{ level: 0.0, color: "#000066" },
		{ level: 0.025, color: "#000077" },
		{ level: 0.05, color: "#000088" },
		{ level: 0.075, color: "#000099" },
		{ level: 0.1, color: "#0000aa" },
		{ level: 0.125, color: "#0000bb" },
		{ level: 0.15, color: "#0000cc" },
		{ level: 0.175, color: "#0000dd" },
		{ level: 0.18, color: "#0000ee" },
		/**
		 * Beach
		 */
		{ level: 0.2, color: "#ccaa00" },
		{ level: 0.225, color: "#ddbb00" },
		{ level: 0.25, color: "#eedd00" },
		{ level: 0.275, color: "#aa8800" },
		/**
		 * Grasslands
		 */
		{ level: 0.3, color: "#009900" },
		{ level: 0.325, color: "#00aa00" },
		{ level: 0.35, color: "#00bb00" },
		{ level: 0.375, color: "#00cc00" },
		{ level: 0.4, color: "#00dd00" },
		{ level: 0.425, color: "#00aa44" },
		/**
		 * Forest
		 */
		{ level: 0.45, color: "#008800" },
		{ level: 0.475, color: "#007700" },
		{ level: 0.5, color: "#006600" },
		{ level: 0.55, color: "#005500" },
		{ level: 0.6, color: "#004400" },
		{ level: 0.65, color: "#003300" },
		/**
		 * Hills
		 */
		{ level: 0.7, color: "#666600" },
		{ level: 0.75, color: "#777700" },
		{ level: 0.775, color: "#888800" },
		/**
		 * Mountains
		 */
		{ level: 0.8, color: "#555555" },
		{ level: 0.825, color: "#666666" },
		{ level: 0.85, color: "#777777" },
		{ level: 0.875, color: "#888888" },
		{ level: 0.9, color: "#999999" },
		{ level: 0.925, color: "#aaaaaa" },
		{ level: 0.95, color: "#bbbbbb" },
		{ level: 0.975, color: "#cccccc" },
		{ level: 0.99, color: "#eeeeee" },
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
