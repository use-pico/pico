import { useMutation } from "@tanstack/react-query";
import { Button, CheckIcon, Icon, useInvalidator } from "@use-pico/client";
import type { Node, NodeProps } from "@xyflow/react";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";

export namespace ConstructionNode {
	export interface Data {
		id: string;
		constructionId: string;
		name: string;
		x: number;
		y: number;
		valid: boolean;
		[key: string]: unknown;
	}

	export interface Props extends NodeProps<Node<Data, "construction">> {
		//
	}
}

export const ConstructionNode: FC<ConstructionNode.Props> = ({ data }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const commitMutation = useMutation({
		async mutationFn({ constructionId }: { constructionId: string }) {
			return kysely.transaction().execute((tx) => {
				return tx
					.updateTable("Construction")
					.set({ plan: false })
					.where("id", "=", constructionId)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<div className="flex flex-row gap-2 items-center justify-between w-full">
			<div className={"flex flex-row gap-2 items-center"}>
				<Icon
					icon={"icon-[carbon--floorplan]"}
					css={{ base: ["text-slate-500"] }}
				/>
				<div className="font-bold">{data.name}</div>
			</div>
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
	);
};
