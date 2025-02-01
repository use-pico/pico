import { useNavigate, useParams } from "@tanstack/react-router";
import { Progress } from "@use-pico/client";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { FC } from "react";

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
	const navigate = useNavigate();

	return (
		<div
			className="flex flex-col gap-2 w-full h-full group"
			onClick={() => {
				navigate({
					to: "/$locale/apps/derivean/map/$mapId/building/$buildingId/view",
					params: { locale, mapId, buildingId: data.id },
				});
			}}
		>
			<div
				className={
					"hidden group-hover:flex justify-center w-full rounded-sm bg-slate-50 text-slate-600"
				}
			>
				<div>{data.name}</div>
			</div>

			<div
				className={
					"absolute bottom-0 left-0 flex flex-col gap-2 items-center justify-center w-full bg-white rounded-sm p-2"
				}
			>
				<Progress
					value={(100 * data.cycle) / data.cycles}
					variant={{ size: "lg" }}
				/>
			</div>

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
