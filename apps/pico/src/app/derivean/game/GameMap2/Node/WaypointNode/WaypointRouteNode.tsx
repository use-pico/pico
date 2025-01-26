import { Icon } from "@use-pico/client";
import {
    Handle,
    Position,
    useConnection,
    type Node,
    type NodeProps,
} from "@xyflow/react";
import type { FC } from "react";
import { WaypointIcon } from "~/app/derivean/icon/WaypointIcon";

export namespace WaypointRouteNode {
	export interface Data {
		id: string;
		x: number;
		y: number;
		[key: string]: unknown;
	}

	export type WaypointRouteNode = Node<Data, "waypoint-route">;

	export interface Props extends NodeProps<WaypointRouteNode> {
		//
	}
}

export const WaypointRouteNode: FC<WaypointRouteNode.Props> = ({ id }) => {
	const connection = useConnection();
	const isTarget = connection.inProgress && connection.fromNode.id !== id;

	return (
		<div className="w-full h-full flex items-center justify-center ">
			<Icon
				icon={WaypointIcon}
				css={{ base: ["text-amber-600"] }}
				variant={{ size: "5xl" }}
			/>

			<div className={"w-full h-full absolute top-0 left-0"}>
				{!connection.inProgress && (
					<Handle
						className={
							"absolute top-0 left-0 transform-none border-none opacity-0 w-full h-full"
						}
						position={Position.Right}
						type={"source"}
					/>
				)}
				{(!connection.inProgress || isTarget) && (
					<Handle
						className={
							"absolute top-0 left-0 transform-none border-none opacity-0 w-full h-full"
						}
						position={Position.Left}
						type={"target"}
						isConnectableStart={false}
					/>
				)}
			</div>
		</div>
	);
};
