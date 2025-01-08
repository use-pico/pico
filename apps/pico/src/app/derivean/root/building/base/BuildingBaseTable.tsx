import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    LinkTo,
    Table,
    TrashIcon,
    Tx,
    useTable,
    withColumn
} from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";

interface Data extends IdentitySchema.Type {
	name: string;
	cycles: number;
}

const column = withColumn<Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
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
		name: "cycles",
		header() {
			return <Tx label={"Construction cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 14,
	}),
	// column({
	// 	name: "requirements",
	// 	header() {
	// 		return <Tx label={"Resource requirements (label)"} />;
	// 	},
	// 	render({ value }) {
	// 		return (
	// 			<RequirementsInline
	// 				textTitle={<Tx label={"Building requirements (title)"} />}
	// 				requirements={value}
	// 				limit={5}
	// 			/>
	// 		);
	// 	},
	// 	size: 72,
	// }),
];

export namespace BuildingBaseTable {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const BuildingBaseTable: FC<BuildingBaseTable.Props> = ({
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
								label={<Tx label={"Create building base (menu)"} />}
								textTitle={<Tx label={"Create building base (modal)"} />}
								icon={BuildingBaseIcon}
							>
								{/* <BuildingBaseForm
									mutation={useCreateMutation({
										source: BuildingBaseSource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Create building base"),
											);
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
								{/* <BuildingBaseForm
									defaultValues={data}
									mutation={usePatchMutation({
										source: BuildingBaseSource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Update building base"),
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
								textTitle={<Tx label={"Delete building (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								{/* <DeleteControl
									source={BuildingBaseSource}
									textContent={<Tx label={"Building base delete (content)"} />}
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
