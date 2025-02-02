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

export namespace BuildingWaypointEdge {
	export interface Transport {
		id: string;
		progress: number;
		jumps: number;
		mark: boolean;
		outbound?: boolean | undefined;
		resourceId: string;
	}

	export interface Data {
		id: string;
		buildingId: string;
		waypointId: string;
		transports: Transport[];
		[key: string]: unknown;
	}

	export type BuildingWaypointEdge = Edge<Data, "building-waypoint">;

	export interface Props extends EdgeProps<BuildingWaypointEdge> {
		//
	}
}

export const BuildingWaypointEdge: FC<BuildingWaypointEdge.Props> = ({
	source,
	target,
	markerStart,
	markerEnd,
	style,
	data,
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
				.filter(({ mark }) => mark)
				.map((transport) => {
					if (transport.outbound && transport.jumps === 1) {
						return null;
					}

					const t =
						(transport.outbound ?
							transport.progress
						:	100 - transport.progress) / 100;
					const labelX = sx + (tx - sx) * t;
					const labelY = sy + (ty - sy) * t;

					return (
						<EdgeLabelRenderer>
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
									transition: "transform 0.3s ease-in-out",
									transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
									pointerEvents: "all",
								}}
							/>
						</EdgeLabelRenderer>
					);
				})}
		</>
	);
};
