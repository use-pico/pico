import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    ActionClick,
    ActionMenu,
    LinkTo,
    Table,
    TrashIcon,
    Tx,
    useInvalidator,
    useTable,
    withColumn
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
	const invalidator = useInvalidator([["Management"], ["User_Inventory"]]);

	const defaultInventoryMutation = useMutation({
		async mutationFn({ userId }: { userId: string }) {
			return kysely.transaction().execute((tx) => {
				return withDefaultInventory({ tx, userId });
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const resetGameMutation = useMutation({
		async mutationFn({ userId }: { userId: string }) {
			return kysely.transaction().execute(async (tx) => {
				await withDefaultInventory({ tx, userId });
				await tx.deleteFrom("Building").where("userId", "=", userId).execute();
				await tx
					.deleteFrom("Production")
					.where("userId", "=", userId)
					.execute();
				await tx
					.deleteFrom("Construction")
					.where("userId", "=", userId)
					.execute();
				await tx.deleteFrom("Cycle").where("userId", "=", userId).execute();
			});
		},
		async onSuccess() {
			await invalidator();
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
									defaultInventoryMutation.mutateAsync({
										userId: data.id,
									});
								}}
							>
								<Tx label={"Apply default inventory (menu)"} />
							</ActionClick>
							<ActionClick
								icon={TrashIcon}
								onClick={() => {
									resetGameMutation.mutateAsync({
										userId: data.id,
									});
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
