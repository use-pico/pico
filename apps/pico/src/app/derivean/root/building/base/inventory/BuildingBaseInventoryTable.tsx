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
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { BuildingBaseSource } from "~/app/derivean/building/base/BuildingBaseSource";
import type { BuildingBaseInventorySchema } from "~/app/derivean/building/base/inventory/BuildingBaseInventorySchema";
import { BuildingBaseInventorySource } from "~/app/derivean/building/base/inventory/BuildingBaseInventorySource";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { InventorySource } from "~/app/derivean/inventory/InventorySource";
import { InventoryForm } from "~/app/derivean/root/inventory/InventoryForm";

const column = withColumn<BuildingBaseInventorySchema["~output"]>();

const columns = [
	column({
		name: "inventory.resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 14,
	}),
	column({
		name: "inventory.amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "inventory.limit",
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
	export interface Props
		extends Table.PropsEx<BuildingBaseInventorySchema["~output"]> {
		buildingBaseId: string;
	}
}

export const BuildingBaseInventoryTable: FC<
	BuildingBaseInventoryTable.Props
> = ({ buildingBaseId, table, ...props }) => {
	const invalidator = useSourceInvalidator({
		sources: [BuildingBaseInventorySource, InventorySource],
	});

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
								<InventoryForm
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
								/>
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
								<InventoryForm
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
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete (menu)"} />}
								textTitle={<Tx label={"Delete building (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									source={BuildingBaseSource}
									textContent={<Tx label={"Building base delete (content)"} />}
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
