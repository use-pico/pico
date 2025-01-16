import { Icon } from "@use-pico/client";
import { Handle, NodeProps, Position, type Node } from "@xyflow/react";
import { type FC } from "react";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { RequirementsInline } from "~/app/derivean/game/RequirementsInline";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";

export namespace BlueprintMissingResourcesNode {
	export type Data = MapSchema.Type;

	export interface Props
		extends NodeProps<Node<Data, "blueprint-missing-resources">> {
		inventory: InventorySchema["~entity-array"];
	}
}

export const BlueprintMissingResourcesNode: FC<
	BlueprintMissingResourcesNode.Props
> = ({ inventory, data, isConnectable }) => {
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
						icon={BlueprintIcon}
						css={{ base: ["text-amber-400"] }}
					/>
					<div className={"font-bold text-amber-500"}>{data.name}</div>
				</div>
				<div
					className={
						"flex flex-row items-center gap-2 border bg-slate-50 border-slate-200 rounded w-full p-1"
					}
					onClick={(e) => e.stopPropagation()}
					onDoubleClick={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
				>
					<RequirementsInline
						requirements={data.requirements}
						diff={inventory}
					/>
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
