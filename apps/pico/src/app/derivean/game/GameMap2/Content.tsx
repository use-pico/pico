import { useMutation } from "@tanstack/react-query";
import { Outlet, useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, useInvalidator } from "@use-pico/client";
import { genId, tvc } from "@use-pico/common";
import {
    addEdge,
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
    type OnConnect,
    type OnNodeDrag,
    type OnNodesChange,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, type FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { CycleButton } from "~/app/derivean/game/CycleButton";
import { ConnectionLine } from "~/app/derivean/game/GameMap2/ConnectionLine";
import { RouteEdge } from "~/app/derivean/game/GameMap2/Edge/RouteEdge";
import { BuildingNode } from "~/app/derivean/game/GameMap2/Node/BuildingNode/BuildingNode";
import { BuildingRouteNode } from "~/app/derivean/game/GameMap2/Node/BuildingNode/BuildingRouteNode";
import { ConstructionNode } from "~/app/derivean/game/GameMap2/Node/ConstructionNode";
import { QueueNode } from "~/app/derivean/game/GameMap2/Node/QueueNode";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

const width = 256;
const height = width / 4;

const NodeCss = [
	"bg-white",
	"border-[4px]",
	"border-slate-300",
	"shadow-slate-200",
];

const connectionLineStyle = {
	stroke: "#b1b1b7",
};

const nodeTypes = {
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
	const defaultNodes = useMemo<any>(
		() => [
			...construction.map((construction) => ({
				id: construction.id,
				data: construction,
				position: {
					x: construction.x,
					y: construction.y,
				},
				type: "construction",
				width,
				height,
				className: tvc(NodeCss, [
					"z-10",
					construction.valid ? ["border-green-500"] : ["border-red-500"],
				]),
			})),
			...queue.map((queue) => ({
				id: queue.id,
				data: queue,
				position: {
					x: queue.x,
					y: queue.y,
				},
				type: routing ? "building-route" : "queue",
				width,
				height,
				className: tvc(NodeCss, ["nodrag"]),
			})),
			...building.map((building) => ({
				id: building.id,
				data: building,
				position: {
					x: building.x,
					y: building.y,
				},
				type: routing ? "building-route" : "building",
				width,
				height,
				className: tvc(NodeCss, ["nodrag"]),
			})),
		],
		[construction, queue, building, routing],
	);
	const defaultEdges = useMemo(
		() => [
			...route.map((route) => ({
				id: route.id,
				source: route.fromId,
				target: route.toId,
				type: "route",
				/**
				 * True if there are available resources in the source (from) and free space in target (to).
				 */
				animated: false,
				markerEnd: {
					type: MarkerType.ArrowClosed,
					color: "#b1b1b7",
				},
			})),
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
				const { constructionId } = await tx
					.selectFrom("Building as b")
					.innerJoin("Construction as c", "c.id", "b.constructionId")
					.select(["b.id", "b.constructionId"])
					.where("c.plan", "=", true)
					.where("b.id", "=", buildingId)
					.executeTakeFirstOrThrow(() => {
						return new Error("Construction not found or not planned.");
					});

				await tx
					.updateTable("Building")
					.set({ x, y })
					.where("id", "=", buildingId)
					.execute();

				await tx
					.updateTable("Construction")
					.set({ valid })
					/**
					 * Because of innerJoin, we are sure constructionId is present.
					 */
					.where("id", "=", constructionId!)
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
		(_, node) => {
			const isOverlapping = getIntersectingNodes(node).length > 0;

			updateNode(node.id, {
				...node,
				data: {
					...node.data,
					valid: !isOverlapping,
				},
				className: tvc([
					node.className,
					isOverlapping ? ["border-red-500"] : ["border-green-500"],
				]),
			});
		},
		[getIntersectingNodes, updateNode],
	);
	const onNodeDragStop = useCallback<OnNodeDrag<any>>(
		(_, node) => {
			if (node.type === "construction") {
				const isOverlapping = getIntersectingNodes(node).length > 0;

				updatePositionMutation.mutate({
					buildingId: node.id,
					x: node.position.x,
					y: node.position.y,
					valid: !isOverlapping,
				});
			}
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
		(params) =>
			setEdges((edges) => {
				routeMutation.mutate({ fromId: params.source, toId: params.target });
				return addEdge(params, edges);
			}),
		[setEdges],
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
				>
					<CycleButton
						userId={userId}
						cycle={cycle}
						css={{
							base: ["react-flow__panel", "absolute", "top-1", "right-1"],
						}}
					/>
					<Controls
						orientation={"horizontal"}
						showInteractive={false}
						showZoom={true}
					/>
					<MiniMap
						zoomable
						draggable
						pannable
					/>
					<Background
						variant={BackgroundVariant.Dots}
						gap={32}
						size={1}
					/>

					<div
						className={
							"react-flow__panel flex flex-row p-2 border bg-white border-slate-300 shadow-sm"
						}
					>
						<LinkTo
							icon={BackIcon}
							to={"/$locale/apps/derivean/game"}
							params={{ locale }}
						/>
						<LinkTo
							icon={BlueprintIcon}
							to={"/$locale/apps/derivean/map/construction"}
							params={{ locale }}
						/>
						<LinkTo
							icon={"icon-[gis--route-end]"}
							to={"/$locale/apps/derivean/map"}
							params={{ locale }}
							search={{ routing: !routing }}
							css={{ base: routing ? ["text-green-600"] : undefined }}
						/>
					</div>
				</ReactFlow>
				<Outlet />
			</div>
		</>
	);
};
