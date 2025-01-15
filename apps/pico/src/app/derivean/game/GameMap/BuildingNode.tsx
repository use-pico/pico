import { Action, Icon, LoaderIcon, Modal } from "@use-pico/client";
import { Handle, NodeProps, Position, type Node } from "@xyflow/react";
import { type FC } from "react";
import { BuildingItem } from "~/app/derivean/game/GameMap/BuildingItem";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";

export namespace BuildingNode {
	export type Data = MapSchema.Type;

	export interface Props extends NodeProps<Node<Data, "building">> {
		userId: string;
		inventory: InventorySchema["~entity-array"];
	}
}

export const BuildingNode: FC<BuildingNode.Props> = ({
	userId,
	inventory,
	data,
	isConnectable,
}) => {
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
					<div className={"font-bold"}>{data.name}</div>
				</div>
				<div
					className={
						"flex flex-row items-center justify-between gap-2 border bg-slate-50 border-slate-200 rounded w-full p-1"
					}
					onClick={(e) => e.stopPropagation()}
					onDoubleClick={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
				>
					<Modal
						icon={BuildingIcon}
						textTitle={data.name}
						target={<Action iconEnabled={ResourceIcon} />}
						outside={true}
					>
						<BuildingItem
							userId={userId}
							inventory={inventory}
							entity={data}
						/>
					</Modal>

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
