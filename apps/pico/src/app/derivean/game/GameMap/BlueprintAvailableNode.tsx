import { useMutation } from "@tanstack/react-query";
import {
    Button,
    Icon,
    useInvalidator
} from "@use-pico/client";
import { Handle, NodeProps, Position, type Node } from "@xyflow/react";
import { type FC } from "react";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { withConstructionQueue } from "~/app/derivean/service/withConstructionQueue";

export namespace BlueprintAvailableNode {
	export type Data = MapSchema.Type;

	export interface Props extends NodeProps<Node<Data, "blueprint-available">> {
		userId: string;
	}
}

export const BlueprintAvailableNode: FC<BlueprintAvailableNode.Props> = ({
	id,
	data,
	userId,
	isConnectable,
}) => {
	const invalidator = useInvalidator([
		["Management"],
		["Building_Queue"],
		["Inventory"],
		["User_Inventory"],
	]);

	const mutation = useMutation({
		async mutationFn({ blueprintId }: { blueprintId: string }) {
			return withConstructionQueue({
				blueprintId,
				userId,
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<div className={"min-w-[14rem]"}>
			<Handle
				type={"target"}
				position={Position.Left}
				className={"w-4 h-4"}
			/>
			<div className={"flex flex-col gap-2 items-start"}>
				<div className={"flex flex-row items-center gap-2"}>
					<Icon
						icon={BlueprintIcon}
						css={{ base: ["text-green-600"] }}
					/>
					<div className={"font-bold text-green-600"}>{data.name}</div>
				</div>
				<div
					className={
						"flex flex-row items-center gap-2 border bg-slate-50 border-slate-200 rounded w-full p-1"
					}
					onClick={(e) => e.stopPropagation()}
					onDoubleClick={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
				>
					<Button
						iconEnabled={ConstructionIcon}
						iconDisabled={ConstructionIcon}
						variant={{
							variant: "primary",
						}}
						onClick={() => {
							mutation.mutate({
								blueprintId: id,
							});
						}}
						css={{
							base: ["w-full"],
						}}
						loading={mutation.isPending}
					/>
				</div>
			</div>
			<Handle
				type={"source"}
				position={Position.Right}
				isConnectable={isConnectable}
				className={"w-4 h-4"}
			/>
		</div>
	);
};
