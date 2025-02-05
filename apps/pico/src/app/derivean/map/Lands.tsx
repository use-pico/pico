import { useThree } from "@react-three/fiber";
import { useEffect, useRef, type FC } from "react";
import { Color, Object3D, type InstancedMesh } from "three";
import { Game } from "~/app/derivean/Game";
import { Land } from "~/app/derivean/map/Land";
import { Plots } from "~/app/derivean/map/Plots";

export namespace Lands {
	export interface Props {
		land: Land.Land[];
	}
}

export const Lands: FC<Lands.Props> = ({ land }) => {
	const dummyRef = useRef(new Object3D());
	const colorRef = useRef(new Color());
	const meshRef = useRef<InstancedMesh>(null);
	const invalidate = useThree(({ invalidate }) => invalidate);
	const grid = Game.world.lands;
	const tile = Game.land.size;
	const halfLife = tile / 2;
	const halfWorld = Game.world.size / 2;

	useEffect(() => {
		if (!meshRef.current) {
			return;
		}

		land.forEach((land) => {
			const col = land.position % grid;
			const row = Math.floor(land.position / grid);

			const x = col * tile + halfLife - halfWorld;
			const z = -row * tile - halfLife + halfWorld;

			dummyRef.current.position.set(x, 0, z);
			dummyRef.current.updateMatrix();

			meshRef.current!.setMatrixAt(land.position, dummyRef.current.matrix);
			meshRef.current!.setColorAt(
				land.position,
				colorRef.current.setHex(Math.random() * 0xffffff),
			);
		});

		meshRef.current.instanceMatrix.needsUpdate = land.length > 0;
		if (land.length > 0 && meshRef.current.instanceColor) {
			meshRef.current.instanceColor.needsUpdate = true;
		}
		land.length > 0 && invalidate();
	}, [meshRef, dummyRef, colorRef, land]);

	return (
		<group>
			<instancedMesh
				ref={meshRef}
				args={[undefined, undefined, land.length]}
			>
				<boxGeometry args={[tile, 1, tile]} />
				<meshLambertMaterial color={0x00ff00} />
			</instancedMesh>

			{land.map((land) => (
				<Plots
					key={land.id}
					land={land}
					landX={(land.position % grid) * tile - halfWorld}
					landZ={-Math.floor(land.position / grid) * tile + halfWorld}
				/>
			))}
		</group>
	);
};
