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
    useSourceInvalidator,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";
import { BaseBuildingProductionSource } from "~/app/derivean/building/base/production/BaseBuildingProductionSource";
import { BaseBuildingProductionRequirementForm } from "~/app/derivean/building/base/production/requirement/BaseBuildingProductionRequirementForm";
import type { BaseBuildingProductionRequirementSchema } from "~/app/derivean/building/base/production/requirement/BaseBuildingProductionRequirementSchema";
import { BaseBuildingProductionRequirementSource } from "~/app/derivean/building/base/production/requirement/BaseBuildingProductionRequirementSource";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

const column = withColumn<BaseBuildingProductionRequirementSchema["~output"]>();

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

export namespace BaseBuildingProductionRequirementTable {
	export interface Props
		extends Table.PropsEx<BaseBuildingProductionRequirementSchema["~output"]> {
		baseBuildingProductionId: string;
	}
}

export const BaseBuildingProductionRequirementTable: FC<
	BaseBuildingProductionRequirementTable.Props
> = ({ baseBuildingProductionId, table, ...props }) => {
	const invalidator = useSourceInvalidator({
		sources: [
			BaseBuildingSource,
			BaseBuildingProductionSource,
			BaseBuildingProductionRequirementSource,
		],
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
								label={<Tx label={"Create resource requirement (menu)"} />}
								textTitle={<Tx label={"Create resource requirement (modal)"} />}
								icon={ResourceIcon}
							>
								<BaseBuildingProductionRequirementForm
									mutation={useCreateMutation({
										source: BaseBuildingProductionRequirementSource,
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
													baseBuildingProductionId,
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
				},
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit resource requirement (menu)"} />}
								textTitle={<Tx label={"Edit resource requirement (modal)"} />}
								icon={ResourceIcon}
							>
								<BaseBuildingProductionRequirementForm
									defaultValues={data}
									mutation={usePatchMutation({
										source: BaseBuildingProductionRequirementSource,
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
												entity: shape,
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
									source={BaseBuildingProductionRequirementSource}
									textContent={
										<Tx label={"Resource requirement delete (content)"} />
									}
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
