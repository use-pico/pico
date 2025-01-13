import { useMutation } from "@tanstack/react-query";
import {
    Badge,
    Button,
    Icon,
    toast,
    useInvalidator,
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { GameManager } from "~/app/derivean/game/manager/GameManager";
import { RequirementsInline } from "~/app/derivean/game/RequirementsInline";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
import { withProductionQueue } from "~/app/derivean/service/withProductionQueue";

export namespace ProductionLine {
	export interface Props {
		userId: string;
		production: GameManager.Production;
		inventory: InventorySchema["~entity-array"];
	}
}

export const ProductionLine: FC<ProductionLine.Props> = ({
	userId,
	production,
	inventory,
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

	const isFull = production.queue.length >= production.limit;

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
				"flex-row",
				"gap-2",
				"items-center",
				"justify-between",
				"p-4",
				"rounded-md",
				"bg-blue-50",
				"border",
				"border-slate-100",
				"hover:bg-slate-100",
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
				<Icon icon={CycleIcon} />
				<div>{toHumanNumber({ number: production.cycles })}</div>
			</div>
			<div>
				<RequirementsInline
					requirements={production.requirements}
					diff={inventory}
				/>
			</div>
		</div>
	);
};
