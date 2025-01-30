import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withProduction {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withProduction = async ({
	tx,
	userId,
	mapId,
}: withProduction.Props) => {
	console.info("\t=== Production");

	const productionQueue = await tx
		.selectFrom("Production as p")
		.innerJoin("Building as b", "b.id", "p.buildingId")
		.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
		.innerJoin("Land as l", "l.id", "b.landId")
		.innerJoin("Blueprint_Production as bp", "bp.id", "p.blueprintProductionId")
		.innerJoin("Resource as r", "r.id", "bp.resourceId")
		.select([
			"p.id",
			"p.buildingId",
			"bl.name as building",
			"p.cycle",
			"p.cycles",
			"bp.resourceId",
			"p.blueprintProductionId",
			"r.name as resource",
			"bp.amount",
		])
		.where("p.userId", "=", userId)
		.where("l.mapId", "=", mapId)
		.execute();

	if (!productionQueue.length) {
		console.info("\t\t-- Production queue is empty");
	}

	for await (const {
		id,
		buildingId,
		resourceId,
		cycle,
		cycles,
		amount,
		building,
		resource,
	} of productionQueue) {
		console.info("\t\t-- Resolving production", {
			building,
			cycle,
			cycles,
			amount,
			resource,
		});

		if (cycle < cycles) {
			console.info("\t\t\t-- Not ready yet");

			await tx
				.updateTable("Production")
				.set("cycle", cycle + 1)
				.where("id", "=", id)
				.execute();
			continue;
		}

		const storageInventory = await tx
			.selectFrom("Inventory as i")
			.select(["i.id", "i.amount", "i.limit"])
			.where(
				"i.id",
				"in",
				tx
					.selectFrom("Building_Inventory as bi")
					.select("bi.inventoryId")
					.where("bi.buildingId", "=", buildingId),
			)
			.where("i.resourceId", "=", resourceId)
			.where("i.type", "=", "storage")
			.executeTakeFirst();

		if (
			storageInventory &&
			(storageInventory.limit > 0 ?
				storageInventory.amount + amount <= storageInventory.limit
			:	true)
		) {
			console.info("\t\t\t-- Resources produced, moving to inventory", {
				amount,
			});

			await tx
				.updateTable("Inventory")
				.set({
					amount: storageInventory.amount + amount,
				})
				.where("id", "=", storageInventory.id)
				.execute();

			await tx.deleteFrom("Production as p").where("p.id", "=", id).execute();

			continue;
		}

		console.info("\t\t\t-- Not enough storage capacity");
	}

	console.info("\t-- Done");
};
