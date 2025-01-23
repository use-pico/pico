import { useParams } from "@tanstack/react-router";
import { LinkTo, Progress } from "@use-pico/client";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { FC } from "react";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";

export namespace QueueNode {
	export interface Data {
		id: string;
		name: string;
		x: number;
		y: number;
		from: number;
		to: number;
		cycle: number;
		[key: string]: unknown;
	}

	export interface Props extends NodeProps<Node<Data, "queue">> {
		//
	}
}

export const QueueNode: FC<QueueNode.Props> = ({ data }) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className={"flex flex-row gap-2 items-center"}>
				<LinkTo
					icon={ConstructionIcon}
					to={
						"/$locale/apps/derivean/map/building/$id/construction/requirements"
					}
					params={{ locale, id: data.id }}
					css={{ base: ["font-bold"] }}
				>
					{data.name}
				</LinkTo>
			</div>
			<Progress value={(100 * data.cycle) / (data.to - data.from)} />

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
