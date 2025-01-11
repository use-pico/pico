import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    ActionClick,
    ActionMenu,
    LinkTo,
    Table,
    toast,
    Tx,
    useTable,
    withColumn,
    withToastPromiseTx,
} from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { withDefaultInventory } from "~/app/derivean/inventory/withDefaultInventory";

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
	const defaultInventoryMutation = useMutation({
		async mutationFn({ userId }: { userId: string }) {
			return kysely.transaction().execute((tx) => {
				return withDefaultInventory({ tx, userId });
			});
		},
	});

	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			action={{
				row({ data }) {
					return (
						<ActionMenu>
							<ActionClick
								icon={InventoryIcon}
								onClick={() => {
									toast.promise(
										defaultInventoryMutation.mutateAsync({
											userId: data.id,
										}),
										withToastPromiseTx("Apply default inventory"),
									);
								}}
							>
								<Tx label={"Apply default inventory (menu)"} />
							</ActionClick>
						</ActionMenu>
					);
				},
			}}
			{...props}
		/>
	);
};
