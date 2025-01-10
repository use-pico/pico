import { Progress, Table, Tx, useTable, withColumn } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";

export namespace Building_Queue_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		cycle: number;
		from: number;
		to: number;
		progress?: any;
	}
}

const column = withColumn<Building_Queue_Table.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 12,
	}),
	column({
		name: "cycle",
		header() {
			return <Tx label={"Building cycle (label)"} />;
		},
		render({ data }) {
			const diff = data.to - data.from;

			return (
				<div className={"flex flex-row gap-2 items-center"}>
					<div className={"font-bold"}>{data.cycle}</div>
					<div className={"text-slate-500"}>/</div>
					<div className={"text-sm"}>{diff}</div>
				</div>
			);
		},
		size: 8,
	}),
	column({
		name: "progress",
		header() {
			return <Tx label={"Progress (label)"} />;
		},
		render({ data }) {
			const diff = data.to - data.from;

			return (
				<Progress
					css={{
						progress: diff === data.cycle ? ["bg-emerald-500"] : undefined,
					}}
					value={(100 * data.cycle) / diff}
				/>
			);
		},
		size: 30,
	}),
];

export namespace Building_Queue_Table {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const Building_Queue_Table: FC<Building_Queue_Table.Props> = ({
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
