import { useParams } from "@tanstack/react-router";
import { LinkTo, Progress } from "@use-pico/client";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { FC } from "react";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";

export namespace QueueNode {
	export interface Data {
		id: string;
		name: string;
		landId: string;
		x: number;
		y: number;
		cycles: number;
		cycle: number;
		[key: string]: unknown;
	}

	export type QueueNode = Node<Data, "queue">;

	export interface Props extends NodeProps<QueueNode> {
		//
	}
}

export const QueueNode: FC<QueueNode.Props> = ({ data }) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className={"flex flex-row gap-2 items-center"}>
				<LinkTo
					icon={ConstructionIcon}
					to={
						"/$locale/apps/derivean/map/$mapId/building/$buildingId/construction/requirements"
					}
					params={{ locale, mapId, buildingId: data.id }}
					css={{ base: ["font-bold"] }}
				>
					{data.name}
				</LinkTo>
			</div>
			<Progress value={(100 * data.cycle) / data.cycles} />

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
