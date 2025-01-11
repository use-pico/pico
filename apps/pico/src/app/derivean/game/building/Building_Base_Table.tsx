import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    Button,
    LinkTo,
    Table,
    toast,
    Tx,
    useInvalidator,
    useTable,
    withColumn,
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber, tvc, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { withConstructionQueue } from "~/app/derivean/building/withConstructionQueue";
import { Building_Requirement_Inline } from "~/app/derivean/game/building/Building_Requirement_Inline";
import { Dependencies } from "~/app/derivean/game/building/Dependencies";
import { RequirementsInline } from "~/app/derivean/game/resource/RequirementsInline";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import type { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";
import type { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";
import type { Inventory_Schema } from "~/app/derivean/schema/inventory/Inventory_Schema";
import type { withBuildingGraph } from "~/app/derivean/utils/withBuildingGraph";

export namespace Building_Base_Table {
	export interface BuildingCount {
		buildingBaseId: string;
		count: number;
		name: string;
	}

	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
		withAvailableBuildings: boolean;
		withAvailableResources: boolean;
		requiredResources: (Building_Base_Resource_Requirement_Schema["~entity"] & {
			name: string;
		})[];
		requiredBuildings: (Building_Base_Building_Base_Requirement_Schema["~entity"] & {
			name: string;
		})[];
	}

	export interface Context {
		userId: string;
		graph: withBuildingGraph.Result;
		inventory: Inventory_Schema["~entity-array"];
		buildingCounts: BuildingCount[];
	}
}

const column = withColumn<
	Building_Base_Table.Data,
	Building_Base_Table.Context
>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ data, value, context: { userId } }) {
			const { locale } = useParams({ from: "/$locale" });
			const invalidator = useInvalidator([["Building_Queue"]]);
			const mutation = useMutation({
				async mutationFn({ buildingBaseId }: { buildingBaseId: string }) {
					return toast.promise(
						withConstructionQueue({
							buildingBaseId,
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
				data.withAvailableBuildings && data.withAvailableResources;

			return (
				<div className={tvc(["w-full", "flex", "gap-2", "items-center"])}>
					<Button
						iconEnabled={BuildingIcon}
						iconDisabled={BuildingIcon}
						variant={{
							variant: available ? "primary" : "subtle",
						}}
						onClick={() => {
							mutation.mutate({
								buildingBaseId: data.id,
							});
						}}
						disabled={!available}
						loading={mutation.isPending}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/game/building/base/$id/view"}
						params={{ locale, id: data.id }}
					>
						{value}
					</LinkTo>
				</div>
			);
		},
		size: 16,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Construction cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 8,
	}),
	column({
		name: "requiredResources",
		header() {
			return <Tx label={"Required resources (label)"} />;
		},
		render({ value, context: { inventory } }) {
			return (
				<RequirementsInline
					textTitle={<Tx label={"Building requirements (title)"} />}
					textEmpty={<Tx label={"No requirements (label)"} />}
					requirements={value}
					diff={inventory}
					limit={5}
				/>
			);
		},
		size: 64,
	}),
	column({
		name: "requiredBuildings",
		header() {
			return <Tx label={"Required buildings (label)"} />;
		},
		render({ data, value, context: { graph, buildingCounts } }) {
			return (
				<div className={"flex flex-col gap-2 items-start justify-center"}>
					<Building_Requirement_Inline
						textTitle={<Tx label={"Building requirements (title)"} />}
						textEmpty={<Tx label={"No requirements (label)"} />}
						requirements={value}
						diff={buildingCounts}
						limit={5}
					/>
					{graph ?
						<Dependencies
							graph={graph}
							mode={"dependants"}
							buildingBaseId={data.id}
							buildingCounts={buildingCounts}
						/>
					:	null}
				</div>
			);
		},
		size: 64,
	}),
];

export namespace Building_Base_Table {
	export interface Props extends Table.PropsEx<Data, Context> {
		userId: string;
		graph: withBuildingGraph.Result;
		inventory: Inventory_Schema["~entity-array"];
		buildingCounts: BuildingCount[];
	}
}

export const Building_Base_Table: FC<Building_Base_Table.Props> = ({
	userId,
	graph,
	inventory,
	buildingCounts,
	table,
	...props
}) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
				context: {
					userId,
					graph,
					inventory,
					buildingCounts,
				},
			})}
			{...props}
		/>
	);
};
