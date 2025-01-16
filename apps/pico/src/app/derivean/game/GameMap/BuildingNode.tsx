import { useParams } from "@tanstack/react-router";
import { Icon, LinkTo, LoaderIcon } from "@use-pico/client";
import { Handle, NodeProps, Position, type Node } from "@xyflow/react";
import { type FC } from "react";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BuildingNode {
	export type Data = MapSchema.Type;

	export interface Props extends NodeProps<Node<Data, "building">> {
		//
	}
}

export const BuildingNode: FC<BuildingNode.Props> = ({
	data,
	isConnectable,
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<div className={"min-w-[14rem]"}>
			<Handle
				type={"target"}
				position={Position.Left}
				className={"w-4 h-4"}
			/>
			<div className={"flex flex-col gap-2 items-start"}>
				<div className={"flex flex-row items-center gap-2"}>
					<Icon
						icon={BuildingIcon}
						css={{ base: ["text-slate-400"] }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/game/map"}
						params={{ locale }}
						search={{ blueprintId: data.id }}
						css={{
							base: ["font-bold"],
						}}
					>
						{data.name}
					</LinkTo>
					{data.productionCount > 0 ?
						<Icon icon={LoaderIcon} />
					:	null}
				</div>
			</div>
			<Handle
				type={"source"}
				position={Position.Right}
				isConnectable={isConnectable}
				className={"w-4 h-4"}
			/>
		</div>
	);
};
