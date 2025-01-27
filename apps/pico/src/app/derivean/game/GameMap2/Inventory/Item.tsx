import { useMutation } from "@tanstack/react-query";
import { Button, Progress, useInvalidator } from "@use-pico/client";
import { genId, toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { InventoryPanel } from "~/app/derivean/game/GameMap2/Inventory/InventoryPanel";
import { PackageIcon } from "~/app/derivean/icon/PackageIcon";
import { SupplyIcon } from "~/app/derivean/icon/SupplyIcon";

export namespace Item {
	export interface Props {
		inventory: InventoryPanel.Inventory;
	}
}

export const Item: FC<Item.Props> = ({ inventory }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const toggleDemandMutation = useMutation({
		async mutationFn({
			buildingId,
			resourceId,
			supplyId,
		}: {
			buildingId: string;
			resourceId: string;
			supplyId?: string | null;
		}) {
			return kysely.transaction().execute(async (tx) => {
				if (supplyId) {
					return tx.deleteFrom("Supply").where("id", "=", supplyId).execute();
				}
				return tx
					.insertInto("Supply")
					.values({
						id: genId(),
						buildingId,
						resourceId,
					})
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

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
				inventory.limit > 0 && inventory.amount >= inventory.limit ?
					[
						"border-amber-400",
						"bg-amber-50",
						"hover:bg-amber-50",
						"hover:border-amber-600",
					]
				:	undefined,
			])}
		>
			<div className={"flex flex-row items-center justify-between"}>
				<div className={"flex flex-row gap-2 items-center"}>
					<Button
						iconEnabled={inventory.supplyId ? SupplyIcon : PackageIcon}
						loading={toggleDemandMutation.isPending}
						onClick={() => {
							toggleDemandMutation.mutate({
								buildingId: inventory.buildingId,
								resourceId: inventory.resourceId,
								supplyId: inventory.supplyId,
							});
						}}
						variant={{ variant: "subtle" }}
					/>
					<div className={"font-bold"}>{inventory.name}</div>
				</div>
				{toHumanNumber({ number: inventory.amount })} /{" "}
				{toHumanNumber({ number: inventory.limit })}
			</div>
			{inventory.limit > 0 ?
				<Progress
					variant={{ size: "md" }}
					value={(100 * inventory.amount) / inventory.limit}
					css={{
						progress:
							inventory.amount >= inventory.limit ?
								["bg-amber-500"]
							:	undefined,
					}}
				/>
			:	null}
		</div>
	);
};
