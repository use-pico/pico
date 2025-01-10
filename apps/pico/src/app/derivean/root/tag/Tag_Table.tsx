import { useMutation } from "@tanstack/react-query";
import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    Table,
    TagIcon,
    toast,
    TrashIcon,
    Tx,
    useInvalidator,
    useTable,
    withColumn,
    withToastPromiseTx,
} from "@use-pico/client";
import { genId, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { Tag_Form } from "~/app/derivean/root/tag/Tag_Form";

export namespace Tag_Table {
	export interface Data extends IdentitySchema.Type {
		code: string;
		label: string;
		group?: string | null;
		sort: number;
	}
}

const column = withColumn<Tag_Table.Data>();

const columns = [
	column({
		name: "label",
		header() {
			return <Tx label={"Tag label (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 14,
	}),
	column({
		name: "code",
		header() {
			return <Tx label={"Tag code (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 14,
	}),
	column({
		name: "group",
		header() {
			return <Tx label={"Tag group (label)"} />;
		},
		render({ value }) {
			return value;
		},
		filter: {
			path: "group",
			onFilter({ data, filter }) {
				filter.shallow("group", data.group);
			},
		},
		size: 24,
	}),
];

export namespace Tag_Table {
	export interface Props extends Table.PropsEx<Data> {
		group?: string;
	}
}

export const Tag_Table: FC<Tag_Table.Props> = ({ group, table, ...props }) => {
	const invalidator = useInvalidator([["Tag"], ["Resource"]]);

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
								label={<Tx label={"Create tag (menu)"} />}
								textTitle={<Tx label={"Create tag (modal)"} />}
								icon={TagIcon}
							>
								<Tag_Form
									defaultValues={{
										group,
									}}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute((tx) => {
													return tx
														.insertInto("Tag")
														.values({
															id: genId(),
															...values,
														})
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Create tag"),
											);
										},
										async onSuccess() {
											await invalidator();
										},
									})}
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
								textTitle={<Tx label={"Edit tag (modal)"} />}
								icon={TagIcon}
							>
								<Tag_Form
									defaultValues={{
										group,
										...data,
									}}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute((tx) => {
													return tx
														.updateTable("Tag")
														.set(values)
														.where("id", "=", data.id)
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Edit tag"),
											);
										},
										async onSuccess() {
											await invalidator();
										},
									})}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete (menu)"} />}
								textTitle={<Tx label={"Delete tag (modal)"} />}
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
										await kysely.transaction().execute((tx) => {
											return tx
												.deleteFrom("Tag")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={<Tx label={"Tag delete (content)"} />}
									textToast={"Tag delete"}
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
