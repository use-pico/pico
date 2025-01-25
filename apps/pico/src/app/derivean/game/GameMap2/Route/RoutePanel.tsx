import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { Item } from "~/app/derivean/game/GameMap2/Route/Item";
import { RouteIcon } from "~/app/derivean/icon/RouteIcon";

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
		toConstructionId?: string | null;
		count: number;
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
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={RouteIcon}
			textTitle={<Tx label={"Routes (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: building.id }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/routes"}
						params={{ locale, mapId, buildingId: building.id }}
						search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
				</>
			}
			{...props}
		>
			{route.length > 0 ?
				route.map((item) => {
					return (
						<Item
							key={item.id}
							route={item}
						/>
					);
				})
			:	<div
					className={tvc([
						"flex",
						"items-center",
						"justify-center",
						"rounded-sm",
						"border",
						"border-amber-400",
						"p-4",
						"bg-amber-200",
						"font-bold",
					])}
				>
					<Tx label={"No outcomming routes yet (label)"} />
				</div>
			}
		</Panel>
	);
};
