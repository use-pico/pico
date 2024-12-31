import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    LinkTo,
    Table,
    toast,
    TrashIcon,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber, type withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import { SlotIcon } from "~/app/derivean/icon/SlotIcon";
import { InventorySlotRepository } from "~/app/derivean/inventory/slot/InventorySlotRepository";
import { KindInline } from "~/app/derivean/item/KindInline";
import { SlotForm } from "~/app/derivean/slot/SlotForm";
import { SlotRepository } from "~/app/derivean/slot/SlotRepository";
import type { SlotSchema } from "~/app/derivean/slot/SlotSchema";

const column = withColumn<withRepositorySchema.Entity<SlotSchema>>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Slot name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/slot/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 16,
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
	column({
		name: "size",
		header() {
			return <Tx label={"Slot size (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
];

export namespace SlotTable {
	export interface Props
		extends Table.PropsEx<withRepositorySchema.Entity<SlotSchema>> {
		inventoryId?: string;
	}
}

export const SlotTable: FC<SlotTable.Props> = ({
	inventoryId,
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
								label={<Tx label={"Create slot (menu)"} />}
								textTitle={<Tx label={"Create slot (modal)"} />}
								icon={SlotIcon}
							>
								<SlotForm
									mutation={SlotRepository.useCreateMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving slot (label)"} />,
												success: (
													<Tx label={"Slot successfully saved (label)"} />
												),
												error: <Tx label={"Cannot save slot (label)"} />,
											});
										},
										async toCreate({ shape }) {
											return {
												shape,
											};
										},
										async onSuccess({ entity }) {
											if (inventoryId) {
												await InventorySlotRepository.create({
													shape: {
														inventoryId,
														slotId: entity.id,
													},
												});
											}
										},
									})}
									onSuccess={async ({ modalContext }) => {
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete slots (label)"} />}
								textTitle={<Tx label={"Delete slots (modal)"} />}
								disabled={
									!table.selection || table.selection.value.length === 0
								}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									repository={SlotRepository}
									textContent={<Tx label={"Slot delete (content)"} />}
									idIn={table.selection?.value}
								/>
							</ActionModal>
						</ActionMenu>
					);
				},
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit slot (menu)"} />}
								textTitle={<Tx label={"Edit slot (modal)"} />}
								icon={SlotIcon}
							>
								<SlotForm
									defaultValues={data}
									mutation={SlotRepository.usePatchMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving slot (label)"} />,
												success: (
													<Tx label={"Slot successfully saved (label)"} />
												),
												error: <Tx label={"Cannot save slot (label)"} />,
											});
										},
										async toPatch({ shape }) {
											return {
												shape,
												filter: {
													id: data.id,
												},
											};
										},
									})}
									onSuccess={async ({ modalContext }) => {
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete slot (label)"} />}
								textTitle={<Tx label={"Delete slot (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									repository={SlotRepository}
									textContent={<Tx label={"Slot delete (content)"} />}
									idIn={[data.id]}
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
