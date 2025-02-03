import { useNavigate, useParams } from "@tanstack/react-router";
import { tvc } from "@use-pico/common";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { FC } from "react";

export namespace WaypointNode {
	export interface Data {
		id: string;
		x: number;
		y: number;
		mapId: string;
		transport: number;
		[key: string]: unknown;
	}

	export type WaypointNode = Node<Data, "waypoint">;

	export interface Props extends NodeProps<WaypointNode> {
		//
	}
}

export const WaypointNode: FC<WaypointNode.Props> = ({
	id,
	data: { mapId },
}) => {
	const { locale } = useParams({ from: "/$locale/apps/derivean/map/$mapId" });
	const navigate = useNavigate();

	return (
		<div
			className={tvc([
				"w-full",
				"h-full",
				"flex",
				"items-center",
				"justify-center",
				"bg-road-sign",
			])}
			onClick={() => {
				navigate({
					to: "/$locale/apps/derivean/map/$mapId/waypoint/$waypointId/view",
					params: { locale, mapId, waypointId: id },
				});
			}}
		>
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
	);
};
