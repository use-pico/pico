import dagre from "@dagrejs/dagre";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { ConnectionLineType } from "@xyflow/react";
import { z } from "zod";
import { Editor } from "~/app/derivean/root/Editor";

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
	size = { width: 344, height: 36 },
}: withLayout.Props) => {
	graph.setGraph({ rankdir: "LR", nodesep: 75, edgesep: 30, ranksep: 120 });

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

export const Route = createFileRoute("/$locale/apps/derivean/root/editor")({
	validateSearch: zodValidator(
		z.object({
			selection: z.array(z.string()).default([]),
		}),
	),
	async loader({ context: { kysely } }) {
		const blueprints = (
			await kysely
				.selectFrom("Blueprint")
				.select([
					"id",
					"name",
					"productionLimit",
					"cycles",
					"upgradeId",
					"sort",
				])
				.execute()
		).map((data) => ({
			id: data.id,
			position: { x: 0, y: 0 },
			data,
			type: "blueprint",
		}));

		const blueprintDependencies = (
			await kysely
				.selectFrom("Blueprint_Dependency")
				.select(["id", "blueprintId", "dependencyId"])
				.execute()
		).map(({ id, blueprintId, dependencyId }) => {
			return {
				id,
				source: dependencyId,
				target: blueprintId,
				type: ConnectionLineType.SmoothStep,
			};
		});

		return withLayout({
			graph: new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({})),
			nodes: [...blueprints],
			edges: [...blueprintDependencies],
		});
	},
	component() {
		const data = Route.useLoaderData();
		const { selection } = Route.useSearch();

		return (
			<Editor
				data={data}
				selectionId={selection?.[0]}
			/>
		);
	},
});
