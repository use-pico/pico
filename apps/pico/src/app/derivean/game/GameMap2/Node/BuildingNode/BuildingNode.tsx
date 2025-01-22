import { useParams } from "@tanstack/react-router";
import { Icon, LinkTo } from "@use-pico/client";
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
				<Icon
					icon={BuildingIcon}
					css={{ base: ["text-slate-500"] }}
				/>
				<div className="font-bold">{data.name}</div>
			</div>
			<div
				className={"flex flex-row gap-2 items-center"}
				onClick={(e) => e.stopPropagation()}
				onDoubleClick={(e) => e.stopPropagation()}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<LinkTo
					icon={"icon-[gis--route-end]"}
					to={"/$locale/apps/derivean/map/building/$id/routes"}
					params={{ locale, id }}
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
