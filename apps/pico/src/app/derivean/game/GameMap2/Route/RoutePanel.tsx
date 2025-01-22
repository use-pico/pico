import { useParams } from "@tanstack/react-router";
import { LinkTo, Tx } from "@use-pico/client";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { Item } from "~/app/derivean/game/GameMap2/Route/Item";

export namespace RoutePanel {
	export interface Building {
		id: string;
		name: string;
	}

	export interface Route {
		id: string;
		fromId: string;
		toId: string;
		toName: string;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		route: Route[];
	}
}

export const RoutePanel: FC<RoutePanel.Props> = ({
	building,
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
					params={{ locale, id: building.id }}
					search={{ zoomToId: building.id }}
				>
					{building.name}
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
