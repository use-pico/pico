import { useMutation } from "@tanstack/react-query";
import { Button, CheckIcon, Icon, useInvalidator } from "@use-pico/client";
import { genId } from "@use-pico/common";
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

				const requirements = await tx
					.selectFrom("Building as b")
					.innerJoin(
						"Blueprint_Requirement as br",
						"br.blueprintId",
						"b.blueprintId",
					)
					.select(["b.id as buildingId", "br.amount", "br.resourceId"])
					.where("b.constructionId", "=", constructionId)
					.execute();

				/**
				 * Order required resources; if a building is connected to Waypoints, it may
				 * get what it requires.
				 */
				for await (const { amount, buildingId, resourceId } of requirements) {
					await tx
						.insertInto("Demand")
						.values({
							id: genId(),
							amount,
							buildingId,
							resourceId,
							priority: 0,
							type: "construction",
						})
						.execute();
				}
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<div className="flex flex-row gap-2 items-start justify-between w-full h-full">
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
