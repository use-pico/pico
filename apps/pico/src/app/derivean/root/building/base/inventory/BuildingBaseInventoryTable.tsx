import {
    ActionMenu,
    ActionModal,
    Table,
    TrashIcon,
    Tx,
    useTable,
    withColumn
} from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";

interface Data extends IdentitySchema.Type {
	name: string;
	amount: number;
	limit: number;
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
		size: 14,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "limit",
		header() {
			return <Tx label={"Limit (label)"} />;
		},
		render({ value }) {
			return value === 0 ?
					<Tx label={"Unlimited (label)"} />
				:	toHumanNumber({ number: value });
		},
		size: 10,
	}),
];

export namespace BuildingBaseInventoryTable {
	export interface Props extends Table.PropsEx<Data> {
		buildingBaseId: string;
	}
}

export const BuildingBaseInventoryTable: FC<
	BuildingBaseInventoryTable.Props
> = ({ buildingBaseId, table, ...props }) => {
	// const invalidator = useSourceInvalidator({
	// 	sources: [BuildingBaseInventorySource, InventorySource],
	// });

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
								label={<Tx label={"Create building base inventory (menu)"} />}
								textTitle={
									<Tx label={"Create building base inventory (modal)"} />
								}
								icon={InventoryIcon}
							>
								{/* <InventoryForm
									mutation={useCreateMutation({
										source: InventorySource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Create building base inventory"),
											);
										},
										async onSuccess({ tx, entity }) {
											await BuildingBaseInventorySource.create$({
												tx,
												entity: {
													buildingBaseId,
													inventoryId: entity.id,
												},
											});
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
								textTitle={<Tx label={"Edit building base (modal)"} />}
								icon={BuildingBaseIcon}
							>
								{/* <InventoryForm
									defaultValues={data.inventory}
									mutation={usePatchMutation({
										source: InventorySource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Update building base inventory"),
											);
										},
										async toPatch() {
											return {
												filter: {
													id: data.inventoryId,
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
								textTitle={
									<Tx label={"Delete building base inventory (modal)"} />
								}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								{/* <DeleteControl
									source={BuildingBaseInventorySource}
									textContent={
										<Tx label={"Building base inventory delete (content)"} />
									}
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
