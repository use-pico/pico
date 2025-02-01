import { useMutation } from "@tanstack/react-query";
import { Button, CheckIcon, TrashIcon, useInvalidator } from "@use-pico/client";
import type { Node, NodeProps } from "@xyflow/react";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";

export namespace ConstructionNode {
	export interface Data {
		id: string;
		landId: string;
		constructionId: string;
		name: string;
		x: number;
		y: number;
		valid: boolean;
		[key: string]: unknown;
	}

	export type ConstructionNode = Node<Data, "construction">;

	export interface Props extends NodeProps<ConstructionNode> {
		//
	}
}

export const ConstructionNode: FC<ConstructionNode.Props> = ({ data }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const commitMutation = useMutation({
		async mutationFn({ constructionId }: { constructionId: string }) {
			return kysely.transaction().execute(async (tx) => {
				tx.updateTable("Construction")
					.set({ plan: false })
					.where("id", "=", constructionId)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const deleteMutation = useMutation({
		async mutationFn({ constructionId }: { constructionId: string }) {
			return kysely.transaction().execute(async (tx) => {
				tx.deleteFrom("Building")
					.where("constructionId", "=", constructionId)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<div className="flex flex-col gap-2 items-start justify-between w-full h-full group">
			<div
				className={
					"hidden group-hover:flex justify-center w-full rounded-sm bg-slate-50 text-slate-600"
				}
			>
				<div>{data.name}</div>
			</div>

			<div
				className={
					"hidden group-hover:flex absolute bottom-0 left-0 flex-row justify-between items-center w-full p-2"
				}
			>
				<Button
					iconEnabled={TrashIcon}
					loading={deleteMutation.isPending}
					onClick={() => {
						deleteMutation.mutate({ constructionId: data.constructionId });
					}}
					variant={{ variant: "danger" }}
				/>

				<Button
					iconEnabled={CheckIcon}
					iconDisabled={CheckIcon}
					loading={commitMutation.isPending}
					disabled={!data.valid}
					onClick={() => {
						commitMutation.mutate({ constructionId: data.constructionId });
					}}
				/>
			</div>
		</div>
	);
};
