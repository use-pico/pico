import { useParams } from "@tanstack/react-router";
import {
    ActionLink,
    ActionMenu,
    LinkTo,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { type FC } from "react";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

const column = withColumn<BlueprintSchema.Type>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Blueprint name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/blueprint/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 14,
	}),
	column({
		name: "kind",
		header() {
			return <Tx label={"Blueprint kind (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 14,
	}),
];

export namespace BlueprintTable {
	export interface Props extends Table.PropsEx<BlueprintSchema.Type> {
		//
	}
}

export const BlueprintTable: FC<BlueprintTable.Props> = ({
	table,
	...props
}) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			action={{
				table() {
					const { locale } = useParams({ from: "/$locale" });

					return (
						<ActionMenu>
							<ActionLink
								icon={BlueprintIcon}
								to={"/$locale/apps/derivean/root/blueprint/create"}
								params={{ locale }}
							>
								<Tx label={"Create blueprint (menu)"} />
							</ActionLink>
						</ActionMenu>
					);
				},
			}}
			{...props}
		/>
	);
};
