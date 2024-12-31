import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    LinkTo,
    Table,
    toast,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import { ItemIcon } from "~/app/derivean/icon/ItemIcon";
import { ItemForm } from "~/app/derivean/item/ItemForm";
import { ItemRepository } from "~/app/derivean/item/ItemRepository";
import type { ItemSchema } from "~/app/derivean/item/ItemSchema";
import { KindInline } from "~/app/derivean/item/KindInline";

const column = withColumn<withRepositorySchema.Entity<ItemSchema>>();

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
	column({
		name: "kind",
		header() {
			return <Tx label={"Item kind (label)"} />;
		},
		render({ value }) {
			return <KindInline kind={value} />;
		},
		filter: {
			path: "kind",
			onFilter({ data, filter }) {
				filter.shallow("kind", data.kind);
			},
		},
		size: 18,
	}),
];

export namespace ItemTable {
	export interface Props
		extends Table.PropsEx<withRepositorySchema.Entity<ItemSchema>> {
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
									mutation={ItemRepository.useCreateMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving item (label)"} />,
												success: (
													<Tx label={"Item successfully saved (label)"} />
												),
												error: <Tx label={"Cannot save item (label)"} />,
											});
										},
									})}
									onSuccess={async ({ modalContext }) => {
										modalContext?.close();
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
