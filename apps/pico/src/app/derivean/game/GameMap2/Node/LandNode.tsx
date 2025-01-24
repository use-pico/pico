import type { Node, NodeProps } from "@xyflow/react";
import type { FC } from "react";

export namespace LandNode {
	export interface Data {
		id: string;
		name: string;
		x: number;
		y: number;
		width: number;
		height: number;
		[key: string]: unknown;
	}

	export type LandNode = Node<Data, "land">;

	export interface Props extends NodeProps<LandNode> {
		//
	}
}

export const LandNode: FC<LandNode.Props> = ({ data }) => {
	return (
		<div>
			<div>{data.name}</div>
		</div>
	);
};
