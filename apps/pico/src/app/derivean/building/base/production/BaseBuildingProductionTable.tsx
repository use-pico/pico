import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    EditIcon,
    LinkTo,
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
import { BaseBuildingProductionForm } from "~/app/derivean/building/base/production/BaseBuildingProductionForm";
import type { BaseBuildingProductionSchema } from "~/app/derivean/building/base/production/BaseBuildingProductionSchema";
import { BaseBuildingProductionSource } from "~/app/derivean/building/base/production/BaseBuildingProductionSource";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceInline } from "~/app/derivean/resource/ResourceInline";

const column = withColumn<BaseBuildingProductionSchema["~output"]>();

const columns = [
	column({
		name: "resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={
						"/$locale/apps/derivean/root/building/base/$id/production/$productionId/requirement/list"
					}
					params={{ locale, id: data.baseBuildingId, productionId: data.id }}
				>
					{value}
				</LinkTo>
			);
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
		name: "cycles",
		header() {
			return <Tx label={"Cycle count (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 14,
	}),
	column({
		name: "requirements",
		header() {
			return <Tx label={"Resource requirements (label)"} />;
		},
		render({ value }) {
			return <ResourceInline resources={value} />;
		},
	}),
];

export namespace BaseBuildingProductionTable {
	export interface Props
		extends Table.PropsEx<BaseBuildingProductionSchema["~output"]> {
		baseBuildingId: string;
	}
}

export const BaseBuildingProductionTable: FC<
	BaseBuildingProductionTable.Props
> = ({ baseBuildingId, table, ...props }) => {
	const invalidator = useSourceInvalidator({
		sources: [BaseBuildingSource, BaseBuildingProductionSource],
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
								label={<Tx label={"Create production resource (menu)"} />}
								textTitle={<Tx label={"Create production resource (modal)"} />}
								icon={ResourceIcon}
							>
								<BaseBuildingProductionForm
									mutation={useCreateMutation({
										source: BaseBuildingProductionSource,
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: (
													<Tx label={"Saving production resource (label)"} />
												),
												success: (
													<Tx
														label={
															"Production resource successfully saved (label)"
														}
													/>
												),
												error: (
													<Tx
														label={"Cannot save production resource (label)"}
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
								label={<Tx label={"Edit production resource (menu)"} />}
								textTitle={<Tx label={"Edit production resource (modal)"} />}
								icon={EditIcon}
							>
								<BaseBuildingProductionForm
									defaultValues={data}
									mutation={usePatchMutation({
										source: BaseBuildingProductionSource,
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: (
													<Tx label={"Saving production resource (label)"} />
												),
												success: (
													<Tx
														label={
															"Production resource successfully saved (label)"
														}
													/>
												),
												error: (
													<Tx
														label={"Cannot save production resource (label)"}
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
										await invalidator();
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete production resource (label)"} />}
								textTitle={<Tx label={"Delete production resource (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									source={BaseBuildingProductionSource}
									textContent={
										<Tx label={"Production resource delete (content)"} />
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
