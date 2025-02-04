import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    Badge,
    DeleteControl,
    Icon,
    LinkTo,
    Table,
    TrashIcon,
    Tx,
    useInvalidator,
    useTable,
    withColumn,
} from "@use-pico/client";
import {
    genId,
    toHumanNumber,
    type IdentitySchema
} from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { ArrowRightIcon } from "~/app/derivean/icon/ArrowRightIcon";
import { RegionIcon } from "~/app/derivean/icon/RegionIcon";
import { RegionForm } from "~/app/derivean/root/RegionForm";
import { toWebp64 } from "~/app/derivean/utils/toWebp64";

export namespace RegionTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		minWidth: number;
		maxWidth: number;
		minHeight: number;
		maxHeight: number;
		width?: number;
		height?: number;
		probability: number;
		limit: number;
	}
}

const column = withColumn<RegionTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Region name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/region/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 18,
	}),
	column({
		name: "width",
		header() {
			return <Tx label={"Region width (label)"} />;
		},
		render({ data }) {
			return (
				<div className={"flex flex-row gap-2 items-center"}>
					<div>{toHumanNumber({ number: data.minWidth })}</div>
					<div>
						<Icon
							icon={ArrowRightIcon}
							variant={{ size: "xs" }}
						/>
					</div>
					<div>{toHumanNumber({ number: data.maxWidth })}</div>
				</div>
			);
		},
		size: 16,
	}),
	column({
		name: "height",
		header() {
			return <Tx label={"Region height (label)"} />;
		},
		render({ data }) {
			return (
				<div className={"flex flex-row gap-2 items-center"}>
					<div>{toHumanNumber({ number: data.minHeight })}</div>
					<div>
						<Icon
							icon={ArrowRightIcon}
							variant={{ size: "xs" }}
						/>
					</div>
					<div>{toHumanNumber({ number: data.maxHeight })}</div>
				</div>
			);
		},
		size: 12,
	}),
	column({
		name: "probability",
		header() {
			return <Tx label={"Region probability (label)"} />;
		},
		render({ value }) {
			return <Badge>{toHumanNumber({ number: value })}%</Badge>;
		},
		size: 14,
	}),
	column({
		name: "limit",
		header() {
			return <Tx label={"Region limit (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 18,
	}),
];

export namespace RegionTable {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const RegionTable: FC<RegionTable.Props> = ({ table, ...props }) => {
	const invalidator = useInvalidator([["Region"]]);

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
								label={<Tx label={"Create region (menu)"} />}
								textTitle={<Tx label={"Create region (modal)"} />}
								icon={RegionIcon}
							>
								{({ close }) => {
									return (
										<RegionForm
											mutation={useMutation({
												async mutationFn({ image, ...values }) {
													return kysely.transaction().execute(async (tx) => {
														return tx
															.insertInto("Region")
															.values({
																id: genId(),
																...values,
																image: image ? await toWebp64(image) : null,
															})
															.execute();
													});
												},
												async onSuccess() {
													await invalidator();
													close();
												},
											})}
										/>
									);
								}}
							</ActionModal>
						</ActionMenu>
					);
				},
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit (menu)"} />}
								textTitle={<Tx label={"Edit region (modal)"} />}
								icon={RegionIcon}
							>
								{({ close }) => {
									return (
										<RegionForm
											defaultValues={data}
											mutation={useMutation({
												async mutationFn({ image, ...values }) {
													return kysely.transaction().execute(async (tx) => {
														return tx
															.updateTable("Region")
															.set({
																...values,
																image: image ? await toWebp64(image) : null,
															})
															.where("id", "=", data.id)
															.execute();
													});
												},
												async onSuccess() {
													await invalidator();
													close();
												},
											})}
										/>
									);
								}}
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete (menu)"} />}
								textTitle={<Tx label={"Delete region (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									callback={async () => {
										return kysely.transaction().execute(async (tx) => {
											return tx
												.deleteFrom("Region")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={<Tx label={"Delete region (content)"} />}
									textToast={"Delete region"}
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
