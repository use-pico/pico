import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withTransport {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withTransport = async ({
	tx,
	userId,
	mapId,
}: withTransport.Props) => {
	const demandList = await tx
		.selectFrom("Demand as d")
		.innerJoin("Building as b", "b.id", "d.buildingId")
		.innerJoin("Land as l", "l.id", "b.landId")
		.select(["d.id", "d.amount", "d.resourceId", "d.buildingId", "d.type"])
		.where("b.userId", "=", userId)
		.where("l.mapId", "=", mapId)
		.orderBy("d.priority", "desc")
		.execute();

	for await (const demand of demandList) {
		const supplyList = await tx
			.selectFrom("Supply as s")
			.selectAll()
			.where("s.resourceId", "=", demand.resourceId)
			.where(
				"s.buildingId",
				"in",
				tx
					.withRecursive("ConnectedWaypoints", (qb) =>
						qb
							.selectFrom("Building_Waypoint as bw")
							.where("bw.buildingId", "=", demand.buildingId)
							.select(["bw.waypointId"])
							.unionAll(
								qb
									.selectFrom("Route as r")
									.innerJoin(
										"ConnectedWaypoints as cw",
										"cw.waypointId",
										"r.fromId",
									)
									.select(["r.toId as waypointId"]),
							),
					)
					.selectFrom("ConnectedWaypoints as cw")
					.innerJoin(
						"Building_Waypoint as bw",
						"bw.waypointId",
						"cw.waypointId",
					)
					.innerJoin("Building as b", "b.id", "bw.buildingId")
					.innerJoin("Land as l", "l.id", "b.landId")
					.where("b.id", "!=", demand.buildingId)
					.where("l.mapId", "=", mapId)
					.select(["b.id as buildingId"])
					.distinct(),
			)
			.execute();

		for await (const supply of supplyList) {
			const sourceInventory = await tx
				.selectFrom("Inventory as i")
				.select(["i.id", "i.amount", "i.limit"])
				.where(
					"i.id",
					"in",
					tx
						.selectFrom("Building_Inventory as bi")
						.select("bi.inventoryId")
						.where("bi.buildingId", "=", supply.buildingId),
				)
				.where("i.resourceId", "=", supply.resourceId)
				.where("i.type", "=", "storage")
				.orderBy("i.amount", "desc")
				.executeTakeFirst();

			const targetInventory = await tx
				.selectFrom("Inventory as i")
				.select(["i.id", "i.amount", "i.limit"])
				.where(
					"i.id",
					"in",
					tx
						.selectFrom("Building_Inventory as bi")
						.select("bi.inventoryId")
						.where("bi.buildingId", "=", demand.buildingId),
				)
				.where("i.resourceId", "=", supply.resourceId)
				.where("i.type", "=", demand.type)
				.orderBy("i.amount", "asc")
				.executeTakeFirst();

			if (!sourceInventory || !targetInventory) {
				console.log("Source or target is not compatible");
				continue;
			}
			const transferableAmount = Math.max(
				0,
				Math.min(
					Math.min(sourceInventory.amount, demand.amount),
					targetInventory.limit - targetInventory.amount,
				),
			);

			if (transferableAmount > 0) {
				await tx
					.updateTable("Demand")
					.set({ amount: demand.amount - transferableAmount })
					.where("id", "=", demand.id)
					.execute();

				await tx
					.updateTable("Inventory")
					.set({ amount: sourceInventory.amount - transferableAmount })
					.where("id", "=", sourceInventory.id)
					.execute();
				await tx
					.updateTable("Inventory")
					.set({ amount: targetInventory.amount + transferableAmount })
					.where("id", "=", targetInventory.id)
					.execute();
			}
		}
	}

	await tx.deleteFrom("Demand").where("amount", "<=", 0).execute();
};
