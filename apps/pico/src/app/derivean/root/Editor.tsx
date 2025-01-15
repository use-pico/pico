import { useMutation } from "@tanstack/react-query";
import { CloseIcon, Icon, LoaderIcon, useInvalidator } from "@use-pico/client";
import { genId, tvc } from "@use-pico/common";
import {
    Background,
    BackgroundVariant,
    BaseEdge,
    Controls,
    EdgeLabelRenderer,
    getBezierPath,
    MiniMap,
    ReactFlow,
    useReactFlow,
} from "@xyflow/react";
import { useMemo, type FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { BlueprintNode } from "~/app/derivean/root/Editor/BlueprintNode";

export namespace Editor {
	export interface Data {
		nodes: any[];
		edges: any[];
	}

	export interface Props {
		data: Data;
	}
}

export const Editor: FC<Editor.Props> = ({ data }) => {
	const invalidator = useInvalidator([]);

	const dependencyMutation = useMutation({
		async mutationFn({
			blueprintId,
			dependencyId,
		}: {
			blueprintId: string;
			dependencyId: string;
		}) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.insertInto("Blueprint_Dependency")
					.values({
						id: genId(),
						blueprintId,
						dependencyId,
					})
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<div
			className={
				"w-fit h-fit mx-auto border border-slate-300 rounded-md shadow-md m-8"
			}
		>
			<div style={{ width: "95vw", height: "85vh" }}>
				<ReactFlow
					nodes={data.nodes}
					edges={data.edges}
					onConnect={(params) => {
						dependencyMutation.mutate({
							blueprintId: params.target,
							dependencyId: params.source,
						});
					}}
					fitView
					snapGrid={[16, 16]}
					elementsSelectable={false}
					nodeTypes={useMemo(
						() => ({
							blueprint(props) {
								return <BlueprintNode {...props} />;
							},
						}),
						[],
					)}
					edgeTypes={useMemo(
						() => ({
							dependency({
								id,
								sourceX,
								sourceY,
								targetX,
								targetY,
								sourcePosition,
								targetPosition,
								style = {},
								markerEnd,
							}) {
								const { setEdges } = useReactFlow();
								const [edgePath, labelX, labelY] = getBezierPath({
									sourceX,
									sourceY,
									sourcePosition,
									targetX,
									targetY,
									targetPosition,
								});

								const invalidator = useInvalidator([]);

								const mutation = useMutation({
									async mutationFn({ id }: { id: string }) {
										return kysely.transaction().execute(async (tx) => {
											await tx
												.deleteFrom("Blueprint_Dependency")
												.where("id", "=", id)
												.execute();
										});
									},
									async onSuccess() {
										setEdges((edges) => edges.filter((edge) => edge.id !== id));
										await invalidator();
									},
								});

								return (
									<>
										<BaseEdge
											path={edgePath}
											markerEnd={markerEnd}
											style={style}
										/>
										<EdgeLabelRenderer>
											<div
												className={tvc("nodrag nopan", [
													"flex",
													"items-center",
													"justify-center",
													"cursor-pointer",
													"bg-red-200",
													"text-red-500",
													"border",
													"border-red-300",
													"hover:border-red-600",
													"hover:bg-red-300",
													"hover:text-red-700",
													"rounded-full",
													"w-4",
													"h-4",
												])}
												style={{
													position: "absolute",
													pointerEvents: "all",
													transformOrigin: "center",
													transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
												}}
											>
												<Icon
													icon={mutation.isPending ? LoaderIcon : CloseIcon}
													onClick={() => {
														mutation.mutate({ id });
													}}
												/>
											</div>
										</EdgeLabelRenderer>
									</>
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
