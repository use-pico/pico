import { useParams } from "@tanstack/react-router";
import { Icon, LinkTo } from "@use-pico/client";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace BuildingNode {
	export interface Data {
		name: string;
		x: number;
		y: number;
		productionName?: string | null;
		recurringProductionName?: string | null;
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

			{data.productionName ?
				<div
					className={"flex flex-row gap-2 items-center text-xs text-slate-400"}
				>
					<Icon
						icon={ResourceIcon}
						variant={{ size: "xs" }}
					/>{" "}
					<div>{data.productionName}</div>
				</div>
			: data.recurringProductionName ?
				<div
					className={"flex flex-row gap-2 items-center text-xs text-slate-400"}
				>
					<Icon
						icon={"icon-[oui--refresh]"}
						variant={{ size: "xs" }}
					/>
					<div>{data.recurringProductionName}</div>
				</div>
			:	null}

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
