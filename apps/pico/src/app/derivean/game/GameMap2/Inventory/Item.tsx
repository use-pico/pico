import { Progress } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import type { InventoryPanel } from "~/app/derivean/game/GameMap2/Inventory/InventoryPanel";

export namespace Item {
	export interface Props {
		inventory: InventoryPanel.Inventory;
	}
}

export const Item: FC<Item.Props> = ({ inventory }) => {
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
			<div className={"font-bold"}>{inventory.name}</div>
			{inventory.limit > 0 ?
				<Progress
					variant={{ size: "md" }}
					value={(100 * inventory.amount) / inventory.limit}
				/>
			:	null}
		</div>
	);
};
