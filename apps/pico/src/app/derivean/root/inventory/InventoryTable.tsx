import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    Table,
    toast,
    TrashIcon,
    Tx,
    useCreateMutation,
    usePatchMutation,
    useSourceInvalidator,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import { InventorySource } from "~/app/derivean/inventory/InventorySource";
import { InventoryForm } from "~/app/derivean/root/inventory/InventoryForm";

const column = withColumn<InventorySchema["~output"]>();

const columns = [
	column({
		name: "resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		filter: {
			path: "resourceId",
			onFilter({ data, filter }) {
				filter.shallow("resourceId", data.resourceId);
			},
		},
		size: 18,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 18,
	}),
];

export namespace InventoryTable {
	export interface Props extends Table.PropsEx<InventorySchema["~output"]> {
		userId?: string;
	}
}

export const InventoryTable: FC<InventoryTable.Props> = ({
	userId,
	table,
	...props
}) => {
	const invalidator = useSourceInvalidator({
		sources: [InventorySource],
	});

	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			action={{
				table:
					userId ?
						() => {
							return (
								<ActionMenu>
									<ActionModal
										label={<Tx label={"Create inventory item (menu)"} />}
										textTitle={<Tx label={"Create inventory item (modal)"} />}
										icon={InventoryIcon}
									>
										<InventoryForm
											mutation={useCreateMutation({
												source: InventorySource,
												async wrap(callback) {
													return toast.promise(callback(), {
														loading: (
															<Tx label={"Saving inventory item (label)"} />
														),
														success: (
															<Tx
																label={
																	"Inventory item successfully saved (label)"
																}
															/>
														),
														error: (
															<Tx
																label={"Cannot save inventory item (label)"}
															/>
														),
													});
												},
												async toCreate({ shape }) {
													return {
														entity: {
															...shape,
															userId,
														},
													};
												},
											})}
											onSuccess={async ({ modalContext }) => {
												await invalidator();
												modalContext?.close();
											}}
										/>
									</ActionModal>
								</ActionMenu>
							);
						}
					:	undefined,
				row({ data }) {
					return (
						<ActionMenu>
							{userId ?
								<ActionModal
									label={<Tx label={"Edit inventory item (menu)"} />}
									textTitle={<Tx label={"Edit inventory item (modal)"} />}
									icon={InventoryIcon}
								>
									<InventoryForm
										defaultValues={data}
										mutation={usePatchMutation({
											source: InventorySource,
											async wrap(callback) {
												return toast.promise(callback(), {
													loading: (
														<Tx label={"Saving inventory item (label)"} />
													),
													success: (
														<Tx
															label={
																"Inventory item successfully saved (label)"
															}
														/>
													),
													error: (
														<Tx label={"Cannot save inventory item (label)"} />
													),
												});
											},
											async toPatch() {
												return {
													filter: {
														id: data.id,
													},
												};
											},
										})}
										onSuccess={async ({ modalContext }) => {
											await invalidator();
											modalContext?.close();
										}}
									/>
								</ActionModal>
							:	null}

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete inventory item (label)"} />}
								textTitle={<Tx label={"Delete inventory item (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									source={InventorySource}
									textContent={<Tx label={"Inventory item delete (content)"} />}
									filter={{
										id: data.id,
									}}
									invalidator={invalidator}
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
