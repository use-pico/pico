import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";

export namespace withConstructionQueue {
	export interface Props {
		userId: string;
		blueprintId: string;
		x: number;
		y: number;
		plan: boolean;
		valid: boolean;
	}
}

export const withConstructionQueue = async ({
	blueprintId,
	userId,
	x,
	y,
	plan,
	valid,
}: withConstructionQueue.Props) => {
	return kysely.transaction().execute(async (tx) => {
		const requirement = await tx
			.selectFrom("Blueprint_Requirement as br")
			.innerJoin("Resource as r", "r.id", "br.resourceId")
			.select(["br.resourceId", "br.amount", "br.passive", "r.name"])
			.where("br.blueprintId", "=", blueprintId)
			.execute();

		/**
		 * Update inventory amounts of the user.
		 *
		 * If this is successful, the user has enough resources to build the building.
		 */
		for await (const { resourceId, amount, passive, name } of requirement) {
			const inventory = await tx
				.selectFrom("Inventory as i")
				.select(["i.id", "i.amount"])
				.where("i.resourceId", "=", resourceId)
				.where("i.amount", ">=", amount)
				.where(
					"i.id",
					"in",
					tx
						.selectFrom("User_Inventory as ui")
						.select("ui.inventoryId")
						.where("ui.userId", "=", userId),
				)
				.executeTakeFirstOrThrow(
					() =>
						new Error(`"Not enough resources [${name}]; required [${amount}]`),
				);

			if (!passive) {
				await tx
					.updateTable("Inventory")
					.set({
						amount: inventory.amount - amount,
					})
					.where("id", "=", inventory.id)
					.execute();
			}
		}

		const { count: cycle } = await tx
			.selectFrom("Cycle as c")
			.select((eb) => eb.fn.count<number>("c.id").as("count"))
			.executeTakeFirstOrThrow();

		const blueprint = await tx
			.selectFrom("Blueprint as b")
			.select(["b.cycles"])
			.where("b.id", "=", blueprintId)
			.executeTakeFirstOrThrow();

		return tx
			.insertInto("Construction")
			.values({
				id: genId(),
				blueprintId,
				userId,
				cycle: 0,
				from: cycle,
				to: cycle + blueprint.cycles,
				x,
				y,
				plan,
				valid,
			})
			.returningAll()
			.executeTakeFirstOrThrow();
	});
};
