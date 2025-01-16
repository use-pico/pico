import { useParams } from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client";
import { Handle, NodeProps, Position, type Node } from "@xyflow/react";
import { type FC } from "react";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

export namespace BlueprintMissingResourcesNode {
	export type Data = MapSchema.Type;

	export interface Props
		extends NodeProps<Node<Data, "blueprint-missing-resources">> {
		//
	}
}

export const BlueprintMissingResourcesNode: FC<
	BlueprintMissingResourcesNode.Props
> = ({ data, isConnectable }) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<div className={"w-[14rem]"}>
			<Handle
				type={"target"}
				position={Position.Left}
				className={"w-4 h-4"}
			/>
			<div className={"flex flex-row items-center gap-2"}>
				<LinkTo
					icon={BlueprintIcon}
					to={"/$locale/apps/derivean/game/map"}
					params={{ locale }}
					search={{ requirementsOf: data.id }}
					css={{
						base: ["font-bold", "text-amber-500", "hover:text-amber-600"],
					}}
				>
					{data.name}
				</LinkTo>
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
