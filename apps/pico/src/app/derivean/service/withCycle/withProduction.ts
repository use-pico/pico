import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withProductionQueue } from "~/app/derivean/service/withProductionQueue";

export namespace withProduction {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		currentCycle: number;
	}
}

export const withProduction = async ({
	tx,
	userId,
	currentCycle,
}: withProduction.Props) => {
	const productionQueue = await tx
		.selectFrom("Production as p")
		.innerJoin("Blueprint_Production as bp", "bp.id", "p.blueprintProductionId")
		.innerJoin("Resource as r", "r.id", "bp.resourceId")
		.select([
			"p.id",
			"p.buildingId",
			"p.cycle",
			"p.to",
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
		to,
		amount,
	} of productionQueue) {
		if (currentCycle > to) {
			const inventory = await tx
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
				.executeTakeFirst();

			if (!inventory) {
				continue;
			}

			if (inventory.limit > 0 && inventory.amount + amount > inventory.limit) {
				continue;
			}

			await tx
				.updateTable("Inventory")
				.set({
					amount: inventory.amount + amount,
				})
				.where("id", "=", inventory.id)
				.execute();

			await tx.deleteFrom("Production as p").where("p.id", "=", id).execute();

			continue;
		}

		await tx
			.updateTable("Production")
			.set("cycle", cycle + 1)
			.where("id", "=", id)
			.execute();
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
