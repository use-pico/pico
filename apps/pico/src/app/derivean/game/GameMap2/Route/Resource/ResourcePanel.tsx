import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { InventoryItem } from "~/app/derivean/game/GameMap2/Route/Resource/InventoryItem";
import { Item } from "~/app/derivean/game/GameMap2/Route/Resource/Item";
import type { BlueprintInventorySchema } from "~/app/derivean/game/GameMap2/schema/BlueprintInventorySchema";
import type { RouteResourceSchema } from "~/app/derivean/game/GameMap2/schema/RouteResourceSchema";
import type { RouteSchema } from "~/app/derivean/game/GameMap2/schema/RouteSchema";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace ResourcePanel {
	export interface Props extends Panel.PropsEx, Entity.Schema<RouteSchema> {
		resource: RouteResourceSchema.Type[];
		inventory: BlueprintInventorySchema.Type[];
	}
}

export const ResourcePanel: FC<ResourcePanel.Props> = ({
	entity,
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
				<div className={"flex flex-row gap-2 items-center"}>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/building/$id/routes"}
						params={{ locale, id: entity.fromId }}
					/>
					{entity.fromName}
				</div>
			}
			{...props}
		>
			<div>
				{resource.length > 0 ?
					resource.map((item) => {
						return (
							<Item
								key={item.id}
								entity={item}
							/>
						);
					})
				:	<Tx label={"No route resources yet (label)"} />}
			</div>
			<div className={"border-b border-slate-300 shadow-md"} />
			<div>
				{inventory.length > 0 ?
					inventory.map((item) => {
						return (
							<InventoryItem
								key={item.id}
								entity={item}
							/>
						);
					})
				:	<Tx label={"There are no available items for transport (label)"} />}
			</div>
		</Panel>
	);
};
