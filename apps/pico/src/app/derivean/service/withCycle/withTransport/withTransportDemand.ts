import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withBuildingGraph } from "~/app/derivean/service/withBuildingGraph";
import { withShortestPath } from "~/app/derivean/service/withShortestPath";

export namespace withTransportDemand {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withTransportDemand = async ({
	tx,
	userId,
	mapId,
}: withTransportDemand.Props) => {
	console.info("\t=== Transport");

	const demands = await tx
		.selectFrom("Demand as d")
		.innerJoin("Building as b", "b.id", "d.buildingId")
		.innerJoin("Blueprint as bp", "bp.id", "b.blueprintId")
		.innerJoin("Resource as r", "r.id", "d.resourceId")
		.select([
			"d.id",
			"d.amount",
			"d.resourceId",
			"d.buildingId",
			"bp.name as building",
			"d.type",
			"r.name as resource",
		])
		.where("d.userId", "=", userId)
		.where("d.mapId", "=", mapId)
		.orderBy("d.priority", "desc")
		.execute();

	if (!demands.length) {
		console.info("\t\t-- No demands");
	}

	const { graph } = await withBuildingGraph({ tx, userId, mapId });

	for await (const {
		id,
		amount,
		resourceId,
		resource,
		building,
		buildingId: targetId,
		type,
	} of demands) {
		console.info("\t\t-- Resolving demand", {
			building,
			resource,
			amount,
			type,
		});

		const supplies = await tx
			.selectFrom("Supply as s")
			.innerJoin("Building as b", "b.id", "s.buildingId")
			.innerJoin("Blueprint as bp", "bp.id", "b.blueprintId")
			.innerJoin("Building_Inventory as bi", "bi.buildingId", "s.buildingId")
			.innerJoin("Inventory as i", "i.id", "bi.inventoryId")
			.select([
				"s.buildingId",
				"bp.name as building",
				"i.id as inventoryId",
				"i.amount as available",
			])
			.where("s.userId", "=", userId)
			.where("s.mapId", "=", mapId)
			.where("s.resourceId", "=", resourceId)
			.where("i.type", "=", "storage")
			.whereRef("i.resourceId", "=", "s.resourceId")
			.where("i.amount", ">", 0)
			.execute();

		if (!supplies.length) {
			console.info("\t\t\t-- Demanded resource is not available");
			continue;
		}

		let remaining = amount;

		for await (const {
			inventoryId,
			building,
			buildingId: sourceId,
			available,
		} of supplies) {
			console.info("\t\t\t-- Resolving supply from", {
				building,
				available,
				remaining,
			});

			if (remaining <= 0) {
				console.info("\t\t\t\t-- Demand fulfilled");
				break;
			}

			/**
			 * Ensure there is a path between the target building and the source building
			 */
			const path = withShortestPath({
				mode: "waypoint",
				graph,
				from: sourceId,
				to: targetId,
			});

			if (!path) {
				console.info("\t\t\t\t-- No path available for this transport");
				continue;
			}

			const route = path.slice(1, -1);

			const waypointId = route.shift();
			if (!waypointId) {
				console.info(
					"\t\t\t\t-- No waypoint available for this transport (path too short?)",
				);
				continue;
			}

			const transfer = Math.min(remaining, available);

			await tx
				.updateTable("Inventory")
				.set({ amount: available - transfer })
				.where("id", "=", inventoryId)
				.execute();

			remaining -= transfer;

			console.info("\t\t\t\t-- Transporting", {
				transfer,
				remaining,
			});

			/**
			 * TODO Resolve distance between building and it's waypoint.
			 *
			 * Currently, transport gets instantly to the target waypoint regardless of the distance.
			 */

			await tx
				.insertInto("Transport")
				.values({
					id: genId(),
					userId,
					mapId,
					sourceId,
					targetId,
					resourceId,
					amount: transfer,
					type,
					waypointId,
					progress: 0,
				})
				.execute();
		}

		await tx
			.updateTable("Demand")
			.set({ amount: remaining })
			.where("id", "=", id)
			.execute();

		console.info("\t\t-- Done");
	}

	console.info("\t-- Done");
};
