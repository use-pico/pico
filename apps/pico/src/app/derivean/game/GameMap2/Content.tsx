import { useMutation } from "@tanstack/react-query";
import { Outlet, useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, useInvalidator } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import {
    applyNodeChanges,
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow,
    useNodesState,
    useReactFlow,
} from "@xyflow/react";
import { useEffect, useMemo, type FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { CycleButton } from "~/app/derivean/game/CycleButton";
import { ConstructionNode } from "~/app/derivean/game/GameMap2/Node/ConstructionNode";
import { QueueNode } from "~/app/derivean/game/GameMap2/Node/QueueNode";
import type { ConstructionSchema } from "~/app/derivean/game/GameMap2/schema/ConstructionSchema";
import type { QueueSchema } from "~/app/derivean/game/GameMap2/schema/QueueSchema";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";

const width = 256;
const height = width / 4;

const NodeCss = [
	"bg-white",
	"border-[4px]",
	"border-slate-300",
	"shadow-lg",
	"shadow-slate-300",
];

export namespace Content {
	export interface Props {
		userId: string;
		cycle: number;
		construction: ConstructionSchema.Type[];
		queue: QueueSchema.Type[];
		zoomToId?: string;
	}
}

export const Content: FC<Content.Props> = ({
	userId,
	cycle,
	construction,
	queue,
	zoomToId,
}) => {
	const invalidator = useInvalidator([]);
	const { locale } = useParams({ from: "/$locale" });
	const constructionNodes = useMemo(
		() =>
			construction.map((construction) => ({
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
		[construction],
	);
	const queueNodes = useMemo(
		() =>
			queue.map((queue) => ({
				id: queue.id,
				data: queue,
				position: {
					x: queue.x,
					y: queue.y,
				},
				type: "queue",
				draggable: false,
				width,
				height,
				className: tvc(NodeCss),
			})),
		[queue],
	);
	const defaultNodes = useMemo(
		() => [...constructionNodes, ...queueNodes],
		[constructionNodes, queueNodes],
	);
	const [nodes, setNodes] = useNodesState(defaultNodes);
	const { updateNode, getIntersectingNodes, fitView } = useReactFlow();

	useEffect(() => {
		setNodes(defaultNodes);
	}, [defaultNodes]);

	useEffect(() => {
		zoomToId &&
			setTimeout(() => {
				fitView({
					nodes: [{ id: zoomToId }],
					duration: 750,
					minZoom: 1,
					maxZoom: 1,
				});
			}, 250);
	}, [fitView, zoomToId]);

	const updatePositionMutation = useMutation({
		mutationKey: ["Construction", "position"],
		async mutationFn({
			constructionId,
			x,
			y,
			valid,
		}: {
			constructionId: string;
			x: number;
			y: number;
			valid: boolean;
		}) {
			return kysely.transaction().execute(async (tx) => {
				await tx
					.selectFrom("Construction as c")
					.select(["c.id"])
					.where("c.plan", "=", true)
					.where("c.id", "=", constructionId)
					.executeTakeFirstOrThrow(
						() => new Error("Construction not found or not planned."),
					);

				return tx
					.updateTable("Construction")
					.set({ x, y, valid })
					.where("id", "=", constructionId)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<>
			<div className={"flex flex-row"}>
				<ReactFlow
					nodes={nodes}
					onNodesChange={(changes) => {
						setNodes((nodes) => applyNodeChanges(changes, nodes));
					}}
					onNodeDrag={(_, node) => {
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
					}}
					onNodeDragStop={(_, node) => {
						if (node.type === "construction") {
							const isOverlapping = getIntersectingNodes(node).length > 0;

							updatePositionMutation.mutate({
								constructionId: node.id,
								x: node.position.x,
								y: node.position.y,
								valid: !isOverlapping,
							});
						}
					}}
					className={"flex-grow h-screen"}
					fitView
					snapToGrid
					snapGrid={[32, 32]}
					elementsSelectable={false}
					nodeTypes={useMemo(
						() => ({
							construction: ConstructionNode,
							queue: QueueNode,
						}),
						[],
					)}
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
							icon={InventoryIcon}
							to={"/$locale/apps/derivean/map/inventory"}
							params={{ locale }}
						/>
					</div>
				</ReactFlow>
				<Outlet />
			</div>
		</>
	);
};
