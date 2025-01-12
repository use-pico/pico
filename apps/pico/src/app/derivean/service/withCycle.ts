import { DateTime, genId } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";
import { ActionBreakTimeout } from "~/app/derivean/utils/ActionBreakTimeout";

export namespace withCycle {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withCycle = async ({ tx, userId }: withCycle.Props) => {
	return new Promise((resolve) => {
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

			const constructionQueue = await tx
				.selectFrom("Construction as c")
				.select(["c.id", "c.cycle", "c.to", "c.blueprintId"])
				.where("userId", "=", userId)
				.execute();

			for await (const { id, blueprintId, cycle, to } of constructionQueue) {
				if (cycle > to) {
					await tx
						.insertInto("Building")
						.values({
							id: genId(),
							blueprintId,
							userId,
						})
						.execute();

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
				.innerJoin(
					"Blueprint_Production as bp",
					"bp.id",
					"p.blueprintProductionId",
				)
				.innerJoin("Resource as r", "r.id", "bp.resourceId")
				.select([
					"p.id",
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
				resourceId,
				cycle,
				to,
				amount,
			} of productionQueue) {
				if (cycle > to) {
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

					if (
						inventory.limit > 0 &&
						inventory.amount + amount > inventory.limit
					) {
						continue;
					}

					await tx
						.updateTable("Inventory")
						.set({
							amount: inventory.amount + amount,
						})
						.where("id", "=", inventory.id)
						.execute();

					await tx
						.deleteFrom("Production as p")
						.where("p.id", "=", id)
						.execute();

					continue;
				}

				await tx
					.updateTable("Production")
					.set("cycle", cycle + 1)
					.where("id", "=", id)
					.execute();
			}

			resolve(true);

			/**
			 * I'll keep this "break" here to prevent overclicking on the cycle button.
			 */
		}, ActionBreakTimeout);
	});
};
