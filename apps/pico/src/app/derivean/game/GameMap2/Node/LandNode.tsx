import { useNavigate, useParams } from "@tanstack/react-router";
import { type Node, type NodeProps } from "@xyflow/react";
import type { FC } from "react";

export namespace LandNode {
	export interface Data {
		id: string;
		name: string;
		color: string;
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
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				navigate({
					to: "/$locale/apps/derivean/map/$mapId/land/$landId/construction",
					params: { locale, mapId, landId: data.id },
				});
			}}
			className={"w-full h-full"}
		>
			<div className={"text-9xl font-bold font-slate-800"}>{data.name}</div>
		</div>
	);
};
