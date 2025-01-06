import { Table, Tx, useTable, withColumn } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import type { BaseBuildingProductionSchema } from "~/app/derivean/building/base/production/BaseBuildingProductionSchema";
import { ResourceInline } from "~/app/derivean/resource/ResourceInline";

const column = withColumn<BaseBuildingProductionSchema["~output"]>();

const columns = [
	column({
		name: "resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 18,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 14,
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
			return <Tx label={"Resource requirements (label)"} />;
		},
		render({ value }) {
			return <ResourceInline resources={value} />;
		},
	}),
];

export namespace BaseBuildingProductionTable {
	export interface Props
		extends Table.PropsEx<BaseBuildingProductionSchema["~output"]> {
		//
	}
}

export const BaseBuildingProductionTable: FC<
	BaseBuildingProductionTable.Props
> = ({ table, ...props }) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			{...props}
		/>
	);
};
