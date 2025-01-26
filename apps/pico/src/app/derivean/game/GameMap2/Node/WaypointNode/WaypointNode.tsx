import { Icon } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import {
    Handle,
    NodeToolbar,
    Position,
    type Node,
    type NodeProps,
} from "@xyflow/react";
import type { FC } from "react";
import { ToolbarCss } from "~/app/derivean/game/GameMap2/Node/ToolbarCss";
import { WaypointIcon } from "~/app/derivean/icon/WaypointIcon";

export namespace WaypointNode {
	export interface Data {
		id: string;
		x: number;
		y: number;
		[key: string]: unknown;
	}

	export type WaypointNode = Node<Data, "waypoint">;

	export interface Props extends NodeProps<WaypointNode> {
		//
	}
}

export const WaypointNode: FC<WaypointNode.Props> = () => {
	return (
		<>
			<NodeToolbar className={tvc(ToolbarCss)}>
				<div
					className={"flex flex-row gap-2 items-center justify-between w-full"}
				>
					waypoint toolbar
				</div>
			</NodeToolbar>
			<div className="w-full h-full flex items-center justify-center">
				<Icon
					icon={WaypointIcon}
					css={{ base: ["text-amber-600"] }}
					variant={{ size: "5xl" }}
				/>

				<Handle
					className={"hidden"}
					position={Position.Right}
					type={"source"}
					isConnectable={false}
				/>
				<Handle
					className={"hidden"}
					position={Position.Left}
					type={"target"}
					isConnectable={false}
				/>
			</div>
		</>
	);
};
