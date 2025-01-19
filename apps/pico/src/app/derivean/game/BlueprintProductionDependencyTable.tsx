import { useParams } from "@tanstack/react-router";
import {
    LinkTo,
    Table,
    Tx,
    useTable,
    withColumn
} from "@use-pico/client";
import { type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

export namespace BlueprintProductionDependencyTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		blueprintId: string;
	}
}

const column = withColumn<BlueprintProductionDependencyTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Required building (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					icon={BlueprintIcon}
					to={"/$locale/apps/derivean/root/blueprint/$id/view"}
					params={{ locale, id: data.blueprintId }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 22,
	}),
];

export namespace BlueprintProductionDependencyTable {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const BlueprintProductionDependencyTable: FC<
	BlueprintProductionDependencyTable.Props
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
