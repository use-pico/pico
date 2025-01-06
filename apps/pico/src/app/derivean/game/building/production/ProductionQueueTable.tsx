import { Table, Tx, useTable, withColumn } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingProductionQueueSchema } from "~/app/derivean/building/production/BuildingProductionQueueSchema";

const column = withColumn<BuildingProductionQueueSchema["~output"]>();

const columns = [
	column({
		name: "resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 14,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 12,
	}),
	column({
		name: "current",
		header() {
			return <Tx label={"Cycle - current (label)"} />;
		},
		render({ data, value }) {
			return (
				<div className={"flex flex-row gap-2 items-center"}>
					<div className={"font-bold"}>{toHumanNumber({ number: value })}</div>/
					<div className={"text-sm text-slate-600"}>
						{toHumanNumber({ number: data.finish - data.start })}
					</div>
				</div>
			);
		},
		size: 10,
	}),
	column({
		name: "start",
		header() {
			return <Tx label={"Cycle - started (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "finish",
		header() {
			return <Tx label={"Cycle - finish (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
];

export namespace ProductionQueueTable {
	export interface Props
		extends Table.PropsEx<BuildingProductionQueueSchema["~output"]> {
		//
	}
}

export const ProductionQueueTable: FC<ProductionQueueTable.Props> = ({
	table,
	...props
}) => {
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
