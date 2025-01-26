import { useMutation } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "@tanstack/react-router";
import { useInvalidator } from "@use-pico/client";
import {
    applyNodeChanges,
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
    type OnConnect,
    type OnConnectEnd,
    type OnNodeDrag,
    type OnNodesChange,
} from "@xyflow/react";
import { useCallback, useEffect, type FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { AutoCycleButton } from "~/app/derivean/game/AutoCycleButton";
import { CycleButton } from "~/app/derivean/game/CycleButton";
import { ConnectionLine } from "~/app/derivean/game/GameMap2/ConnectionLine";
import { BuildingWaypointEdge } from "~/app/derivean/game/GameMap2/Edge/BuildingWaypointEdge";
import { RouteEdge } from "~/app/derivean/game/GameMap2/Edge/RouteEdge";
import type { GameMap2 } from "~/app/derivean/game/GameMap2/GameMap2";
import { MapToolbar } from "~/app/derivean/game/GameMap2/MapToolbar";
import { useBuildingMutation } from "~/app/derivean/game/GameMap2/mutation/useBuildingMutation";
import { useCreateBuildingWaypointMutation } from "~/app/derivean/game/GameMap2/mutation/useCreateBuildingWaypointMutation";
import { useCreateRouteMutation } from "~/app/derivean/game/GameMap2/mutation/useCreateRouteMutation";
import { useCreateWaypointMutation } from "~/app/derivean/game/GameMap2/mutation/useCreateWaypointMutation";
import { useWaypointMutation } from "~/app/derivean/game/GameMap2/mutation/useWaypointMutation";
import { BuildingNode } from "~/app/derivean/game/GameMap2/Node/BuildingNode/BuildingNode";
import { BuildingRouteNode } from "~/app/derivean/game/GameMap2/Node/BuildingNode/BuildingRouteNode";
import { ConstructionNode } from "~/app/derivean/game/GameMap2/Node/ConstructionNode";
import { LandNode } from "~/app/derivean/game/GameMap2/Node/LandNode";
import { QueueNode } from "~/app/derivean/game/GameMap2/Node/QueueNode";
import { WaypointNode } from "~/app/derivean/game/GameMap2/Node/WaypointNode/WaypointNode";
import { WaypointRouteNode } from "~/app/derivean/game/GameMap2/Node/WaypointNode/WaypointRouteNode";

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
	"waypoint": WaypointNode,
	"waypoint-route": WaypointRouteNode,
} as const;

const edgeTypes = {
	"route": RouteEdge,
	"building-waypoint": BuildingWaypointEdge,
} as const;

export namespace Content {
	export interface Props {
		userId: string;
		cycle: number;
		defaultNodes: GameMap2.NodeType[];
		defaultEdges: GameMap2.EdgeType[];
		zoomToId?: string;
		routing?: boolean;
	}
}

