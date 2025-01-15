import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { BlueprintNode } from "~/app/derivean/root/Editor/BlueprintNode";
import { findConnectedNodes } from "~/app/derivean/utils/findConnectedNodes";

export namespace Editor {
	export interface Data {
		nodes: any[];
		edges: any[];
	}

	export interface Props {
		data: Data;
		selectionId?: string;
	}
}

export const Editor: FC<Editor.Props> = ({ data, selectionId }) => {
	const [nodes, setNodes] = useState(data.nodes);
	const [edges, setEdges] = useState(data.edges);

	const update = useCallback(
		(connections: { nodes: string[]; edges: string[] }) => {
			setNodes(
				data.nodes.map((node) => ({
					...node,
					style:
						connections.nodes.includes(node.id) ?
							{
								...node.style,
								border: "2px solid #007BFF",
								backgroundColor: "#E8F0FE",
								boxShadow: "none",
							}
						:	node.style,
				})),
			);
			setEdges(
				data.edges.map((edge) => ({
					...edge,
					style:
						connections.edges.includes(edge.id) ?
							{
								stroke: "#007BFF",
								strokeWidth: 2,
							}
						:	edge.style,
				})),
			);
		},
		[],
	);

	useEffect(() => {
		if (selectionId) {
			update(
				findConnectedNodes({ startNodeId: selectionId, edges: data.edges }),
			);
		}
	}, [selectionId]);

	/**
	 * This expects data is a stable reference or a big kaboom will happen.
	 */
	useEffect(() => {
		setNodes(data.nodes);
		setEdges(data.edges);
	}, [data]);

	return (
		<div
			className={
				"w-fit h-fit mx-auto border border-slate-300 rounded-md shadow-md m-8"
			}
		>
			<div style={{ width: "95vw", height: "85vh" }}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onPaneClick={useCallback(() => {
						setNodes(data.nodes);
						setEdges(data.edges);
					}, [])}
					fitView
					snapGrid={[16, 16]}
					elementsSelectable={false}
					nodeTypes={useMemo(
						() => ({
							blueprint(props) {
								return (
									<BlueprintNode
										update={(id) =>
											update(findConnectedNodes({ startNodeId: id, edges }))
										}
										{...props}
									/>
								);
							},
						}),
						[],
					)}
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
};
