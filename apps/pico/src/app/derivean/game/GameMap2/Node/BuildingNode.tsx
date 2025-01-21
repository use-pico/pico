import { Icon } from "@use-pico/client";
import {
    Handle,
    Position,
    useConnection,
    type Node,
    type NodeProps,
} from "@xyflow/react";
import type { FC } from "react";
import type { BuildingSchema } from "~/app/derivean/game/GameMap2/schema/BuildingSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BuildingNode {
	export interface Props
		extends NodeProps<Node<BuildingSchema.Type, "building">> {
		//
	}
}

export const BuildingNode: FC<BuildingNode.Props> = ({ id, data }) => {
	const connection = useConnection();
	const isTarget = connection.inProgress && connection.fromNode.id !== id;

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className={"flex flex-row gap-2 items-center"}>
				<Icon
					icon={BuildingIcon}
					css={{ base: ["text-slate-500"] }}
				/>
				<div className="font-bold">{data.name}</div>
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
