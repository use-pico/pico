import { genId } from "@use-pico/common";
import { bidirectional } from "graphology-shortest-path/unweighted";
import { dfsFromNode } from "graphology-traversal/dfs";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withBuildingGraph } from "~/app/derivean/service/withBuildingGraph";

export namespace withBuildingRouteBuilding {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withBuildingRouteBuilding = async ({
	tx,
	userId,
	mapId,
}: withBuildingRouteBuilding.Props) => {
	await tx
		.deleteFrom("Building_Route_Building as brb")
		.where("brb.userId", "=", userId)
		.execute();

	const { buildings, graph } = await withBuildingGraph({ tx, userId, mapId });

	const related = new Map<string, { buildingId: string; linkId: string }>();
	for (const { id } of buildings) {
		dfsFromNode(graph, id, (node, attr, depth) => {
			if (attr.type === "building" && id !== node) {
				related.set(`${id}-${node}`, { buildingId: id, linkId: node });
			}

			return depth >= 50;
		});
	}

	const inserts = [...related.values()]
		.filter(({ buildingId, linkId }) => {
			const path = bidirectional(graph, buildingId, linkId);
			if (!path) {
				return false;
			}
			/**
			 * Omit buildings from both sides.
			 */
			path.shift();
			path.pop();
			/**
			 * Buildings can be connected only by buildings.
			 */
			return path.every((node) => {
				return graph.getNodeAttribute(node, "type") === "waypoint";
			});
		})
		.map((item) => ({
			id: genId(),
			mapId,
			userId,
			...item,
		}));

	inserts.length > 0 &&
		(await tx.insertInto("Building_Route_Building").values(inserts).execute());
};
