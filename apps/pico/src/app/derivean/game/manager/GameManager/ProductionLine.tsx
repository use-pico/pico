import { useMutation } from "@tanstack/react-query";
import { Badge, Button, Progress, useInvalidator } from "@use-pico/client";
import { genId, toHumanNumber, tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { RequirementsInline } from "~/app/derivean/game/RequirementsInline";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
import { withProductionQueue } from "~/app/derivean/service/withProductionQueue";
import { CyclesInline } from "~/app/derivean/ui/CyclesInline";

export namespace ProductionLine {
	export interface Props extends Entity.Schema<MapSchema> {
		userId: string;
		production: MapSchema.Type["production"][number];
		inventory: InventorySchema["~entity-array"];
	}
}

export const ProductionLine: FC<ProductionLine.Props> = ({
	entity,
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

	const queue = production.queue.find(
		(queue) => (queue.blueprintProductionId = production.id),
	);

	const available =
		production.withAvailableResources &&
		!production.isFull &&
		entity.productionAvailable;

	const productionMutation = useMutation({
		async mutationFn() {
			return kysely.transaction().execute(async (tx) => {
				if (!production.buildingId) {
					return;
				}

				return withProductionQueue({
					tx,
					userId,
					blueprintProductionId: production.id,
					buildingId: production.buildingId,
				});
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const productionQueueMutation = useMutation({
		async mutationFn() {
			return kysely.transaction().execute(async (tx) => {
				if (!production.buildingId) {
					return;
				}

				await tx
					.deleteFrom("Production_Queue")
					.where("buildingId", "=", production.buildingId)
					.where("userId", "=", userId)
					.execute();

				return tx
					.insertInto("Production_Queue")
					.values({
						id: genId(),
						userId,
						blueprintProductionId: production.id,
						buildingId: production.buildingId,
						count: 0,
						limit: 0,
						priority: 100,
						paused: false,
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
				"p-4",
				"rounded-md",
				"border",
				"border-slate-300",
				available ? ["hover:bg-slate-50", "hover:border-slate-400"] : undefined,
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
				<div className={"flex flex-row gap-2 items-center"}>
					<Button
						iconEnabled={"icon-[hugeicons--queue-02]"}
						iconDisabled={ProductionIcon}
						onClick={() => {
							productionQueueMutation.mutate();
						}}
						disabled={production.inQueue}
						loading={productionQueueMutation.isPending}
						variant={{ variant: "subtle" }}
					/>
					<CyclesInline cycles={production.cycles} />
				</div>
			</div>
			<div className={"flex flex-row items-center gap-2"}>
				<RequirementsInline
					requirements={production.requirements}
					diff={inventory}
				/>
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
