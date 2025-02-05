import { useQuery } from "@tanstack/react-query";
import { withList } from "@use-pico/client";
import { type FC } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { Game } from "~/app/derivean/Game";
import { Plots } from "~/app/derivean/map/Plots";

export namespace Land {
	export interface Land {
		id: string;
		mapId: string;
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
	const coordX = col * tile;
	const coordZ = -row * tile;

	const plots = useQuery({
		queryKey: ["map", land.mapId, "land", land.id, "plot"],
		async queryFn() {
			return kysely.transaction().execute(async (tx) => {
				return withList({
					select: tx
						.selectFrom("Plot as p")
						.select(["p.id", "p.position"])
						.where("p.landId", "=", land.id),
					output: z.object({
						id: z.string().min(1),
						position: z.number(),
					}),
				});
			});
		},
	});

	return (
		<mesh
			key={land.id}
			position={[coordX + tile / 2, 0, coordZ - tile / 2]}
			visible={!plots.isLoading}
		>
			<boxGeometry args={[tile, 1, tile]} />
			<meshPhongMaterial color={(col + row) % 2 === 0 ? 0x880000 : 0x008800} />

			{plots.isSuccess ?
				<Plots
					land={land}
					landX={coordX}
					landZ={coordZ}
				/>
			:	null}
		</mesh>
	);
};
