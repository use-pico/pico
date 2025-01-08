import {
	ActionMenu,
	ActionModal,
	Table,
	TrashIcon,
	Tx,
	useTable,
	withColumn,
} from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";

interface Data extends IdentitySchema.Type {
	name: string;
	amount: number;
	limit: number;
	resourceId: string;
}

const column = withColumn<Data>();

const columns = [
	column({
		name: "name",
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
	column({
		name: "limit",
		header() {
			return <Tx label={"Resource limit (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 18,
	}),
];

export namespace DefaultInventoryTable {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const DefaultInventoryTable: FC<DefaultInventoryTable.Props> = ({
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
								label={<Tx label={"Create inventory item (menu)"} />}
								textTitle={<Tx label={"Create inventory item (modal)"} />}
								icon={InventoryIcon}
							>
								{/* <DefaultInventoryForm
									mutation={useCreateMutation({
										source: DefaultInventorySource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Create inventory item"),
											);
										},
										async toCreate({ shape }) {
											return {
												entity: shape,
											};
										},
									})}
									onSuccess={async ({ modalContext }) => {
										await invalidator();
										modalContext?.close();
									}}
								/> */}
							</ActionModal>
						</ActionMenu>
					);
				},
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit (menu)"} />}
								textTitle={<Tx label={"Edit inventory item (modal)"} />}
								icon={InventoryIcon}
							>
								{/* <DefaultInventoryForm
									defaultValues={data}
									mutation={usePatchMutation({
										source: DefaultInventorySource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Update inventory item"),
											);
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
								/> */}
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete (menu)"} />}
								textTitle={<Tx label={"Delete inventory item (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								{/* <DeleteControl
									source={DefaultInventorySource}
									textContent={<Tx label={"Inventory item delete (content)"} />}
									filter={{
										id: data.id,
									}}
									invalidator={invalidator}
								/> */}
							</ActionModal>
						</ActionMenu>
					);
				},
			}}
			{...props}
		/>
	);
};
