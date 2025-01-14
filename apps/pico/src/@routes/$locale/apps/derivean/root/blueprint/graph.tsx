import dagre from "@dagrejs/dagre";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    Background,
    BackgroundVariant,
    ConnectionLineType,
    Controls,
    MiniMap,
    ReactFlow,
} from "@xyflow/react";
import React, { useEffect, useState } from "react";
import { z } from "zod";

export namespace withLayout {
	export interface Props {
		graph: dagre.graphlib.Graph;
		nodes: any[];
		edges: any[];
		size?: {
			width: number;
			height: number;
		};
	}
}

export const withLayout = ({
	graph,
	nodes,
	edges,
	size = { width: 172, height: 36 },
}: withLayout.Props) => {
	graph.setGraph({ rankdir: "LR", nodesep: 100, edgesep: 60, ranksep: 120 });

	nodes.forEach((node) => {
		graph.setNode(node.id, { width: size.width, height: size.height });
	});

	edges.forEach((edge) => {
		graph.setEdge(edge.source, edge.target);
	});

	dagre.layout(graph, {});

	return {
		nodes: nodes.map((node) => {
			const nodeWithPosition = graph.node(node.id);
			const newNode = {
				...node,
				targetPosition: "left",
				sourcePosition: "right",
				position: {
					x: nodeWithPosition.x - size.width / 2,
					y: nodeWithPosition.y - size.height / 2,
				},
			};

			return newNode;
		}),
		edges,
	};
};

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/graph",
)({
	validateSearch: zodValidator(
		z.object({
			selection: z.array(z.string()).default([]),
		}),
	),
	async loader({ context: { kysely } }) {
		const nodes = await kysely.transaction().execute(async (tx) => {
			return (
				await tx
					.selectFrom("Blueprint")
					.select(["Blueprint.id", "Blueprint.name"])
					.execute()
			).map(({ id, name }) => ({
				id,
				position: { x: 0, y: 0 },
				data: { label: name },
			}));
		});

		const edges = await kysely.transaction().execute(async (tx) => {
			return (
				await tx
					.selectFrom("Blueprint_Dependency")
					.select(["id", "blueprintId", "dependencyId"])
					.execute()
			).map(({ id, blueprintId, dependencyId }) => {
				return {
					id,
					source: dependencyId,
					target: blueprintId,
					type: ConnectionLineType.Bezier,
				};
			});
		});

		return withLayout({
			graph: new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({})),
			nodes,
			edges,
		});
	},
	component() {
		const data = Route.useLoaderData();
		const { selection } = Route.useSearch();
		const [nodes, setNodes] = useState(data.nodes);
		const [edges, setEdges] = useState(data.edges);
		const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([]);
		const [highlightedEdgeIds, setHighlightedEdgeIds] = useState<string[]>([]);
		const navigate = Route.useNavigate();

		const findConnectedNodes = (startNodeId: string) => {
			const visitedNodes = new Set<string>();
			const visitedEdges = new Set<string>();
			const queue: string[] = [startNodeId];

			while (queue.length > 0) {
				const currentNode = queue.shift();
				if (currentNode && !visitedNodes.has(currentNode)) {
					visitedNodes.add(currentNode);

					edges.forEach((edge) => {
						if (edge.source === currentNode) {
							visitedEdges.add(edge.id);
							queue.push(edge.target);
						}
					});
				}
			}

			return {
				nodes: Array.from(visitedNodes),
				edges: Array.from(visitedEdges),
			};
		};

		const handleNodeClick = (_: React.MouseEvent, node: any) => {
			const { nodes: connectedNodes, edges: connectedEdges } =
				findConnectedNodes(node.id);
			setHighlightedNodeIds(connectedNodes);
			setHighlightedEdgeIds(connectedEdges);
		};

		const updatedNodes = nodes.map((node) => ({
			...node,
			style:
				highlightedNodeIds.includes(node.id) ?
					{
						...node.style,
						border: "2px solid #007BFF",
						backgroundColor: "#E8F0FE",
						boxShadow: "none",
					}
				:	node.style,
		}));

		const updatedEdges = edges.map((edge) => ({
			...edge,
			style: {
				stroke: highlightedEdgeIds.includes(edge.id) ? "#007BFF" : "#CCC",
				strokeWidth: highlightedEdgeIds.includes(edge.id) ? 2 : 1,
			},
		}));

		useEffect(() => {
			if (selection.length > 0) {
				const { nodes: connectedNodes, edges: connectedEdges } =
					findConnectedNodes(selection[0]!);
				setHighlightedNodeIds(connectedNodes);
				setHighlightedEdgeIds(connectedEdges);
			}
		}, [...selection]);

		return (
			<div
				className={
					"w-fit h-fit mx-auto border border-slate-300 rounded-md shadow-md m-8"
				}
			>
				<div style={{ width: "95vw", height: "85vh" }}>
					<ReactFlow
						nodes={updatedNodes}
						edges={updatedEdges}
						onNodeClick={handleNodeClick}
						onPaneClick={() => {
							setHighlightedNodeIds([]);
							setHighlightedEdgeIds([]);
						}}
						fitView
						snapGrid={[16, 16]}
						elementsSelectable={false}
						onNodeDoubleClick={(_, node) => {
							navigate({
								to: "/$locale/apps/derivean/root/blueprint/list",
								search: { filter: { id: node.id } },
							});
						}}
					>
						<Controls
							orientation={"horizontal"}
							showInteractive={false}
						/>
						<MiniMap />
						<Background
							variant={BackgroundVariant.Dots}
							gap={12}
							size={1}
						/>
					</ReactFlow>
				</div>
			</div>
		);
	},
});
