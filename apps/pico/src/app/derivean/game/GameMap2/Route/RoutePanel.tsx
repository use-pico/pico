import { useParams } from "@tanstack/react-router";
import { LinkTo, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { Item } from "~/app/derivean/game/GameMap2/Route/Item";
import type { BuildingSchema } from "~/app/derivean/game/GameMap2/schema/BuildingSchema";
import type { RouteSchema } from "~/app/derivean/game/GameMap2/schema/RouteSchema";

export namespace RoutePanel {
	export interface Props extends Panel.PropsEx, Entity.Schema<BuildingSchema> {
		route: RouteSchema.Type[];
	}
}

export const RoutePanel: FC<RoutePanel.Props> = ({
	entity,
	route,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Panel
			icon={"icon-[gis--route-end]"}
			textTitle={<Tx label={"Routes (label)"} />}
			textSubTitle={
				<LinkTo
					to={"/$locale/apps/derivean/map/building/$id/routes"}
					params={{ locale, id: entity.id }}
					search={{ zoomToId: entity.id }}
				>
					{entity.name}
				</LinkTo>
			}
			{...props}
		>
			{route.map((item) => {
				return (
					<Item
						key={item.id}
						entity={item}
					/>
				);
			})}
		</Panel>
	);
};
