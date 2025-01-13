import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    Badge,
    Button,
    Icon,
    toast,
    Tx,
    useInvalidator,
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber, tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import { Dependencies } from "~/app/derivean/game/Dependencies";
import type { GameManager } from "~/app/derivean/game/manager/GameManager";
import { RequirementsInline } from "~/app/derivean/game/RequirementsInline";
import { Upgrades } from "~/app/derivean/game/Upgrades";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
import { withConstructionQueue } from "~/app/derivean/service/withConstructionQueue";
import { withProductionQueue } from "~/app/derivean/service/withProductionQueue";
import type { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";
import type { withBlueprintUpgradeGraph } from "~/app/derivean/utils/withBlueprintUpgradeGraph";

export namespace ConstructionCard {
	export interface Props extends Entity.Type<GameManager.Data> {
		userId: string;
		dependencies: withBlueprintGraph.Result;
		upgrades: withBlueprintUpgradeGraph.Result;
		inventory: InventorySchema["~entity-array"];
		buildingCounts: GameManager.BuildingCount[];
	}
}

export const ConstructionCard: FC<ConstructionCard.Props> = ({
	entity,
	userId,
	dependencies,
	upgrades,
	inventory,
	buildingCounts,
}) => {
	const { locale } = useParams({ from: "/$locale" });

	const invalidator = useInvalidator([
		["Building_Queue"],
		["Inventory"],
		["User_Inventory"],
	]);

	const mutation = useMutation({
		async mutationFn({ buildingBaseId }: { buildingBaseId: string }) {
			return toast.promise(
				withConstructionQueue({
					blueprintId: buildingBaseId,
					userId,
				}),
				withToastPromiseTx("Building queue"),
			);
		},
		async onSuccess() {
			await invalidator();
		},
	});

	const available =
		entity.withAvailableBuildings && entity.withAvailableResources;

	const isBuilt =
		(buildingCounts.find((item) => item.blueprintId === entity.id)?.count ||
			0) > 0;

	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"gap-2",
				"bg-slate-50",
				"border-slate-300",
				"rounded-lg",
				"p-4",
				"pt-2",
				"border",
				entity.withAvailableBuildings ? ["bg-amber-50"] : [],
				available ? ["bg-emerald-50"] : [],
				isBuilt ? ["shadow-md"] : [],
			])}
		>
			<div
				className={tvc([
					"flex",
					"flex-row",
					"gap-2",
					"justify-between",
					"border-b",
					"border-slate-300",
					"py-2",
				])}
			>
				<div
					className={tvc([
						"flex",
						"flex-row",
						"gap-4",
						"items-center",
						"font-bold",
						"text-lg",
					])}
				>
					<div className={tvc(["flex", "gap-6", "items-center"])}>
						{isBuilt ? null : (
							<div
								className={tvc([
									"flex",
									"flex-row",
									"gap-2",
									"items-center",
									"font-bold",
									"text-sm",
									"text-slate-500",
								])}
							>
								<Button
									iconEnabled={ConstructionIcon}
									iconDisabled={ConstructionIcon}
									variant={{
										variant: available ? "primary" : "subtle",
									}}
									onClick={() => {
										mutation.mutate({
											buildingBaseId: entity.id,
										});
									}}
									css={{
										base: ["px-8"],
									}}
									disabled={!available}
									loading={mutation.isPending}
								/>
							</div>
						)}
						<div className={"flex flex-row gap-2"}>
							{entity.name}
							<div
								className={tvc([
									"flex",
									"gap-2",
									"items-center",
									"text-slate-500",
								])}
							>
								<Icon
									variant={{ size: "xl" }}
									icon={CycleIcon}
								/>
								{toHumanNumber({ number: entity.cycles })}
							</div>
						</div>

						<Upgrades
							graph={upgrades}
							blueprintId={entity.id}
						/>
					</div>
				</div>
				<RequirementsInline
					textTitle={<Tx label={"Building requirements (title)"} />}
					textEmpty={<Tx label={"No requirements (label)"} />}
					requirements={entity.requirements}
					diff={inventory}
				/>
			</div>
			<Dependencies
				graph={dependencies}
				blueprintId={entity.id}
				buildingCounts={buildingCounts}
			/>
			{isBuilt ?
				<>
					<div
						className={tvc([
							"border",
							"border-slate-300",
							"rounded-md",
							"p-4",
							"mt-2",
						])}
					>
						{entity.production.map((item) => {
							const hasResources = item.requirements.every((requirement) => {
								const inventoryItem = inventory.find(
									(inv) => inv.resourceId === requirement.resourceId,
								);
								return (
									inventoryItem && inventoryItem.amount >= requirement.amount
								);
							});

							const isFull = item.queue.length >= item.limit;

							const invalidator = useInvalidator([
								["Management"],
								["Blueprint_Production"],
								["Production"],
								["Inventory"],
								["User_Inventory"],
							]);

							const available = hasResources && !isFull;

							const production = useMutation({
								mutationFn: async () => {
									if (!item.buildingId) {
										return false;
									}

									return toast.promise(
										withProductionQueue({
											userId,
											blueprintProductionId: item.id,
											buildingId: item.buildingId,
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
									key={`production-${item.id}-${item.blueprintId}`}
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
									<div
										className={tvc([
											"flex",
											"flex-row",
											"gap-2",
											"items-center",
										])}
									>
										<Button
											iconEnabled={
												item.queue.length > 0 ?
													"icon-[bi--bag-check]"
												:	ProductionIcon
											}
											iconDisabled={
												item.queue.length > 0 ?
													"icon-[bi--bag-check]"
												:	ProductionIcon
											}
											disabled={!available}
											variant={{
												variant:
													available || item.queue.length > 0 ?
														"primary"
													:	"subtle",
											}}
											css={{
												base: ["px-8"],
											}}
											loading={production.isPending}
											onClick={() => production.mutate()}
										/>
										{item.name}
										<Badge>x{toHumanNumber({ number: item.amount })}</Badge>
										<Icon icon={CycleIcon} />
										<div>{toHumanNumber({ number: item.cycles })}</div>
									</div>
									<div>
										<RequirementsInline
											requirements={item.requirements}
											diff={inventory}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</>
			:	null}
		</div>
	);
};
