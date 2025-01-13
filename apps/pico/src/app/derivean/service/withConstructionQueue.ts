import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";
import { ActionBreakTimeout } from "~/app/derivean/utils/ActionBreakTimeout";

export namespace withConstructionQueue {
	export interface Props {
		userId: string;
		blueprintId: string;
		upgradeId?: string;
	}
}

export const withConstructionQueue = async ({
	blueprintId,
	upgradeId,
	userId,
}: withConstructionQueue.Props) => {
	return new Promise((resolve) => {
		setTimeout(async () => {
			return kysely.transaction().execute(async (tx) => {
				const requirement = await tx
					.selectFrom("Blueprint_Requirement as br")
					.select(["br.resourceId", "br.amount", "br.passive"])
					.where("br.blueprintId", "=", blueprintId)
					.execute();

				/**
				 * Update inventory amounts of the user.
				 *
				 * If this is successful, the user has enough resources to build the building.
				 */
				for await (const { resourceId, amount, passive } of requirement) {
					const inventory = await tx
						.selectFrom("Inventory as i")
						.innerJoin("User_Inventory as ui", "ui.inventoryId", "i.id")
						.select(["i.id", "i.amount"])
						.where("ui.userId", "=", userId)
						.where("i.resourceId", "=", resourceId)
						.where("i.amount", ">=", amount)
						.executeTakeFirstOrThrow();

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

				await tx
					.insertInto("Construction")
					.values({
						id: genId(),
						blueprintId,
						userId,
						cycle: 0,
						from: cycle,
						to: cycle + blueprint.cycles,
					})
					.execute();

				if (upgradeId) {
					await tx
						.updateTable("Building")
						.set({ isUpgraded: true })
						.where("blueprintId", "=", upgradeId)
						.where("userId", "=", userId)
						.execute();
				}

				resolve(true);
			});
		}, ActionBreakTimeout);
	});
};
