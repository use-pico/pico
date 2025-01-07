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
import type { BuildingBaseProductionSchema } from "~/app/derivean/building/base/production/BuildingBaseProductionSchema";
import { BuildingBaseProductionSource } from "~/app/derivean/building/base/production/BuildingBaseProductionSource";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceProductionSource } from "~/app/derivean/resource/production/ResourceProductionSource";
import { ResourceProductionForm } from "~/app/derivean/root/resource/production/ResourceProductionForm";

const column = withColumn<BuildingBaseProductionSchema["~output"]>();

const columns = [
	column({
		name: "resourceProduction.resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 14,
	}),
	column({
		name: "resourceProduction.amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "resourceProduction.limit",
		header() {
			return <Tx label={"Production limit (label)"} />;
		},
		render({ value }) {
			return value === 0 ?
					<Tx label={"Unlimited (label)"} />
				:	toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "resourceProduction.cycles",
		header() {
			return <Tx label={"Production cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
];

export namespace BuildingBaseProductionTable {
	export interface Props
		extends Table.PropsEx<BuildingBaseProductionSchema["~output"]> {
		buildingBaseId: string;
	}
}

export const BuildingBaseProductionTable: FC<
	BuildingBaseProductionTable.Props
> = ({ buildingBaseId, table, ...props }) => {
	const invalidator = useSourceInvalidator({
		sources: [BuildingBaseProductionSource, ResourceProductionSource],
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
								label={<Tx label={"Create building base production (menu)"} />}
								textTitle={
									<Tx label={"Create building base production (modal)"} />
								}
								icon={ProductionIcon}
							>
								<ResourceProductionForm
									mutation={useCreateMutation({
										source: ResourceProductionSource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Create building base production"),
											);
										},
										async onSuccess({ tx, entity }) {
											await BuildingBaseProductionSource.create$({
												tx,
												entity: {
													buildingBaseId,
													resourceProductionId: entity.id,
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
								textTitle={
									<Tx label={"Edit building base production (modal)"} />
								}
								icon={ProductionIcon}
							>
								<ResourceProductionForm
									defaultValues={data.resourceProduction}
									mutation={usePatchMutation({
										source: ResourceProductionSource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Update building base production"),
											);
										},
										async toPatch() {
											return {
												filter: {
													id: data.resourceProductionId,
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
								textTitle={<Tx label={"Delete building production (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									source={BuildingBaseProductionSource}
									textContent={
										<Tx label={"Building base production delete (content)"} />
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
