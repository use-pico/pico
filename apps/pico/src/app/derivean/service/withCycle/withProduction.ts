import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withProductionQueue } from "~/app/derivean/service/withProductionQueue";

export namespace withProduction {
	export interface Props {
		tx: WithTransaction;
		userId: string;
	}
}

export const withProduction = async ({ tx, userId }: withProduction.Props) => {
	const productionQueue = await tx
		.selectFrom("Production as p")
		.innerJoin("Blueprint_Production as bp", "bp.id", "p.blueprintProductionId")
		.innerJoin("Resource as r", "r.id", "bp.resourceId")
		.select([
			"p.id",
			"p.buildingId",
			"p.cycle",
			"p.cycles",
			"bp.resourceId",
			"r.name",
			"bp.amount",
		])
		.where("userId", "=", userId)
		.execute();

	for await (const {
		id,
		buildingId,
		resourceId,
		cycle,
		cycles,
		amount,
	} of productionQueue) {
		if (cycle < cycles) {
			await tx
				.updateTable("Production")
				.set("cycle", cycle + 1)
				.where("id", "=", id)
				.execute();
			continue;
		}

		const outputInventory = await tx
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
			outputInventory &&
			(outputInventory.limit > 0 ?
				outputInventory.amount + amount <= outputInventory.limit
			:	true)
		) {
			await tx
				.updateTable("Inventory")
				.set({
					amount: outputInventory.amount + amount,
				})
				.where("id", "=", outputInventory.id)
				.execute();

			await tx.deleteFrom("Production as p").where("p.id", "=", id).execute();

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
	}

	const productionPlanQueue = await tx
		.selectFrom("Building as b")
		.select(["b.id as buildingId", "b.productionId"])
		.where("b.userId", "=", userId)
		.where("b.productionId", "is not", null)
		.execute();

	for await (const { buildingId, productionId } of productionPlanQueue) {
		try {
			const { count: queueSize } = await tx
				.selectFrom("Production as p")
				.where("p.buildingId", "=", buildingId)
				.select((eb) => eb.fn.count<number>("p.id").as("count"))
				.executeTakeFirstOrThrow();

			if (queueSize > 0) {
				continue;
			}

			await withProductionQueue({
				tx,
				blueprintProductionId: productionId!,
				buildingId,
				userId,
			});

			await tx
				.updateTable("Building")
				.set({ productionId: null })
				.where("id", "=", buildingId)
				.execute();
		} catch (_) {
			// Probably not enough resources or something like that.
		}
	}

	const recurringProductionPlanQueue = await tx
		.selectFrom("Building as b")
		.select(["b.id as buildingId", "b.recurringProductionId"])
		.where("b.userId", "=", userId)
		.where("b.recurringProductionId", "is not", null)
		.execute();

	for await (const {
		buildingId,
		recurringProductionId,
	} of recurringProductionPlanQueue) {
		try {
			const { count: queueSize } = await tx
				.selectFrom("Production as p")
				.where("p.buildingId", "=", buildingId)
				.select((eb) => eb.fn.count<number>("p.id").as("count"))
				.executeTakeFirstOrThrow();

			if (queueSize > 0) {
				continue;
			}

			await withProductionQueue({
				tx,
				blueprintProductionId: recurringProductionId!,
				buildingId,
				userId,
			});
		} catch (_) {
			// Probably not enough resources or something like that.
		}
	}
};
