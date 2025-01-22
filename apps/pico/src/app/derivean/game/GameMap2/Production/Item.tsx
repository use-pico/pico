import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Badge, Button, LinkTo, useInvalidator } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { ProductionPanel } from "~/app/derivean/game/GameMap2/Production/ProductionPanel";
import { CyclesInline } from "~/app/derivean/ui/CyclesInline";

export namespace Item {
	export interface Props {
		building: ProductionPanel.Building;
		production: ProductionPanel.Production;
	}
}

export const Item: FC<Item.Props> = ({ building, production }) => {
	const { locale } = useParams({ from: "/$locale" });
	const invalidator = useInvalidator([["GameMap"]]);
	const productionMutation = useMutation({
		async mutationFn({
			blueprintProductionId,
			buildingId,
		}: {
			blueprintProductionId: string;
			buildingId: string;
		}) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.updateTable("Building")
					.set({
						productionId: blueprintProductionId,
					})
					.where("id", "=", buildingId)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const recurringProductionMutation = useMutation({
		async mutationFn({
			blueprintProductionId,
			buildingId,
		}: {
			blueprintProductionId: string;
			buildingId: string;
		}) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.updateTable("Building")
					.set({
						recurringProductionId: blueprintProductionId,
					})
					.where("id", "=", buildingId)
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
					iconDisabled={"icon-[tabler--basket]"}
					loading={productionMutation.isPending}
					disabled={building.productionId === production.id}
					onClick={() => {
						productionMutation.mutate({
							blueprintProductionId: production.id,
							buildingId: building.id,
						});
					}}
				/>
				<Button
					iconEnabled={"icon-[oui--refresh]"}
					iconDisabled={"icon-[tabler--basket]"}
					loading={recurringProductionMutation.isPending}
					disabled={building.recurringProductionId === production.id}
					onClick={() => {
						recurringProductionMutation.mutate({
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
