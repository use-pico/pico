import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    Button,
    Icon,
    LinkTo,
    toast,
    Tx,
    useInvalidator,
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber, tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import { Building_Requirement_Inline } from "~/app/derivean/game/building/Building_Requirement_Inline";
import { Dependencies } from "~/app/derivean/game/building/Dependencies";
import type { GameManager } from "~/app/derivean/game/manager/GameManager";
import { RequirementsInline } from "~/app/derivean/game/resource/RequirementsInline";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";
import type { Inventory_Schema } from "~/app/derivean/schema/InventorySchema";
import { withConstructionQueue } from "~/app/derivean/service/withConstructionQueue";

export namespace ConstructionCard {
	export interface Props extends Entity.Type<GameManager.Data> {
		userId: string;
		graph: withBuildingGraph.Result;
		inventory: Inventory_Schema["~entity-array"];
		buildingCounts: GameManager.BuildingCount[];
	}
}

export const ConstructionCard: FC<ConstructionCard.Props> = ({
	entity,
	userId,
	graph,
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
						"gap-2",
						"items-center",
						"font-bold",
						"text-lg",
					])}
				>
					<div className={tvc(["flex", "gap-2", "items-center"])}>
						<LinkTo
							icon={BuildingIcon}
							to={"/$locale/apps/derivean/game/building/base/$id/view"}
							params={{ locale, id: entity.id }}
						>
							{entity.name}
						</LinkTo>
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
			<div>
				<div className={tvc(["border-b", "border-slate-300", "pb-2"])}>
					<Dependencies
						graph={graph}
						mode={"dependants"}
						buildingBaseId={entity.id}
						buildingCounts={buildingCounts}
					/>
				</div>
				<div className={tvc(["border-b", "border-slate-300", "py-2"])}>
					<Building_Requirement_Inline
						textTitle={<Tx label={"Building requirements (title)"} />}
						textEmpty={<Tx label={"No requirements (label)"} />}
						requirements={entity.requiredBuildings}
						diff={buildingCounts}
					/>
				</div>
				<div className={tvc(["pt-2"])}>
					<RequirementsInline
						textTitle={<Tx label={"Building requirements (title)"} />}
						textEmpty={<Tx label={"No requirements (label)"} />}
						requirements={entity.requiredResources}
						diff={inventory}
					/>
				</div>
			</div>
		</div>
	);
};
