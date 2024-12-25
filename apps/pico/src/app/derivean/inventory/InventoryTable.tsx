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
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { InventoryForm } from "~/app/derivean/inventory/InventoryForm";
import { InventoryQuery } from "~/app/derivean/inventory/InventoryQuery";
import type { InventorySchema } from "~/app/derivean/inventory/schema/InventorySchema";

const column = withColumn<InventorySchema.Type>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Inventory name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/inventory/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
	}),
];

export namespace InventoryTable {
	export interface Props extends Table.PropsEx<InventorySchema.Type> {
		//
	}
}

export const InventoryTable: FC<InventoryTable.Props> = ({
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
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Create inventory (menu)"} />}
								textTitle={<Tx label={"Create inventory (modal)"} />}
								icon={InventoryIcon}
							>
								<InventoryForm
									mutation={InventoryQuery.useCreateMutation({
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
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit inventory (menu)"} />}
								textTitle={<Tx label={"Edit inventory (modal)"} />}
								icon={InventoryIcon}
							>
								<InventoryForm
									defaultValues={data}
									mutation={InventoryQuery.usePatchMutation({
										async toPatch(shape) {
											return {
												shape,
												filter: {
													id: data.id,
												},
											};
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
