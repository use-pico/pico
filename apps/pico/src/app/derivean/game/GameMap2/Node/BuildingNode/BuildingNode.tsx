import { useParams } from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BuildingNode {
	export interface Data {
		name: string;
		x: number;
		y: number;
		[key: string]: unknown;
	}

	export interface Props extends NodeProps<Node<Data, "building">> {
		//
	}
}

export const BuildingNode: FC<BuildingNode.Props> = ({ id, data }) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<div className="flex flex-row gap-2 w-full items-center justify-between">
			<div className={"flex flex-row gap-2 items-center"}>
				<LinkTo
					icon={BuildingIcon}
					to={"/$locale/apps/derivean/map/building/$id/view"}
					params={{ locale, id }}
					css={{
						base: ["font-bold"],
					}}
				>
					{data.name}
				</LinkTo>
			</div>
			<div
				className={"flex flex-row gap-1 items-center"}
				onClick={(e) => e.stopPropagation()}
				onDoubleClick={(e) => e.stopPropagation()}
				onMouseDown={(e) => e.stopPropagation()}
			></div>

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
