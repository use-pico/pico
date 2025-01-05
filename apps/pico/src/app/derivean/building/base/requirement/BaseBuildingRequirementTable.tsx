import {
    ActionMenu,
    ActionModal,
    BoolInline,
    DeleteControl,
    Table,
    toast,
    TrashIcon,
    Tx,
    useCreateMutation,
    usePatchMutation,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { BaseBuildingRequirementForm } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementForm";
import type { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";
import { BaseBuildingRequirementSource } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSource";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

const column = withColumn<BaseBuildingRequirementSchema["~output"]>();

const columns = [
	column({
		name: "resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
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
		size: 14,
	}),
	column({
		name: "passive",
		header() {
			return <Tx label={"Passive requirement (label)"} />;
		},
		render({ value }) {
			return <BoolInline value={value} />;
		},
		size: 14,
	}),
];

export namespace BaseBuildingRequirementTable {
	export interface Props
		extends Table.PropsEx<BaseBuildingRequirementSchema["~output"]> {
		baseBuildingId: string;
	}
}

export const BaseBuildingRequirementTable: FC<
	BaseBuildingRequirementTable.Props
> = ({ baseBuildingId, table, ...props }) => {
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
								label={<Tx label={"Create resource requirement (menu)"} />}
								textTitle={<Tx label={"Create resource requirement (modal)"} />}
								icon={ResourceIcon}
							>
								<BaseBuildingRequirementForm
									mutation={useCreateMutation({
										source: BaseBuildingRequirementSource,
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: (
													<Tx label={"Saving resource requirement (label)"} />
												),
												success: (
													<Tx
														label={
															"Resource requirement successfully saved (label)"
														}
													/>
												),
												error: (
													<Tx
														label={"Cannot save resource requirement (label)"}
													/>
												),
											});
										},
										async toCreate({ shape }) {
											return {
												entity: {
													...shape,
													baseBuildingId,
												},
											};
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
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit resource requirement (menu)"} />}
								textTitle={<Tx label={"Edit resource requirement (modal)"} />}
								icon={ResourceIcon}
							>
								<BaseBuildingRequirementForm
									defaultValues={data}
									mutation={usePatchMutation({
										source: BaseBuildingRequirementSource,
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: (
													<Tx label={"Saving resource requirement (label)"} />
												),
												success: (
													<Tx
														label={
															"Resource requirement successfully saved (label)"
														}
													/>
												),
												error: (
													<Tx
														label={"Cannot save resource requirement (label)"}
													/>
												),
											});
										},
										async toPatch({ shape }) {
											return {
												entity: {
													...shape,
													baseBuildingId,
												},
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
								label={<Tx label={"Delete resource requirement (label)"} />}
								textTitle={<Tx label={"Delete resource requirement (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									source={BaseBuildingRequirementSource}
									textContent={
										<Tx label={"Resource requirement delete (content)"} />
									}
									filter={{
										id: data.id,
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
