import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withBuildingGraph } from "~/app/derivean/service/withBuildingGraph";
import { withShortestPath } from "~/app/derivean/service/withShortestPath";

export namespace withTransportRoute {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withTransportRoute = async ({
	tx,
	userId,
	mapId,
}: withTransportRoute.Props) => {
	console.info("\t\t=== Planning transports");

	const paths = new Map<string, string[]>();
	const { graph } = await withBuildingGraph({ tx, userId, mapId });

	/**
	 * Move all existing goods first before planning new transports as it would instantly
	 * move new goods otherwise.
	 */
	const transportList = await tx
		.selectFrom("Transport as t")
		.innerJoin("Resource as r", "r.id", "t.resourceId")
		.innerJoin("Building as bt", "bt.id", "t.targetId")
		.innerJoin("Blueprint as blt", "blt.id", "bt.blueprintId")
		.innerJoin("Building as bs", "bs.id", "t.sourceId")
		.innerJoin("Blueprint as bls", "bls.id", "bs.blueprintId")
		.select([
			"t.id",
			"t.waypointId",
			"t.amount",
			"t.targetId",
			"blt.name as target",
			"bls.name as source",
			"t.resourceId",
			"t.type",
			"r.name as resource",
		])
		.where("t.userId", "=", userId)
		.where("t.mapId", "=", mapId)
		.execute();

	if (!transportList.length) {
		console.info("\t\t\t-- No current transports");
	}

	for await (const {
		id,
		waypointId,
		targetId,
		resourceId,
		amount,
		type,
		resource,
		source,
		target,
	} of transportList) {
		console.info("\t\t\t-- Resolving transport", {
			source,
			target,
			resource,
			type,
			amount,
		});

		const pathId = `${waypointId}-${targetId}`;
		if (!paths.has(pathId)) {
			const path = withShortestPath({
				mode: "waypoint",
				graph,
				from: waypointId,
				to: targetId,
			});

			if (!path) {
				console.info(
					"\t\t\t\t-- There is no available path (through waypoints)",
				);
				continue;
			}

			paths.set(pathId, path);

			console.info("\t\t\t\t-- Path found", path);
		}

		/**
		 * Here we're sure a path exists.
		 */
		const path = [...(paths.get(pathId) || [])];

		const route = path.slice(1, -1);

		/**
		 * We're at the end, move the goods to target inventory.
		 *
		 * No more waypoints, just move the goods to the target building.
		 */
		if (!route.length) {
			const inventory = await tx
				.selectFrom("Inventory as i")
				.select(["i.id", "i.amount", "i.limit"])
				.where("i.resourceId", "=", resourceId)
				.where(
					"i.id",
					"in",
					tx
						.selectFrom("Building_Inventory as bi")
						.select("bi.inventoryId")
						.where("bi.buildingId", "=", targetId),
				)
				.where("i.type", "=", type)
				.executeTakeFirst();

			if (!inventory) {
				console.warn("Target building does not support this resource", {
					targetId,
					resourceId,
				});
				continue;
			}

			const transferableAmount = Math.min(
				amount,
				inventory.limit - inventory.amount,
			);

			console.info("\t\t\t\t-- Moving goods to target building", {
				amount: transferableAmount,
			});

			await tx
				.updateTable("Inventory")
				.set({
					amount: transferableAmount,
				})
				.where("id", "=", inventory.id)
				.execute();

			/**
			 * Update transport amount. If it's <= zero, it will be removed later.
			 */
			await tx
				.updateTable("Transport")
				.set({ amount: amount - transferableAmount })
				.where("id", "=", id)
				.execute();

			continue;
		}

		console.info("\t\t\t\t-- Moving to next waypoint", {
			waypointId: route[0],
		});

		/**
		 * Move the goods to the next waypoint.
		 */
		await tx
			.updateTable("Transport")
			.set({
				waypointId: route.shift(),
			})
			.where("id", "=", id)
			.execute();
	}

	/**
	 * Clear cache as it's not needed anymore.
	 */
	paths.clear();

	console.info("\t\t\t-- Processing demands");

	const demandList = await tx
		.selectFrom("Demand as d")
		.innerJoin("Building as bb", "bb.id", "d.buildingId")
		.innerJoin("Blueprint as bpb", "bpb.id", "bb.blueprintId")
		.innerJoin("Building as bs", "bs.id", "d.supplierId")
		.innerJoin("Blueprint as bps", "bps.id", "bs.blueprintId")
		.innerJoin("Resource as r", "r.id", "d.resourceId")
		.select([
			"d.id",
			"d.buildingId",
			"bpb.name as building",
			"bps.name as supplier",
			"d.supplierId",
			"d.amount",
			"d.resourceId",
			"d.type",
			"r.name as resource",
		])
		.where("d.userId", "=", userId)
		.where("d.mapId", "=", mapId)
		.where("d.supplierId", "is not", null)
		.execute();

	if (!demandList.length) {
		console.info("\t\t\t\t-- There are no current demands");
	}

	for await (const {
		id,
		buildingId,
		supplierId,
		amount,
		resourceId,
		type,
		supplier,
		building,
		resource,
	} of demandList) {
		/**
		 * This is not necessary, but kysely cannot infer right type when "is not null" is used.
		 */
		if (!supplierId) {
			continue;
		}

		console.info("\t\t\t-- Resolving demand", {
			building,
			supplier,
			resource,
			amount,
			type,
		});

		const pathId = `${buildingId}-${supplierId}`;
		if (!paths.has(pathId)) {
			const path = withShortestPath({
				mode: "waypoint",
				graph,
				from: supplierId,
				to: buildingId,
			});
			if (!path) {
				console.info(
					"\t\t\t\t-- There is no available path (through waypoints)",
				);
				continue;
			}
			paths.set(pathId, path);
		}

		const path = [...(paths.get(pathId) || [])];
		if (path.length < 2) {
			console.warn("Path too short, skipping", path);
			continue;
		}

		/**
		 * First is the source building.
		 */
		const sourceId = path.shift();
		/**
		 * Second is the first waypoint.
		 */
		const waypointId = path.shift();
		/**
		 * Last is the target building.
		 */
		const targetId = path.pop();

		if (!sourceId || !targetId || !waypointId) {
			console.warn("Source or target not found");
			continue;
		}

		const inventory = await tx
			.selectFrom("Inventory as i")
			.innerJoin("Resource as r", "r.id", "i.resourceId")
			.select(["i.id", "i.amount", "r.name"])
			.where(
				"i.id",
				"in",
				tx
					.selectFrom("Building_Inventory as bi")
					.select("bi.inventoryId")
					.where("bi.buildingId", "=", sourceId),
			)
			.where("i.resourceId", "=", resourceId)
			.where("i.amount", ">=", amount)
			.executeTakeFirst();

		/**
		 * Everything is fine, we can move the goods.
		 */
		if (inventory) {
			console.info("\t\t\t\t-- Moving goods from source to waypoint", {
				amount: inventory.amount - amount,
			});

			await tx
				.updateTable("Inventory")
				.set({
					amount: inventory.amount - amount,
				})
				.where("id", "=", inventory.id)
				.execute();

			/**
			 * We're sure we have enough resources, so we can load them to the transport.
			 */

			await tx
				.insertInto("Transport")
				.values({
					id: genId(),
					mapId,
					userId,
					waypointId,
					sourceId,
					targetId,
					resourceId,
					amount,
					type,
				})
				.execute();
		} else {
			console.info("\t\t\t\t-- Not enough resources, planning again");
		}

		/**
		 * Either way, remove demand (both cases: it's already satisfied or it should be planned again).
		 */
		await tx.deleteFrom("Demand").where("id", "=", id).execute();
	}

	/**
	 * Delete finished transports.
	 */
	await tx.deleteFrom("Transport").where("amount", "<=", 0).execute();

	console.info("\t\t-- Done");
};
