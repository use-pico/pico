import {
	Button,
	Table,
	Tx,
	useCountQuery,
	useTable,
	withColumn,
} from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import type { BaseBuildingProductionSchema } from "~/app/derivean/building/base/production/BaseBuildingProductionSchema";
import { BuildingProductionQueueSource } from "~/app/derivean/building/production/BuildingProductionQueueSource";
import { useProductionMutation } from "~/app/derivean/building/production/useProductionMutation";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { inventoryCheck } from "~/app/derivean/inventory/inventoryCheck";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import { ResourceInline } from "~/app/derivean/resource/ResourceInline";

interface Context {
	buildingId: string;
	userId: string;
	inventory: InventorySchema["~output-array"];
}

const column = withColumn<BaseBuildingProductionSchema["~output"], Context>();

const columns = [
	column({
		name: "resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ data, value, context: { inventory, buildingId, userId } }) {
			const mutation = useProductionMutation();
			const { check } = inventoryCheck({
				inventory,
				requirements: data.requirements,
			});
			const limit = useCountQuery({
				source: BuildingProductionQueueSource,
				filter: {
					baseBuildingProductionId: data.id,
				},
			});

			const available =
				check && limit.isSuccess ? limit.data.filter < data.limit : false;

			return (
				<Button
					iconEnabled={ProductionIcon}
					iconDisabled={ProductionIcon}
					variant={{
						variant: available ? "primary" : "subtle",
					}}
					onClick={() => {
						mutation.mutate({
							baseBuildingProductionId: data.id,
							buildingId,
							userId,
						});
					}}
					disabled={!available}
					loading={mutation.isPending || limit.isLoading}
					css={{
						base: ["w-full"],
					}}
				>
					{value}
				</Button>
			);
		},
		size: 18,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Cycle count (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 14,
	}),
	column({
		name: "requirements",
		header() {
			return <Tx label={"Required resources (label)"} />;
		},
		render({ value, context: { inventory } }) {
			const { missing } = inventoryCheck({ inventory, requirements: value });

			return (
				<ResourceInline
					textTitle={<Tx label={"Resource requirements (title)"} />}
					resources={value}
					diff={missing}
					limit={5}
				/>
			);
		},
		size: 72,
	}),
];

export namespace ProductionTable {
	export interface Props
		extends Table.PropsEx<BaseBuildingProductionSchema["~output"], Context> {
		inventory: InventorySchema["~output-array"];
		buildingId: string;
		userId: string;
	}
}

export const ProductionTable: FC<ProductionTable.Props> = ({
	table,
	inventory,
	buildingId,
	userId,
	...props
}) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
				context: {
					inventory,
					buildingId,
					userId,
				},
			})}
			{...props}
		/>
	);
};
