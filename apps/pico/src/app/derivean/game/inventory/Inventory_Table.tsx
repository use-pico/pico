import { Progress, Table, Tx, useTable, withColumn } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";

export namespace Inventory_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		amount: number;
		limit: number;
		resourceId: string;
	}
}

const column = withColumn<Inventory_Table.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		filter: {
			path: "resourceId",
			onFilter({ data, filter }) {
				filter.shallow("resourceId", data.resourceId);
			},
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
		size: 18,
	}),
	column({
		name: "limit",
		header() {
			return <Tx label={"Inventory limit (label)"} />;
		},
		render({ value, data }) {
			return (
				<div className={"flex flex-row items-center gap-2 w-full"}>
					<div>{toHumanNumber({ number: value })}</div>
					<Progress value={(100 * data.amount) / data.limit} />
				</div>
			);
		},
		size: 14,
	}),
];

export namespace Inventory_Table {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const Inventory_Table: FC<Inventory_Table.Props> = ({
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
