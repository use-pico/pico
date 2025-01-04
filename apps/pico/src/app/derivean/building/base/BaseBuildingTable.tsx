import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    BoolInline,
    DeleteControl,
    LinkTo,
    Table,
    toast,
    TrashIcon,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber, translator } from "@use-pico/common";
import type { FC } from "react";
import { BaseBuildingForm } from "~/app/derivean/building/base/BaseBuildingForm";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { kysely } from "~/app/derivean/db/db";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";

const column = withColumn<BaseBuildingSchema["~output"]>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Base building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/building/base/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 10,
	}),
	column({
		name: "preview",
		header() {
			return <Tx label={"Base building preview (label)"} />;
		},
		render({ value }) {
			return <BoolInline value={value} />;
		},
		size: 14,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Base building cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 14,
	}),
	column({
		name: "limit",
		header() {
			return <Tx label={"Base building limit (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({
				number: value,
				empty: translator.text("Unlimited (label)"),
			});
		},
		size: 14,
	}),
];

export namespace BaseBuildingTable {
	export interface Props extends Table.PropsEx<BaseBuildingSchema["~output"]> {
		//
	}
}

export const BaseBuildingTable: FC<BaseBuildingTable.Props> = ({
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
								label={<Tx label={"Create base building (menu)"} />}
								textTitle={<Tx label={"Create base building (modal)"} />}
								icon={BaseBuildingIcon}
							>
								<BaseBuildingForm
									mutation={BaseBuildingRepository(kysely).useCreateMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving base building (label)"} />,
												success: (
													<Tx
														label={"Base building successfully saved (label)"}
													/>
												),
												error: (
													<Tx label={"Cannot save base building (label)"} />
												),
											});
										},
									})}
									onSuccess={async ({ modalContext }) => {
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete base buildings (label)"} />}
								textTitle={<Tx label={"Delete base buildings (modal)"} />}
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
									repository={BaseBuildingRepository(kysely)}
									textContent={<Tx label={"Base building delete (content)"} />}
									filter={{
										idIn: table.selection?.value,
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
								label={<Tx label={"Edit base building (menu)"} />}
								textTitle={<Tx label={"Edit base building (modal)"} />}
								icon={BaseBuildingIcon}
							>
								<BaseBuildingForm
									defaultValues={data}
									mutation={BaseBuildingRepository(kysely).usePatchMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving base building (label)"} />,
												success: (
													<Tx
														label={"Base building successfully saved (label)"}
													/>
												),
												error: (
													<Tx label={"Cannot save base building (label)"} />
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
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete base building (label)"} />}
								textTitle={<Tx label={"Delete base building (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									repository={BaseBuildingRepository(kysely)}
									textContent={<Tx label={"Base building delete (content)"} />}
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
