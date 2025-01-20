import { useParams } from "@tanstack/react-router";
import { LinkTo, Table, Tx, useTable, withColumn } from "@use-pico/client";
import { type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

export namespace BlueprintConflictTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		blueprintId: string;
		conflictId: string;
	}
}

const column = withColumn<BlueprintConflictTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Conflict building (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					icon={BlueprintIcon}
					to={"/$locale/apps/derivean/game/management/blueprint/$id/conflicts"}
					params={{ locale, id: data.conflictId }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 22,
	}),
];

export namespace BlueprintConflictTable {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const BlueprintConflictTable: FC<BlueprintConflictTable.Props> = ({
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
