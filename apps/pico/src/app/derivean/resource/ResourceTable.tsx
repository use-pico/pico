import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    LinkTo,
    Table,
    Tags,
    toast,
    TrashIcon,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceForm } from "~/app/derivean/resource/ResourceForm";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";

const column = withColumn<ResourceSchema["~output"]>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/resource/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 18,
	}),
	column({
		name: "tags",
		header() {
			return <Tx label={"Resource tags (label)"} />;
		},
		render({ value }) {
			return <Tags tags={value} />;
		},
		size: 32,
	}),
];

export namespace ResourceTable {
	export interface Props extends Table.PropsEx<ResourceSchema["~output"]> {
		//
	}
}

export const ResourceTable: FC<ResourceTable.Props> = ({ table, ...props }) => {
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
								label={<Tx label={"Create resource (menu)"} />}
								textTitle={<Tx label={"Create resource (modal)"} />}
								icon={ResourceIcon}
							>
								<ResourceForm
									mutation={ResourceRepository.useCreateMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving resource (label)"} />,
												success: (
													<Tx label={"Resource successfully saved (label)"} />
												),
												error: <Tx label={"Cannot save resource (label)"} />,
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
								label={<Tx label={"Delete resources (label)"} />}
								textTitle={<Tx label={"Delete resources (modal)"} />}
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
									textContent={<Tx label={"Resource delete (content)"} />}
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
								label={<Tx label={"Edit resource (menu)"} />}
								textTitle={<Tx label={"Edit resource (modal)"} />}
								icon={ResourceIcon}
							>
								<ResourceForm
									defaultValues={data}
									mutation={ResourceRepository.usePatchMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving resource (label)"} />,
												success: (
													<Tx label={"Resource successfully saved (label)"} />
												),
												error: <Tx label={"Cannot save resource (label)"} />,
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
								label={<Tx label={"Delete resource (label)"} />}
								textTitle={<Tx label={"Delete resource (modal)"} />}
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
									textContent={<Tx label={"Resource delete (content)"} />}
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
