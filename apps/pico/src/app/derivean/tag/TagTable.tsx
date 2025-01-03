import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    Table,
    TagIcon,
    toast,
    TrashIcon,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { FC } from "react";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";
import { TagForm } from "~/app/derivean/tag/TagForm";
import { TagRepository } from "~/app/derivean/tag/TagRepository";
import type { TagSchema } from "~/app/tag/TagSchema";

const column = withColumn<TagSchema["~output"]>();

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
	export interface Props extends Table.PropsEx<TagSchema["~output"]> {
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
								<TagForm
									defaultValues={{
										group,
									}}
									mutation={TagRepository.useCreateMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving tag (label)"} />,
												success: (
													<Tx label={"Tag successfully saved (label)"} />
												),
												error: <Tx label={"Cannot save tag (label)"} />,
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
								label={<Tx label={"Delete tags (label)"} />}
								textTitle={<Tx label={"Delete tags (modal)"} />}
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
									repository={ResourceRepository}
									textContent={<Tx label={"Tag delete (content)"} />}
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
								label={<Tx label={"Edit tag (menu)"} />}
								textTitle={<Tx label={"Edit tag (modal)"} />}
								icon={TagIcon}
							>
								<TagForm
									defaultValues={{
										...data,
										group,
									}}
									mutation={TagRepository.usePatchMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving tag (label)"} />,
												success: (
													<Tx label={"Tag successfully saved (label)"} />
												),
												error: <Tx label={"Cannot save tag (label)"} />,
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
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete tag (label)"} />}
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
									repository={TagRepository}
									textContent={<Tx label={"Tag delete (content)"} />}
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
