import { memo, type FC } from "react";
import { Game } from "~/app/derivean/Game";

export namespace Plot {
	export interface Plot {
		id: string;
		position: number;
	}
	export interface Props {
		plot: Plot;
		landX: number;
		landZ: number;
	}
}

export const Plot: FC<Plot.Props> = memo(({ plot, landX, landZ }) => {
	const grid = Game.land.plots;
	const tile = Game.plot.size;
	const col = plot.position % grid;
	const row = Math.floor(plot.position / grid);
	const coordX = landX + col * tile;
	const coordZ = landZ + -row * tile;

	return (
		<mesh
			key={plot.id}
			position={[coordX + tile / 2, 5, coordZ - tile / 2]}
		>
			<boxGeometry args={[tile, 1, tile]} />
			<meshPhongMaterial color={(col + row) % 2 === 0 ? 0xaaaa00 : 0x00aaaa} />
		</mesh>
	);
});
