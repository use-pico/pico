import {
    BoolInline,
    Table,
    Tx,
    useTable,
    withColumn
} from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";

export namespace BlueprintProductionRequirementTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		resourceId: string;
		amount: number;
		passive: boolean;
	}
}

const column = withColumn<BlueprintProductionRequirementTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Requirement name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		filter: {
			path: "resourceId",
			onFilter({ data, filter }) {
				filter.shallow("resourceID", data.resourceId);
			},
		},
		size: 12,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "passive",
		header() {
			return <Tx label={"Passive requirement (label)"} />;
		},
		render({ value }) {
			return <BoolInline value={value} />;
		},
		size: 10,
	}),
];

export namespace BlueprintProductionRequirementTable {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const BlueprintProductionRequirementTable: FC<
	BlueprintProductionRequirementTable.Props
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