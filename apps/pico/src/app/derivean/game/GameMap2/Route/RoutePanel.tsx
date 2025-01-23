import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
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
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Panel
			icon={"icon-[gis--route-end]"}
			textTitle={<Tx label={"Routes (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/building/$id/view"}
						params={{ locale, id: building.id }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/map/building/$id/routes"}
						params={{ locale, id: building.id }}
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
						"rounded",
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
