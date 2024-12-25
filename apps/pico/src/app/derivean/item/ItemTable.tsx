import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    LinkTo,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { FC } from "react";
import { ItemIcon } from "~/app/derivean/icon/ItemIcon";
import { ItemForm } from "~/app/derivean/item/ItemForm";
import { ItemQuery } from "~/app/derivean/item/ItemQuery";
import type { ItemSchema } from "~/app/derivean/item/schema/ItemSchema";

const column = withColumn<ItemSchema.Type>();

const columns = [
	column({
		name: "name",
		header() {
			return "Item name (label)";
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/item/$id/view"}
					params={{ locale, id: data.id }}
				>
					<Tx label={`Item name - ${value}`} />
				</LinkTo>
			);
		},
		size: 14,
	}),
];

export namespace ItemTable {
	export interface Props extends Table.PropsEx<ItemSchema.Type> {
		//
	}
}

export const ItemTable: FC<ItemTable.Props> = ({ table, ...props }) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			action={{
				table() {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Create item (menu)"} />}
								textTitle={<Tx label={"Create item (modal)"} />}
								icon={ItemIcon}
							>
								<ItemForm
									mutation={ItemQuery.useCreateMutation({
										async toCreate(create) {
											return create;
										},
									})}
									onSuccess={async () => {
										//
									}}
								/>
							</ActionModal>
						</ActionMenu>
					);
				},
			}}
			{...props}
		/>
	);
};
