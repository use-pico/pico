import {
    ActionMenu,
    ActionModal,
    Table,
    TagIcon,
    TrashIcon,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";

interface Data extends IdentitySchema.Type {
	code: string;
	label: string;
	group?: string | null;
	sort: number;
}

const column = withColumn<Data>();

const columns = [
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

export namespace TagTable {
	export interface Props extends Table.PropsEx<Data> {
		group?: string;
	}
}

export const TagTable: FC<TagTable.Props> = ({ group, table, ...props }) => {
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
								{/* <TagForm
									defaultValues={{
										group,
									}}
									mutation={useCreateMutation({
										source: TagSource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Create tag"),
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
								textTitle={<Tx label={"Edit tag (modal)"} />}
								icon={TagIcon}
							>
								{/* <TagForm
									defaultValues={{
										group,
										...data,
									}}
									mutation={usePatchMutation({
										source: TagSource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Update tag"),
											);
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
								/> */}
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
								{/* <DeleteControl
									source={TagSource}
									textContent={<Tx label={"Tag delete (content)"} />}
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
