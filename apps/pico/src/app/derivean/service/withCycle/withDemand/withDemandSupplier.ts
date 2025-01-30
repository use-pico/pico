import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withDemandSupplier {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withDemandSupplier = async ({
	tx,
	userId,
	mapId,
}: withDemandSupplier.Props) => {
	const demandList = await tx
		.selectFrom("Demand as d")
		.innerJoin("Building as b", "b.id", "d.buildingId")
		.innerJoin("Blueprint as bp", "bp.id", "b.blueprintId")
		.innerJoin("Resource as r", "r.id", "d.resourceId")
		.where("d.userId", "=", userId)
		.where("d.mapId", "=", mapId)
		.select([
			"d.id",
			"d.buildingId",
			"bp.name",
			"r.name as resource",
			"d.resourceId",
			"d.type",
		])
		.execute();

	for await (const { id, buildingId, resourceId } of demandList) {
		/**
		 * Fetch any building....
		 */
		const building = await tx
			.selectFrom("Building as b")
			.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
			.innerJoin("Land as l", "l.id", "b.landId")
			.select(["b.id", "bl.name"])
			.where((eb) =>
				/**
				 * ...that supplies requested resource....
				 */
				eb.exists(
					eb
						.selectFrom("Supply as s")
						.select(["s.id"])
						.whereRef("s.buildingId", "=", "b.id")
						.where("s.resourceId", "=", resourceId),
				),
			)
			.where("b.id", "in", (eb) =>
				/**
				 * ...and see each other (they are connected - see Manifest)...
				 */
				eb
					.selectFrom("Building_Route_Building as brb")
					.select("brb.linkId")
					.whereRef("brb.linkId", "=", "b.id")
					.where("brb.buildingId", "=", buildingId),
			)
			.where("b.id", "in", (eb) =>
				eb
					.selectFrom("Building_Inventory as bi")
					.select("bi.buildingId")
					.whereRef("bi.buildingId", "=", "b.id")
					.where(
						"bi.inventoryId",
						"in",
						tx
							.selectFrom("Inventory as i")
							.select("i.id")
							.where("i.resourceId", "=", resourceId)
							.where("i.type", "=", "storage")
							.where("i.amount", ">", 0),
					),
			)
			.where("b.userId", "=", userId)
			.where("l.mapId", "=", mapId)
			.executeTakeFirst();

		await tx
			.updateTable("Demand")
			.set({
				supplierId: building ? building.id : null,
			})
			.where("id", "=", id)
			.execute();
	}
};
