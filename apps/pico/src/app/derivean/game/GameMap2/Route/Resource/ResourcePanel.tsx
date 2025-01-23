import { useParams } from "@tanstack/react-router";
import { BackIcon, Icon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { InventoryItem } from "~/app/derivean/game/GameMap2/Route/Resource/InventoryItem";
import { Item } from "~/app/derivean/game/GameMap2/Route/Resource/Item";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace ResourcePanel {
	export interface Route {
		id: string;
		fromId: string;
		fromName: string;
		toName: string;
	}

	export interface Resource {
		id: string;
		name: string;
		amount: number;
	}

	export interface Inventory {
		id: string;
		name: string;
		resourceId: string;
		transport: number;
	}

	export interface Props extends Panel.PropsEx {
		route: Route;
		resource: Resource[];
		inventory: Inventory[];
	}
}

export const ResourcePanel: FC<ResourcePanel.Props> = ({
	route,
	resource,
	inventory,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Panel
			icon={ResourceIcon}
			textTitle={<Tx label={"Route resources (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/building/$id/routes"}
						params={{ locale, id: route.fromId }}
					/>
					<div className={"flex flex-row items-center gap-2"}>
						<div className={"font-light"}>{route.fromName}</div>
						<Icon icon={"icon-[cil--arrow-right]"} />
						<div>{route.toName}</div>
					</div>
				</>
			}
			{...props}
		>
			<div className={"flex flex-col gap-2"}>
				{resource.length > 0 ?
					<>
						<div className={"font-bold"}>
							<Tx label={"Transported resources (label)"} />
						</div>
						{resource.map((item) => {
							return (
								<Item
									key={item.id}
									resource={item}
								/>
							);
						})}
					</>
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
						<Tx label={"No route resources yet (label)"} />
					</div>
				}
			</div>
			<div className={"border-b border-slate-300 shadow-md"} />
			<div className={"flex flex-col gap-2"}>
				{inventory.length > 0 ?
					<>
						<div className={"font-bold"}>
							<Tx label={"Available resources (label)"} />
						</div>
						{inventory.map((item) => {
							return (
								<InventoryItem
									key={item.id}
									inventory={item}
									routeId={route.id}
								/>
							);
						})}
					</>
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
						<Tx label={"There are no available items for transport (label)"} />
					</div>
				}
			</div>
		</Panel>
	);
};
