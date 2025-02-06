import { invalidate } from "@react-three/fiber";
import { useEffect, useRef, type FC, type MutableRefObject } from "react";
import { Color, Object3D, type InstancedMesh } from "three";
import type { useGenerator } from "~/app/derivean/map/hook/useGenerator";

export namespace Chunks {
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
		config: Config;
		tiles: Record<string, { color: number }>;
		chunksRef: MutableRefObject<
			Map<
				string,
				{
					x: number;
					z: number;
					tiles: useGenerator.Generator.Tile[];
				}
			>
		>;
	}
}

export const Chunks: FC<Chunks.Props> = ({ config, tiles, chunksRef }) => {
	const meshRef = useRef<InstancedMesh>(null);
	const colorRef = useRef<Color>(new Color());
	const objectRef = useRef<Object3D>(new Object3D());

	useEffect(() => {
		if (!meshRef.current) {
			return;
		}

		let i = 0;

		chunksRef.current.forEach((chunk) => {
			chunk.tiles.forEach((tile) => {
				const tileX = tile.id % config.plotCount;
				const tileZ = Math.floor(tile.id / config.plotCount);
				const x = chunk.x * config.chunkSize + tileX * config.plotSize;
				const z = chunk.z * config.chunkSize + tileZ * config.plotSize;

				objectRef.current!.position.set(x, 0, z);
				objectRef.current!.updateMatrix();

				meshRef.current!.setMatrixAt(i, objectRef.current!.matrix);
				meshRef.current?.setColorAt(
					i,
					colorRef.current.set(tiles[tile.tileId]!.color),
				);

				i++;
			});
		});

		meshRef.current.instanceMatrix.needsUpdate = true;
		if (meshRef.current.instanceColor) {
			meshRef.current.instanceColor.needsUpdate = true;
		}
		meshRef.current!.computeBoundingBox();

		invalidate();
	});

	return (
		<instancedMesh
			ref={meshRef}
			args={[
				undefined,
				undefined,
				chunksRef.current.size * config.plotCount ** 2,
			]}
		>
			<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
			<meshLambertMaterial color={0xffffff} />
		</instancedMesh>
	);
};
