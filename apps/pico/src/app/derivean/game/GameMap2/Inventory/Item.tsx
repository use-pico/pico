import { Progress } from "@use-pico/client";
import { tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import type { InventoryPanel } from "~/app/derivean/game/GameMap2/Inventory/InventoryPanel";

export namespace Item {
	export interface Props extends Entity.Type<InventoryPanel.Data> {
		//
	}
}

export const Item: FC<Item.Props> = ({ entity }) => {
	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"gap-2",
				"rounded-md",
				"border",
				"border-slate-300",
				"p-2",
				"cursor-default",
				"hover:bg-slate-100",
			])}
		>
			<div className={"font-bold"}>{entity.name}</div>
			{entity.limit > 0 ?
				<Progress
					variant={{ size: "md" }}
					value={(100 * entity.amount) / entity.limit}
				/>
			:	null}
		</div>
	);
};
