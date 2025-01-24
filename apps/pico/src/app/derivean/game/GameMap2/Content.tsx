import { useMutation } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "@tanstack/react-router";
import { BackIcon, Button, LinkTo, useInvalidator } from "@use-pico/client";
import { genId, tvc } from "@use-pico/common";
import {
    applyNodeChanges,
    Background,
    BackgroundVariant,
    Controls,
    MarkerType,
    MiniMap,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
    type Edge,
    type Node,
    type OnConnect,
    type OnNodeDrag,
    type OnNodesChange,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, type FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { AutoCycleButton } from "~/app/derivean/game/AutoCycleButton";
import { CycleButton } from "~/app/derivean/game/CycleButton";
import { ConnectionLine } from "~/app/derivean/game/GameMap2/ConnectionLine";
import { RouteEdge } from "~/app/derivean/game/GameMap2/Edge/RouteEdge";
import { BuildingNode } from "~/app/derivean/game/GameMap2/Node/BuildingNode/BuildingNode";
import { BuildingRouteNode } from "~/app/derivean/game/GameMap2/Node/BuildingNode/BuildingRouteNode";
import { ConstructionNode } from "~/app/derivean/game/GameMap2/Node/ConstructionNode";
import { LandNode } from "~/app/derivean/game/GameMap2/Node/LandNode";
import { QueueNode } from "~/app/derivean/game/GameMap2/Node/QueueNode";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

const width = 256 + 64;
const height = 128;

const NodeCss = [
	"bg-white",
	"border-[4px]",
	"border-slate-300",
	"shadow-slate-200",
];

const connectionLineStyle = {
	stroke: "#DD44AA",
	strokeWidth: 3,
};

const nodeTypes = {
	"land": LandNode,
	"construction": ConstructionNode,
	"queue": QueueNode,
	"building": BuildingNode,
	"building-route": BuildingRouteNode,
} as const;

const edgeTypes = {
	route: RouteEdge,
} as const;

export namespace Content {
	export interface Props {
		userId: string;
		cycle: number;
		construction: ConstructionNode.Data[];
		queue: QueueNode.Data[];
		building: BuildingNode.Data[];
		route: RouteEdge.Data[];
		zoomToId?: string;
		routing?: boolean;
	}
}

export const Content: FC<Content.Props> = ({
	userId,
	cycle,
	construction,
	queue,
	building,
	route,
	zoomToId,
	routing,
}) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const { locale } = useParams({ from: "/$locale" });
	const navigate = useNavigate({ from: "/$locale/apps/derivean/map" });
	const defaultNodes = useMemo<Node[]>(
		() => [
			{
				id: "land",
				position: {
					x: 0,
					y: 0,
				},
				width: 1024 * 4,
				height: 1024 * 4,
				selectable: false,
				data: {
					id: "1",
					name: "Land",
				},
				type: "land",
				className: tvc([
					"bg-green-200",
					"border-8",
					"border-green-800",
					"opacity-25",
					"z-[-1]",
				]),
			} satisfies LandNode.LandNode,
			...construction.map(
				(construction) =>
					({
						id: construction.id,
						data: construction,
						position: {
							x: construction.x,
							y: construction.y,
						},
						type: "construction",
						width,
						height,
						selectable: false,
						className: tvc(NodeCss, [
							"z-10",
							construction.valid ? ["border-green-500"] : ["border-red-500"],
						]),
					}) satisfies ConstructionNode.ConstructionNode,
			),
			...queue.map((queue) =>
				routing ?
					({
						id: queue.id,
						data: queue,
						position: {
							x: queue.x,
							y: queue.y,
						},
						type: "building-route",
						width,
						height,
						selectable: false,
						className: tvc(NodeCss, [
							"border-amber-400",
							"bg-amber-50",
							"nodrag",
						]),
					} satisfies BuildingRouteNode.BuildingRouteNode)
				:	({
						id: queue.id,
						data: queue,
						position: {
							x: queue.x,
							y: queue.y,
						},
						type: "queue",
						width,
						height,
						selectable: false,
						className: tvc(NodeCss, [
							"border-amber-400",
							"bg-amber-50",
							"nodrag",
						]),
					} satisfies QueueNode.QueueNode),
			),
			...building.map((building) =>
				routing ?
					({
						id: building.id,
						data: building,
						position: {
							x: building.x,
							y: building.y,
						},
						type: "building-route",
						width,
						height,
						selectable: false,
						className: tvc(NodeCss),
						extent: "parent",
						parentId: "land",
					} satisfies BuildingRouteNode.BuildingRouteNode)
				:	({
						id: building.id,
						data: building,
						position: {
							x: building.x,
							y: building.y,
						},
						type: "building",
						width,
						height,
						selectable: false,
						className: tvc(NodeCss),
						extent: "parent",
						parentId: "land",
					} satisfies BuildingNode.BuildingNode),
			),
		],
		[construction, queue, building, routing],
	);
	const defaultEdges = useMemo<Edge[]>(
		() => [
			...route.map(
				(route) =>
					({
						id: route.id,
						source: route.fromId,
						target: route.toId,
						type: "route",
						/**
						 * True if there are available resources in the source (from) and free space in target (to).
						 */
						animated: route.resourceCount > 0,
						markerEnd: {
							type: MarkerType.ArrowClosed,
							color: route.resourceCount > 0 ? "#b1b1b7" : "#FF0000",
						},
						style: {
							stroke: route.resourceCount > 0 ? undefined : "#FF0000",
							strokeWidth: 2,
							pointerEvents: "all",
						},
					}) satisfies RouteEdge.RouteEdge,
			),
		],
		[route],
	);
	const [nodes, setNodes] = useNodesState(defaultNodes);
	const [edges, setEdges] = useEdgesState(defaultEdges);
	const { updateNode, getIntersectingNodes, fitView } = useReactFlow();

	useEffect(() => {
		setNodes(defaultNodes);
	}, [defaultNodes]);
	useEffect(() => {
		setEdges(defaultEdges);
	}, [defaultEdges]);

	useEffect(() => {
		zoomToId &&
			setTimeout(() => {
				fitView({
					nodes: [{ id: zoomToId }],
					duration: 750,
					minZoom: 2,
					maxZoom: 2,
				});
			}, 250);
	}, [fitView, zoomToId]);

	const updatePositionMutation = useMutation({
		mutationKey: ["Construction", "position"],
		async mutationFn({
			buildingId,
			x,
			y,
			valid,
		}: {
			buildingId: string;
			x: number;
			y: number;
			valid: boolean;
		}) {
			return kysely.transaction().execute(async (tx) => {
				await tx
					.updateTable("Building")
					.set({ x, y, valid })
					.where("id", "=", buildingId)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	const onNodesChange = useCallback<OnNodesChange<any>>(
		(changes) => {
			setNodes((nodes) => applyNodeChanges(changes, nodes));
		},
		[setNodes],
	);
	const onNodeDrag = useCallback<OnNodeDrag<any>>(
		(_, __) => {
			// const isOverlapping = getIntersectingNodes(node).length > 0;
			// updateNode(node.id, {
			// 	...node,
			// 	data: {
			// 		...node.data,
			// 		valid: !isOverlapping,
			// 	},
			// 	className: tvc([
			// 		node.className,
			// 		node.type === "land" ? undefined
			// 		: isOverlapping ? ["border-red-500"]
			// 		: ["border-green-500"],
			// 	]),
			// });
		},
		[getIntersectingNodes, updateNode],
	);
	const onNodeDragStop = useCallback<OnNodeDrag<any>>(
		(_, node) => {
			const isOverlapping =
				getIntersectingNodes(node).filter((node) => node.type !== "land")
					.length > 0;

			updatePositionMutation.mutate({
				buildingId: node.id,
				x: node.position.x,
				y: node.position.y,
				valid: !isOverlapping,
			});
		},
		[getIntersectingNodes, updatePositionMutation],
	);
	const routeMutation = useMutation({
		async mutationFn({ fromId, toId }: { fromId: string; toId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.insertInto("Route")
					.values({ id: genId(), fromId, toId, userId })
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const onConnect = useCallback<OnConnect>(
		({ source, target }) =>
			routeMutation.mutate({ fromId: source, toId: target }),
		[routeMutation],
	);

	return (
		<>
			<div className={"flex flex-row"}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onNodeDrag={onNodeDrag}
					onNodeDragStop={onNodeDragStop}
					onConnect={onConnect}
					className={"flex-grow h-screen"}
					fitView
					snapToGrid
					snapGrid={[32, 32]}
					elementsSelectable={false}
					nodeTypes={nodeTypes}
					edgeTypes={edgeTypes}
					connectionLineComponent={ConnectionLine}
					connectionLineStyle={connectionLineStyle}
					maxZoom={2}
					minZoom={0.1}
					onDoubleClick={() => {
						navigate({
							search: {
								routing: !routing,
							},
						});
					}}
					onEdgeClick={(_, edge) => {
						navigate({
							to: "/$locale/apps/derivean/map/building/$id/routes",
							params: { locale, id: edge.source },
						});
					}}
					zoomOnDoubleClick={false}
				>
					<CycleButton
						userId={userId}
						cycle={cycle}
						css={{
							base: ["react-flow__panel", "absolute", "top-1", "right-16"],
						}}
						onDoubleClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
					/>
					<AutoCycleButton
						userId={userId}
						css={{
							base: ["react-flow__panel", "absolute", "top-1", "right-1"],
						}}
					/>
					<Controls
						orientation={"horizontal"}
						showZoom={false}
						showFitView={false}
					/>
					<MiniMap
						zoomable
						draggable
						pannable
					/>
					<Background
						variant={BackgroundVariant.Lines}
						className={"bg-slate-50"}
						gap={32}
						size={1}
					/>

					<div
						className={
							"react-flow__panel flex flex-row p-2 border bg-white border-slate-300 shadow-sm"
						}
					>
						<LinkTo
							to={"/$locale/apps/derivean/game"}
							params={{ locale }}
						>
							<Button
								iconEnabled={BackIcon}
								variant={{ variant: "subtle" }}
							/>
						</LinkTo>
						<LinkTo
							to={"/$locale/apps/derivean/map/construction"}
							params={{ locale }}
						>
							<Button
								iconEnabled={BlueprintIcon}
								variant={{ variant: "subtle" }}
							/>
						</LinkTo>
					</div>
				</ReactFlow>
				<Outlet />
			</div>
		</>
	);
};
