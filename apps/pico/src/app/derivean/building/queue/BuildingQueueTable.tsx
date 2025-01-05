import { Table, Tx, useTable, withColumn } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingQueueSchema } from "~/app/derivean/building/queue/BuildingQueueSchema";

const column = withColumn<BuildingQueueSchema["~output"]>();

const columns = [
	column({
		name: "baseBuilding.name",
		header() {
			return <Tx label={"Base building name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 14,
	}),
	column({
		name: "start",
		header() {
			return <Tx label={"Building queue - started (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 14,
	}),
	column({
		name: "current",
		header() {
			return <Tx label={"Building queue - current (label)"} />;
		},
		render({ data, value }) {
			return (
				<div className={"flex flex-row gap-2 items-center"}>
					<div className={"font-bold"}>{toHumanNumber({ number: value })}</div>/
					<div className={"text-sm text-slate-600"}>
						{data.baseBuilding.cycles}
					</div>
				</div>
			);
		},
		size: 14,
	}),
	column({
		name: "finish",
		header() {
			return <Tx label={"Building queue - finish (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 14,
	}),
];

export namespace BuildingQueueTable {
	export interface Props extends Table.PropsEx<BuildingQueueSchema["~output"]> {
		//
	}
}

export const BuildingQueueTable: FC<BuildingQueueTable.Props> = ({
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
