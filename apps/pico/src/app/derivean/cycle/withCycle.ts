import { DateTime, genId } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";

export namespace withCycle {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withCycle = async ({ tx, userId }: withCycle.Props) => {
	return new Promise((res) => {
		setTimeout(async () => {
			await tx
				.insertInto("Cycle")
				.values({
					id: genId(),
					stamp: DateTime.now().toUTC().toSQLTime(),
					userId,
				})
				.execute();

			const cycle = (
				await tx
					.selectFrom("Cycle as c")
					.select((eb) => eb.fn.count<number>("c.id").as("count"))
					.where("c.userId", "=", userId)
					.executeTakeFirstOrThrow()
			).count;

			const buildingQueue = await tx
				.selectFrom("Building_Queue as bq")
				.select(["bq.id", "bq.cycle", "bq.to", "bq.buildingBaseId"])
				.where("userId", "=", userId)
				.execute();

			for await (const queue of buildingQueue) {
				if (cycle > queue.to) {
					const building = await tx
						.insertInto("Building")
						.values({
							id: genId(),
							buildingBaseId: queue.buildingBaseId,
							userId,
						})
						.returningAll()
						.executeTakeFirstOrThrow();

					const inventory = await tx
						.selectFrom("Inventory as i")
						.innerJoin(
							"Building_Base_Inventory as bbi",
							"i.id",
							"bbi.inventoryId",
						)
						.where("bbi.buildingBaseId", "=", queue.buildingBaseId)
						.select(["i.id", "i.resourceId", "i.amount", "i.limit"])
						.execute();

					for await (const item of inventory) {
						await tx
							.insertInto("Building_Inventory")
							.values({
								id: genId(),
								buildingId: building.id,
								inventoryId: (
									await tx
										.insertInto("Inventory")
										.values({
											...item,
											id: genId(),
										})
										.returning("id")
										.executeTakeFirstOrThrow()
								).id,
							})
							.execute();
					}

					await tx
						.deleteFrom("Building_Queue")
						.where("id", "=", queue.id)
						.execute();

					continue;
				}

				await tx
					.updateTable("Building_Queue")
					.set("cycle", queue.cycle + 1)
					.where("id", "=", queue.id)
					.execute();
			}

			const resourceQueue = await tx
				.selectFrom("Building_Resource_Queue as brq")
				.innerJoin(
					"Building_Base_Production as bbp",
					"bbp.id",
					"brq.buildingBaseProductionId",
				)
				.select([
					"brq.id",
					"brq.cycle",
					"brq.to",
					"bbp.resourceId",
					"bbp.amount",
				])
				.where("userId", "=", userId)
				.execute();

			for await (const queue of resourceQueue) {
				if (cycle > queue.to) {
					const inventory = await tx
						.selectFrom("Inventory as i")
						.innerJoin("User_Inventory as ui", "i.id", "ui.inventoryId")
						.select(["i.id", "i.amount", "i.limit"])
						.where("ui.userId", "=", userId)
						.where("i.resourceId", "=", queue.resourceId)
						.executeTakeFirstOrThrow();

					if (inventory.amount + queue.amount > inventory.limit) {
						continue;
					}

					await tx
						.updateTable("Inventory")
						.set({
							amount: inventory.amount + queue.amount,
						})
						.where("id", "=", inventory.id)
						.execute();

					await tx
						.deleteFrom("Building_Resource_Queue as brq")
						.where("brq.id", "=", queue.id)
						.execute();

					continue;
				}

				await tx
					.updateTable("Building_Resource_Queue")
					.set("cycle", queue.cycle + 1)
					.where("id", "=", queue.id)
					.execute();
			}

			res(undefined);

			/**
			 * I'll keep this "break" here to prevent overclicking on the cycle button.
			 */
		}, 500);
	});
};
