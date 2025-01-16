import { Icon, Progress } from "@use-pico/client";
import { Handle, NodeProps, Position, type Node } from "@xyflow/react";
import { type FC } from "react";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";

export namespace ConstructionNode {
	export type Data = MapSchema.Type;

	export interface Props extends NodeProps<Node<Data, "construction">> {
		//
	}
}

export const ConstructionNode: FC<ConstructionNode.Props> = ({
	data,
	isConnectable,
}) => {
	const queue = data.construction?.[0];

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
						icon={ConstructionIcon}
						css={{ base: ["text-slate-400"] }}
					/>
					<div className={"font-bold"}>{data.name}</div>
				</div>
				<div
					className={
						"flex flex-row items-center gap-2 border bg-slate-50 border-slate-200 rounded w-full p-1"
					}
					onClick={(e) => e.stopPropagation()}
					onDoubleClick={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
				>
					{queue ?
						<Progress
							variant={{ size: "lg" }}
							value={(100 * queue.cycle) / (queue.to - queue.from)}
						/>
					:	null}
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
