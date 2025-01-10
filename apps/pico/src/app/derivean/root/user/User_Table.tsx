import { useParams } from "@tanstack/react-router";
import { LinkTo, Table, Tx, useTable, withColumn } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";

export namespace User_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		login: string;
	}
}

const column = withColumn<User_Table.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"User name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/user/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 14,
	}),
	column({
		name: "login",
		header() {
			return <Tx label={"User login (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 14,
	}),
];

export namespace User_Table {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const UserTable: FC<User_Table.Props> = ({ table, ...props }) => {
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
