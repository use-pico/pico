import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Badge, Button, LinkTo, useInvalidator } from "@use-pico/client";
import { DateTime, genId, toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { ProductionPanel } from "~/app/derivean/game/GameMap2/Production/ProductionPanel";
import { CyclesInline } from "~/app/derivean/ui/CyclesInline";

export namespace Item {
	export interface Props {
		userId: string;
		building: ProductionPanel.Building;
		production: ProductionPanel.Production;
	}
}

export const Item: FC<Item.Props> = ({ userId, building, production }) => {
	const { locale } = useParams({ from: "/$locale" });
	const invalidator = useInvalidator([["GameMap"]]);
	const singleProductionQueueMutation = useMutation({
		async mutationFn({
			userId,
			blueprintProductionId,
			buildingId,
		}: {
			userId: string;
			blueprintProductionId: string;
			buildingId: string;
		}) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.insertInto("Production_Queue")
					.values({
						id: genId(),
						userId,
						blueprintProductionId,
						buildingId,
						count: 0,
						limit: 1,
						paused: false,
						priority: DateTime.now().toUnixInteger(),
					})
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const recurringProductionQueueMutation = useMutation({
		async mutationFn({
			userId,
			blueprintProductionId,
			buildingId,
		}: {
			userId: string;
			blueprintProductionId: string;
			buildingId: string;
		}) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.insertInto("Production_Queue")
					.values({
						id: genId(),
						userId,
						blueprintProductionId,
						buildingId,
						count: 0,
						limit: 0,
						paused: false,
						priority: 0,
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
				"flex-row",
				"gap-2",
				"items-center",
				"justify-between",
				"border",
				"p-4",
				"rounded",
				"border-slate-200",
				"hover:border-slate-300",
				"hover:bg-slate-100",
			])}
		>
			<div className={"flex flex-row gap-2 items-center"}>
				<Button
					iconEnabled={"icon-[solar--play-outline]"}
					loading={singleProductionQueueMutation.isPending}
					onClick={() => {
						singleProductionQueueMutation.mutate({
							userId,
							blueprintProductionId: production.id,
							buildingId: building.id,
						});
					}}
				>
					<Badge css={{ base: ["bg-blue-400"] }}>
						x{toHumanNumber({ number: production.count })}
					</Badge>
				</Button>
				<Button
					iconEnabled={"icon-[oui--refresh]"}
					loading={recurringProductionQueueMutation.isPending}
					onClick={() => {
						recurringProductionQueueMutation.mutate({
							userId,
							blueprintProductionId: production.id,
							buildingId: building.id,
						});
					}}
				/>

				<LinkTo
					to={
						"/$locale/apps/derivean/map/building/$id/production/$productionId/requirements"
					}
					params={{ locale, id: building.id, productionId: production.id }}
				>
					{production.name}
					<Badge>x{toHumanNumber({ number: production.amount })}</Badge>
				</LinkTo>
			</div>

			<CyclesInline cycles={production.cycles} />
		</div>
	);
};
