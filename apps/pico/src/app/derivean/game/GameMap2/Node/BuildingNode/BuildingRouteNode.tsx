import { Icon } from "@use-pico/client";
import {
    Handle,
    Position,
    useConnection,
    type Node,
    type NodeProps,
} from "@xyflow/react";
import type { FC } from "react";

export namespace BuildingRouteNode {
	export interface Data {
		name: string;
		[key: string]: unknown;
	}

	export type BuildingRouteNode = Node<Data, "building-route">;

	export interface Props extends NodeProps<BuildingRouteNode> {
		//
	}
}

export const BuildingRouteNode: FC<BuildingRouteNode.Props> = ({
	id,
	data,
}) => {
	const connection = useConnection();
	const isTarget = connection.inProgress && connection.fromNode.id !== id;

	return (
		<div className="flex flex-row gap-2 w-full h-full items-center justify-center ">
			<div
				className={"flex flex-row gap-2 items-center justify-center text-xl"}
			>
				<Icon
					icon={"icon-[gis--route-end]"}
					css={{ base: ["text-slate-500"] }}
				/>
				<div className="font-bold">{data.name}</div>
			</div>

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
