import { Icon, Progress } from "@use-pico/client";
import type { Node, NodeProps } from "@xyflow/react";
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
	return (
		<div className="flex flex-col gap-2 w-full">
			<div className={"flex flex-row gap-2 items-center"}>
				<Icon
					icon={ConstructionIcon}
					css={{ base: ["text-slate-500"] }}
				/>
				<div className="font-bold">{data.name}</div>
			</div>
			<Progress value={(100 * data.cycle) / (data.to - data.from)} />
		</div>
	);
};
