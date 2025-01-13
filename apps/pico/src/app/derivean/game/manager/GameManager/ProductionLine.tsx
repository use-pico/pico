import { useMutation } from "@tanstack/react-query";
import {
    Badge,
    Button,
    Progress,
    toast,
    useInvalidator,
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { GameManager } from "~/app/derivean/game/manager/GameManager";
import { RequirementsInline } from "~/app/derivean/game/RequirementsInline";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
import { withProductionQueue } from "~/app/derivean/service/withProductionQueue";
import { CyclesInline } from "~/app/derivean/ui/CyclesInline";

export namespace ProductionLine {
	export interface Props {
		userId: string;
		production: GameManager.Production;
		inventory: InventorySchema["~entity-array"];
		isProductionLimit: boolean;
	}
}

export const ProductionLine: FC<ProductionLine.Props> = ({
	userId,
	production,
	inventory,
	isProductionLimit,
}) => {
	const invalidator = useInvalidator([
		["Management"],
		["Blueprint_Production"],
		["Production"],
		["Inventory"],
		["User_Inventory"],
	]);

	const hasResources = production.requirements.every((requirement) => {
		const inventoryItem = inventory.find(
			(inv) => inv.resourceId === requirement.resourceId,
		);
		return inventoryItem && inventoryItem.amount >= requirement.amount;
	});

	const isFull =
		production.queue.length >= production.limit || isProductionLimit;

	const queue = production.queue.find(
		(queue) => (queue.blueprintProductionId = production.id),
	);

	const available = hasResources && !isFull;

	const productionMutation = useMutation({
		mutationFn: async () => {
			if (!production.buildingId) {
				return false;
			}

			return toast.promise(
				withProductionQueue({
					userId,
					blueprintProductionId: production.id,
					buildingId: production.buildingId,
				}),
				withToastPromiseTx("Resource production queue"),
			);
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
				"p-4",
				"rounded-md",
				"border",
				"border-slate-300",
				"hover:border-slate-500",
			])}
		>
			<div
				className={tvc([
					"flex",
					"flex-row",
					"flex-1",
					"gap-2",
					"items-center",
					"justify-between",
				])}
			>
				<div className={tvc(["flex", "flex-row", "gap-2", "items-center"])}>
					<Button
						iconEnabled={
							production.queue.length > 0 ?
								"icon-[bi--bag-check]"
							:	ProductionIcon
						}
						iconDisabled={
							production.queue.length > 0 ?
								"icon-[bi--bag-check]"
							:	ProductionIcon
						}
						disabled={!available}
						variant={{
							variant:
								available || production.queue.length > 0 ? "primary" : "subtle",
						}}
						css={{
							base: ["px-8"],
						}}
						loading={productionMutation.isPending}
						onClick={() => productionMutation.mutate()}
					/>
					{production.name}
					<Badge>x{toHumanNumber({ number: production.amount })}</Badge>
				</div>
				<div className={"flex flex-row items-center gap-2"}>
					<CyclesInline cycles={production.cycles} />
					<RequirementsInline
						requirements={production.requirements}
						diff={inventory}
					/>
				</div>
			</div>
			{queue ?
				<Progress
					variant={{ size: "md" }}
					value={(100 * queue.cycle) / (queue.to - queue.from)}
				/>
			:	null}
		</div>
	);
};
