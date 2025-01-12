import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    Button,
    Icon,
    toast,
    Tx,
    useInvalidator,
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber, tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import { BlueprintDependenciesInline } from "~/app/derivean/game/BlueprintDependenciesInline";
import { Dependencies } from "~/app/derivean/game/Dependencies";
import type { GameManager } from "~/app/derivean/game/manager/GameManager";
import { RequirementsInline } from "~/app/derivean/game/RequirementsInline";
import { Upgrades } from "~/app/derivean/game/Upgrades";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
import { withConstructionQueue } from "~/app/derivean/service/withConstructionQueue";
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
				"shadow-md",
				entity.withAvailableBuildings ? ["bg-amber-50"] : [],
				available ? ["bg-emerald-50"] : [],
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
						disabled={!available}
						loading={mutation.isPending}
					/>
				</div>
			</div>
			<div className={"flex flex-col gap-2"}>
				<div>
					<Dependencies
						graph={dependencies}
						blueprintId={entity.id}
                        buildingCounts={buildingCounts}
					/>
				</div>

				<div className={"border-b border-slate-300"} />

				<div>
					<BlueprintDependenciesInline
						textTitle={<Tx label={"Building requirements (title)"} />}
						textEmpty={<Tx label={"No requirements (label)"} />}
						dependencies={entity.dependencies}
						diff={buildingCounts}
					/>
				</div>

				<div className={"border-b border-slate-300"} />

				<div>
					<RequirementsInline
						textTitle={<Tx label={"Building requirements (title)"} />}
						textEmpty={<Tx label={"No requirements (label)"} />}
						requirements={entity.requirements}
						diff={inventory}
					/>
				</div>
			</div>
		</div>
	);
};
