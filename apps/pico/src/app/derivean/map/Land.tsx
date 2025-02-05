import { useQuery } from "@tanstack/react-query";
import { withList } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import { forwardRef } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { Game } from "~/app/derivean/Game";
import { Plot } from "~/app/derivean/map/Plot";

export namespace Land {
	export interface Land {
		id: string;
		regionId: string;
	}

	export interface Props {
		mapId: string;
		land: Land;
		visible: boolean;
	}
}

export const Land = forwardRef<HTMLDivElement, Land.Props>(
	({ mapId, land, visible }, ref) => {
		const plots = useQuery({
			queryKey: ["map", mapId, "land", land.id, "plots"],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withList({
						select: tx
							.selectFrom("Plot as p")
							.select(["p.id"])
							.where("p.landId", "=", land.id)
							.orderBy("p.position"),
						output: z.object({
							id: z.string().min(1),
						}),
					});
				});
			},
			enabled: visible,
		});

		return (
			<div
				id={land.id}
				ref={ref}
				className={tvc([
					plots.isLoading ?
						["pointer-events-none", "animate-pulse"]
					:	undefined,
					`bg-${land.regionId}`,
				])}
				style={{
					width: Game.land.size,
					height: Game.land.size,
				}}
			>
				{visible ?
					<div
						className={tvc(["flex", "flex-wrap"])}
						style={{
							gridTemplateColumns: `repeat(${Game.land.plots}, minmax(0, 1fr))`,
						}}
					>
						{land.id}
						{plots.data?.map((plot) => {
							return (
								<Plot
									key={plot.id}
									mapId={mapId}
									plot={plot}
								/>
							);
						})}
					</div>
				:	null}
			</div>
		);
	},
);
