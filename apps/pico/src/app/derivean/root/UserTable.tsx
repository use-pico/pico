import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    ActionClick,
    ActionMenu,
    LinkTo,
    Table,
    toast,
    TrashIcon,
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

export namespace UserTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		login: string;
	}
}

const column = withColumn<UserTable.Data>();

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

export namespace UserTable {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const UserTable: FC<UserTable.Props> = ({ table, ...props }) => {
	const defaultInventoryMutation = useMutation({
		async mutationFn({ userId }: { userId: string }) {
			return kysely.transaction().execute((tx) => {
				return withDefaultInventory({ tx, userId });
			});
		},
	});
	const resetGameMutation = useMutation({
		async mutationFn({ userId }: { userId: string }) {
			return kysely.transaction().execute(async (tx) => {
				await withDefaultInventory({ tx, userId });
				await tx.deleteFrom("Building").where("userId", "=", userId).execute();
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
							<ActionClick
								icon={TrashIcon}
								onClick={() => {
									toast.promise(
										resetGameMutation.mutateAsync({
											userId: data.id,
										}),
										withToastPromiseTx("Reset game"),
									);
								}}
							>
								<Tx label={"Reset game (menu)"} />
							</ActionClick>
						</ActionMenu>
					);
				},
			}}
			{...props}
		/>
	);
};
