import { useMutation } from "@tanstack/react-query";
import {
    Button,
    Icon,
    Progress,
    TrashIcon,
    Tx,
    useInvalidator,
} from "@use-pico/client";
import { genId, toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { InventoryPanel } from "~/app/derivean/game/GameMap2/Inventory/InventoryPanel";
import { DemandIcon } from "~/app/derivean/icon/DemandIcon";
import { SupplyIcon } from "~/app/derivean/icon/SupplyIcon";

export namespace Item {
	export interface Props {
		mapId: string;
		userId: string;
		inventory: InventoryPanel.Inventory;
	}
}

export const Item: FC<Item.Props> = ({ mapId, userId, inventory }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const toggleSupplyMutation = useMutation({
		async mutationFn({
			buildingId,
			resourceId,
			supplyId,
			mapId,
			userId,
		}: {
			buildingId: string;
			resourceId: string;
			mapId: string;
			userId: string;
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
						mapId,
						userId,
					})
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const toggleDemandMutation = useMutation({
		async mutationFn({
			buildingId,
			resourceId,
			demandId,
			mapId,
			userId,
		}: {
			buildingId: string;
			resourceId: string;
			demandId?: string | null;
			mapId: string;
			userId: string;
		}) {
			return kysely.transaction().execute(async (tx) => {
				if (demandId) {
					return tx.deleteFrom("Demand").where("id", "=", demandId).execute();
				}
				return tx
					.insertInto("Demand")
					.values({
						id: genId(),
						buildingId,
						resourceId,
						mapId,
						userId,
						amount:
							inventory.limit > 0 ? inventory.limit - inventory.amount : 1,
						priority: 0,
						type: "storage",
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
				inventory.supplyId || inventory.demandId ?
					[
						"bg-purple-50",
						"border-purple-400",
						"hover:bg-purple-50",
						"hover:border-purple-400",
					]
				:	undefined,
			])}
		>
			<div className={"flex flex-row items-center justify-between"}>
				<div
					className={tvc([
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						inventory.supplyId || inventory.demandId ?
							["text-purple-600"]
						:	undefined,
					])}
				>
					<div className={"font-bold"}>{inventory.name}</div>
					{inventory.supplyId ?
						<Icon icon={SupplyIcon} />
					:	null}
					{inventory.demandId ?
						<Icon icon={DemandIcon} />
					:	null}
				</div>
				{toHumanNumber({ number: inventory.amount })} /{" "}
				{toHumanNumber({ number: inventory.limit })}
			</div>
			<div className={"flex flex-row gap-2 items-center justify-between"}>
				<Button
					iconEnabled={inventory.supplyId ? TrashIcon : SupplyIcon}
					loading={toggleSupplyMutation.isPending}
					onClick={() => {
						toggleSupplyMutation.mutate({
							mapId,
							userId,
							buildingId: inventory.buildingId,
							resourceId: inventory.resourceId,
							supplyId: inventory.supplyId,
						});
					}}
					variant={{ variant: "subtle" }}
				>
					{inventory.supplyId ?
						<Tx label={"Cancel supply (label)"} />
					:	<Tx label={"Supply resource (label)"} />}
				</Button>

				<Button
					iconEnabled={inventory.demandId ? TrashIcon : DemandIcon}
					loading={toggleDemandMutation.isPending}
					onClick={() => {
						toggleDemandMutation.mutate({
							mapId,
							userId,
							buildingId: inventory.buildingId,
							resourceId: inventory.resourceId,
							demandId: inventory.demandId,
						});
					}}
					variant={{ variant: "subtle" }}
				>
					{inventory.demandId ?
						<Tx label={"Cancel demand (label)"} />
					:	<Tx label={"Demand resource (label)"} />}
				</Button>
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
