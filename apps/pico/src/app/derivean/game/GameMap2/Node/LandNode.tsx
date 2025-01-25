import { useParams } from "@tanstack/react-router";
import { Button, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import {
    NodeToolbar,
    Position,
    type Node,
    type NodeProps,
} from "@xyflow/react";
import type { FC } from "react";
import { ToolbarCss } from "~/app/derivean/game/GameMap2/Node/ToolbarCss";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";

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
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<>
			<NodeToolbar
				position={Position.Top}
				className={tvc(ToolbarCss)}
			>
				<LinkTo
					to={"/$locale/apps/derivean/map/$mapId/land/$landId/construction"}
					params={{ locale, mapId, landId: data.id }}
				>
					<Button
						iconEnabled={ConstructionIcon}
						variant={{ variant: "subtle" }}
					>
						<Tx label={"Construction (label)"} />
					</Button>
				</LinkTo>
			</NodeToolbar>
			<div>
				<div className={"text-9xl font-bold font-slate-800"}>{data.name}</div>
			</div>
		</>
	);
};