export const Content: FC<Content.Props> = ({
	userId,
	cycle,
	defaultNodes,
	defaultEdges,
	zoomToId,
	routing,
}) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});
	const navigate = useNavigate({ from: "/$locale/apps/derivean/map/$mapId" });
	const [nodes, setNodes] = useNodesState(defaultNodes);
	const [edges, setEdges] = useEdgesState(defaultEdges);
	const {
		getIntersectingNodes,
		fitView,
		getNode,
		getNodes,
		screenToFlowPosition,
	} = useReactFlow();

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
					// minZoom: 2,
					// maxZoom: 2,
				});
			}, 250);
	}, [fitView, zoomToId]);

	const buildingMutation = useBuildingMutation();

	const updateIsValidMutation = useMutation({
		async mutationFn() {
			return kysely.transaction().execute(async (tx) => {
				const invalid = getNodes()
					.filter((node) => {
						return (
							getIntersectingNodes(node).filter((node) => node.type !== "land")
								.length > 0
						);
					})
					.map((node) => node.id);

				await tx
					.updateTable("Building")
					.where(
						"id",
						"in",
						tx
							.selectFrom("Building as b")
							.innerJoin("Land as l", "l.id", "b.landId")
							.where("l.mapId", "=", mapId)
							.select("b.id"),
					)
					.set({ valid: true })
					.execute();

				await tx
					.updateTable("Building")
					.set({ valid: false })
					.where("id", "in", invalid)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const createWaypointMutation = useCreateWaypointMutation();
	const waypointMutation = useWaypointMutation();
	const createRouteMutation = useCreateRouteMutation();
	const createBuildingWaypointMutation = useCreateBuildingWaypointMutation();

	const onNodesChange = useCallback<OnNodesChange<any>>(
		(changes) => {
			setNodes((nodes) => applyNodeChanges(changes, nodes));
		},
		[setNodes],
	);
	const onNodeDragStart = useCallback<OnNodeDrag>((_, node) => {
		setNodes((nodes) =>
			nodes.map((n) => (n.id === node.id ? { ...n, selected: false } : n)),
		);
	}, []);
	const onNodeDragStop = useCallback<OnNodeDrag<any>>(
		(_, node) => {
			switch (node.type) {
				case "building":
					buildingMutation.mutate(
						{
							id: node.id,
							x: node.position.x,
							y: node.position.y,
						},
						{
							onSuccess() {
								updateIsValidMutation.mutate();
							},
						},
					);
					break;
				case "construction":
					break;
				case "queue":
					break;
				case "waypoint":
					waypointMutation.mutate({
						id: node.id,
						x: node.position.x,
						y: node.position.y,
					});
					break;
				default:
					break;
			}
		},
		[getIntersectingNodes, buildingMutation],
	);
	const onConnect = useCallback<OnConnect>(
		(params) => {
			const source = getNode(params.source);
			const target = getNode(params.target);

			if (!source || !target) {
				return;
			}

			switch (`${source.type}:${target.type}`) {
				case "building-route:waypoint-route":
					createBuildingWaypointMutation.mutate({
						buildingId: source.id,
						waypointId: target.id,
					});
					break;
				case "waypoint-route:building-route":
					createBuildingWaypointMutation.mutate({
						buildingId: target.id,
						waypointId: source.id,
					});
					break;
				case "waypoint-route:waypoint-route":
					createRouteMutation.mutate({
						userId,
						fromId: source.id,
						toId: target.id,
					});
					break;

				default:
					console.warn(`Unknown connection: ${source.type}:${target.type}`);
					break;
			}

			// setEdges((edges) => addEdge(params, edges));
		},
		[createRouteMutation],
	);
	const onConnectEnd = useCallback<OnConnectEnd>(
		(event, connectionState) => {
			if (!connectionState.isValid && connectionState.fromNode) {
				const { clientX, clientY } = (
					"changedTouches" in event ?
						event.changedTouches[0]
					:	event) as any;

				const coord = screenToFlowPosition({
					x: clientX - 32,
					y: clientY - 32,
				});
				const fromId = connectionState.fromNode.id;
				const { type } = connectionState.fromNode;

				createWaypointMutation.mutate(
					{
						userId,
						mapId,
						...coord,
					},
					{
						async onSuccess({ id }) {
							switch (type) {
								case "building-route":
									console.log("connecting building");
									break;

								case "waypoint-route":
									createRouteMutation.mutate({
										userId,
										fromId,
										toId: id,
									});
									break;
							}
						},
					},
				);
			}
		},
		[screenToFlowPosition, createWaypointMutation, createRouteMutation],
	);

	return (
		<>
			<div className={"flex flex-row"}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onNodeDragStart={onNodeDragStart}
					onNodeDragStop={onNodeDragStop}
					onConnect={onConnect}
					onConnectEnd={onConnectEnd}
					className={"grow h-screen"}
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
					onDoubleClick={useCallback(() => {
						navigate({
							search: {
								routing: !routing,
							},
						});
					}, [navigate, routing])}
					onEdgeClick={(_, edge) => {
						navigate({
							to: "/$locale/apps/derivean/map/$mapId/building/$buildingId/routes",
							params: { locale, buildingId: edge.source },
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
						maskColor={"rgba(0,0,0,0.2)"}
					/>
					<Background
						variant={BackgroundVariant.Lines}
						className={"bg-slate-50"}
						gap={32}
						size={1}
					/>

					<MapToolbar />
				</ReactFlow>
				<Outlet />
			</div>
		</>
	);
};
