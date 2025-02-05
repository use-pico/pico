import { type FC } from "react";
import { Game } from "~/app/derivean/Game";

export namespace Land {
	export interface Land {
		id: string;
		position: number;
		image?: string | null;
	}

	export interface Props {
		land: Land;
	}
}

export const Land: FC<Land.Props> = ({ land }) => {
	const grid = Game.world.lands;
	const tile = Game.land.size;
	const col = land.position % grid;
	const row = Math.floor(land.position / grid);
	const x = col * tile - Game.world.size / 2;
	const z = -row * tile + Game.world.size / 2;

	return (
		<mesh
			key={land.id}
			position={[x, 0, z]}
		>
			<boxGeometry args={[tile, 1, tile]} />
			<meshPhongMaterial color={(col + row) % 2 === 0 ? 0x880000 : 0x008800} />
		</mesh>
	);
};
