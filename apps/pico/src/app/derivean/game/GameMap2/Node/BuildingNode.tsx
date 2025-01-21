import { Icon } from "@use-pico/client";
import type { Node, NodeProps } from "@xyflow/react";
import type { FC } from "react";
import type { BuildingSchema } from "~/app/derivean/game/GameMap2/schema/BuildingSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BuildingNode {
	export interface Props
		extends NodeProps<Node<BuildingSchema.Type, "building">> {
		//
	}
}

export const BuildingNode: FC<BuildingNode.Props> = ({ data }) => {
	return (
		<div className="flex flex-col gap-2 w-full">
			<div className={"flex flex-row gap-2 items-center"}>
				<Icon
					icon={BuildingIcon}
					css={{ base: ["text-slate-500"] }}
				/>
				<div className="font-bold">{data.name}</div>
			</div>
		</div>
	);
};
