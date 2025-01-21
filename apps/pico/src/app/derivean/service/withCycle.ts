import { DateTime, genId } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";
import { withProductionQueue } from "~/app/derivean/service/withProductionQueue";

export namespace withCycle {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withCycle = async ({ tx, userId }: withCycle.Props) => {
	await tx
		.insertInto("Cycle")
		.values({
			id: genId(),
			stamp: DateTime.now().toUTC().toSQLTime(),
			userId,
		})
		.execute();

	const currentCycle = (
		await tx
			.selectFrom("Cycle as c")
			.select((eb) => eb.fn.count<number>("c.id").as("count"))
			.where("c.userId", "=", userId)
			.executeTakeFirstOrThrow()
	).count;

	const constructionQueue = await tx
		.selectFrom("Construction as c")
		.select(["c.id", "c.cycle", "c.to", "c.blueprintId", "c.x", "c.y"])
		.where("userId", "=", userId)
		.where("c.plan", "=", false)
		.execute();

	for await (const { id, blueprintId, cycle, to, x, y } of constructionQueue) {
		if (currentCycle > to) {
			const building = await tx
				.insertInto("Building")
				.values({
					id: genId(),
					blueprintId,
					userId,
					x,
					y,
				})
				.returning("id")
				.executeTakeFirstOrThrow();

			const inventory = await tx
				.selectFrom("Inventory as i")
				.select(["i.amount", "i.limit", "i.resourceId"])
				.where(
					"i.id",
					"in",
					tx
						.selectFrom("Blueprint_Inventory as bi")
						.select("bi.inventoryId")
						.where("bi.blueprintId", "=", blueprintId),
				)
				.execute();

			for await (const { amount, limit, resourceId } of inventory) {
				await tx
					.insertInto("Building_Inventory")
					.values({
						id: genId(),
						buildingId: building.id,
						inventoryId: (
							await tx
								.insertInto("Inventory")
								.values({
									id: genId(),
									amount,
									limit,
									resourceId,
								})
								.returning("id")
								.executeTakeFirstOrThrow()
						).id,
					})
					.execute();
			}

			await tx.deleteFrom("Construction").where("id", "=", id).execute();

			continue;
		}

		await tx
			.updateTable("Construction")
			.set("cycle", cycle + 1)
			.where("id", "=", id)
			.execute();
	}

	const productionQueue = await tx
		.selectFrom("Production as p")
		.innerJoin("Blueprint_Production as bp", "bp.id", "p.blueprintProductionId")
		.innerJoin("Resource as r", "r.id", "bp.resourceId")
		.select(["p.id", "p.cycle", "p.to", "bp.resourceId", "r.name", "bp.amount"])
		.where("userId", "=", userId)
		.execute();

	for await (const { id, resourceId, cycle, to, amount } of productionQueue) {
		if (currentCycle > to) {
			const inventory = await tx
				.selectFrom("Inventory as i")
				.innerJoin("User_Inventory as ui", "i.id", "ui.inventoryId")
				.select(["i.id", "i.amount", "i.limit"])
				.where("ui.userId", "=", userId)
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
		.selectFrom("Production_Queue as pq")
		.innerJoin(
			"Blueprint_Production as bp",
			"bp.id",
			"pq.blueprintProductionId",
		)
		.innerJoin("Blueprint as bl", "bl.id", "bp.blueprintId")
		.select([
			"pq.id",
			"pq.count",
			"pq.limit",
			"pq.blueprintProductionId",
			"pq.buildingId",
		])
		.where("pq.userId", "=", userId)
		.where("pq.paused", "=", false)
		.orderBy("pq.priority", "desc")
		.execute();

	for await (const {
		id,
		count,
		limit,
		blueprintProductionId,
		buildingId,
	} of productionPlanQueue) {
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
				blueprintProductionId,
				buildingId,
				userId,
			});

			await tx
				.updateTable("Production_Queue")
				.set({ count: count + 1 })
				.where("id", "=", id)
				.execute();

			if (limit > 0 && count + 1 >= limit) {
				await tx.deleteFrom("Production_Queue").where("id", "=", id).execute();
			}
		} catch (_) {
			// Probably not enough resources or something like that.
		}
	}
};
