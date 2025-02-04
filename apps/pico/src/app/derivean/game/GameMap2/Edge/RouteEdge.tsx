import { tvc } from "@use-pico/common";
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
		resourceId: string;
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
						<EdgeLabelRenderer key={`transport-${transport.id}`}>
							<div
								className={tvc([
									"nodrag",
									"nopan",
									"w-[128px]",
									"h-[128px]",
									"rounded-md",
									"border-2",
									"border-purple-400",
									"pointer-events-all",
									`bg-${transport.resourceId}`,
								])}
								style={{
									position: "absolute",
									// transition: "transform 0.3s ease-in-out",
									transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
								}}
							/>
						</EdgeLabelRenderer>
					);
				})}
		</>
	);
};
