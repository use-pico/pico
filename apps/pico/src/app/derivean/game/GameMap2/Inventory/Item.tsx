import { Progress } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
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
				inventory.amount >= inventory.limit ?
					["border-red-400", "hover:border-red-600", "hover:bg-red-50"]
				:	undefined,
			])}
		>
			<div className={"flex flex-row items-center justify-between"}>
				<div className={"font-bold"}>{inventory.name}</div>
				{toHumanNumber({ number: inventory.amount })} /{" "}
				{toHumanNumber({ number: inventory.limit })}
			</div>
			{inventory.limit > 0 ?
				<Progress
					variant={{ size: "md" }}
					value={(100 * inventory.amount) / inventory.limit}
					css={{
						progress:
							inventory.amount >= inventory.limit ? ["bg-red-500"] : undefined,
					}}
				/>
			:	null}
		</div>
	);
};
