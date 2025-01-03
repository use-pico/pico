import { useParams } from "@tanstack/react-router";
import { LinkTo, Table, Tx, useTable, withColumn } from "@use-pico/client";
import type { FC } from "react";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";

const column = withColumn<BuildingSchema["~output"]>();

const columns = [
	column({
		name: "baseBuilding.name",
		header() {
			return <Tx label={"Base building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/game/building/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 14,
	}),
];

export namespace BuildingTable {
	export interface Props extends Table.PropsEx<BuildingSchema["~output"]> {
		//
	}
}

export const BuildingTable: FC<BuildingTable.Props> = ({ table, ...props }) => {
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
