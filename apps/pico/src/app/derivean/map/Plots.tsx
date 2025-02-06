import { useThree } from "@react-three/fiber";
import { useQuery } from "@tanstack/react-query";
import { withList } from "@use-pico/client";
import { useEffect, useRef, type FC } from "react";
import { Color, InstancedMesh, Object3D } from "three";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { Game } from "~/app/derivean/Game";

export namespace Plots {
	export interface Land {
		id: string;
		mapId: string;
	}

	export interface Props {
		land: Land;
		landX: number;
		landZ: number;
	}
}

export const Plots: FC<Plots.Props> = ({ land, landX, landZ }) => {
	const dummyRef = useRef(new Object3D());
	const colorRef = useRef(new Color());
	const meshRef = useRef<InstancedMesh>(null);
	const { invalidate, raycaster, pointer, camera } = useThree(
		({ invalidate, raycaster, pointer, camera }) => ({
			invalidate,
			raycaster,
			pointer,
			camera,
		}),
	);
	const grid = Game.land.plots;
	const tile = Game.plot.size;
	const halfLife = tile / 2;

	const plots = useQuery({
		queryKey: ["map", land.mapId, "land", land.id, "plots"],
		queryFn: async () => {
			return kysely.transaction().execute((tx) => {
				return withList({
					select: tx
						.selectFrom("Plot as p")
						.select(["p.id", "p.position"])
						.where("p.landId", "=", land.id)
						.orderBy("p.position"),
					output: z.object({
						id: z.string().min(1),
						position: z.number(),
					}),
				});
			});
		},
	});

	useEffect(() => {
		if (!meshRef.current) {
			return;
		}

		plots.data?.forEach((plot) => {
			const col = plot.position % grid;
			const row = Math.floor(plot.position / grid);

			const x = landX + col * tile + halfLife;
			const z = landZ + -row * tile - halfLife;

			dummyRef.current.position.set(x, 1, z);
			dummyRef.current.updateMatrix();

			meshRef.current!.setMatrixAt(plot.position, dummyRef.current.matrix);
			meshRef.current!.setColorAt(
				plot.position,
				colorRef.current.setHex(Math.random() * 0xffffff),
			);
		});

		meshRef.current.instanceMatrix.needsUpdate = plots.isSuccess;
		if (plots.isSuccess && meshRef.current.instanceColor) {
			meshRef.current.instanceColor.needsUpdate = true;
		}
		plots.isSuccess && meshRef.current!.computeBoundingBox();
		plots.isSuccess && invalidate();
	}, [meshRef, dummyRef, colorRef, land.id, plots.isSuccess]);

	return (
		<instancedMesh
			ref={meshRef}
			args={[undefined, undefined, Game.land.plots ** 2]}
			visible={plots.isSuccess}
		>
			<boxGeometry args={[Game.plot.size, 1, Game.plot.size]} />
			<meshLambertMaterial color={0x00cc9a} />
		</instancedMesh>
	);
};
