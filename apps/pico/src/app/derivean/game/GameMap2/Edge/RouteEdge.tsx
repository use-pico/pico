import {
    EdgeLabelRenderer,
    StraightEdge,
    useInternalNode,
    type Edge,
    type EdgeProps,
} from "@xyflow/react";
import type { FC } from "react";
import { getEdgeParams } from "~/app/derivean/utils/getEdgeParams";

export namespace RouteEdge {
	export interface Transport {
		id: string;
		progress: number;
		fromIndex: number;
		toIndex: number;
		jumps: number;
		mark: boolean;
	}

	export interface Data {
		id: string;
		fromId: string;
		toId: string;
		length: number;
		mark: boolean;
		transports: Transport[];
		[key: string]: unknown;
	}

	export type RouteEdge = Edge<Data, "route">;

	export interface Props extends EdgeProps<RouteEdge> {
		//
	}
}

export const RouteEdge: FC<RouteEdge.Props> = ({
	source,
	target,
	markerEnd,
	markerStart,
	data,
	style,
}) => {
	const sourceNode = useInternalNode(source);
	const targetNode = useInternalNode(target);

	if (!sourceNode || !targetNode) {
		return null;
	}

	const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

	return (
		<>
			<StraightEdge
				sourceX={sx}
				sourceY={sy}
				targetX={tx}
				targetY={ty}
				markerStart={markerStart}
				markerEnd={markerEnd}
				style={style}
			/>
			{data?.transports
				.filter(({ jumps }) => jumps > 0)
				.filter(({ mark }) => mark)
				.map((transport) => {
					const t =
						(transport.fromIndex > transport.toIndex ?
							transport.progress
						:	100 - transport.progress) / 100;
					const labelX = sx + (tx - sx) * t;
					const labelY = sy + (ty - sy) * t;

					return (
						<EdgeLabelRenderer>
							<div
								style={{
									position: "absolute",
									transition: "transform 0.3s ease-in-out",
									transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
									background: "white",
									width: "64px",
									height: "64px",
									borderRadius: "4px",
									border: "1px solid black",
									pointerEvents: "all",
								}}
								className="nodrag nopan"
							/>
						</EdgeLabelRenderer>
					);
				})}
		</>
	);
};
