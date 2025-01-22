import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withConstruction {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		currentCycle: number;
	}
}

export const withConstruction = async ({
	tx,
	userId,
	currentCycle,
}: withConstruction.Props) => {
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
};
