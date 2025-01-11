import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";

export namespace withConstructionQueue {
	export interface Props {
		userId: string;
		buildingBaseId: string;
	}
}

export const withConstructionQueue = async ({
	buildingBaseId,
	userId,
}: withConstructionQueue.Props) => {
	return new Promise((res) => {
		setTimeout(async () => {
			return kysely.transaction().execute(async (tx) => {
				const requirement = await tx
					.selectFrom("Building_Base_Resource_Requirement as bbrr")
					.select(["bbrr.resourceId", "bbrr.amount"])
					.where("bbrr.buildingBaseId", "=", buildingBaseId)
					.execute();

				/**
				 * Update inventory amounts of the user.
				 *
				 * If this is successful, the user has enough resources to build the building.
				 */
				for await (const { resourceId, amount } of requirement) {
					const inventory = await tx
						.selectFrom("Inventory as i")
						.innerJoin("User_Inventory as ui", "ui.inventoryId", "i.id")
						.select(["i.id", "i.amount"])
						.where("ui.userId", "=", userId)
						.where("i.resourceId", "=", resourceId)
						.where("i.amount", ">=", amount)
						.executeTakeFirstOrThrow();

					await tx
						.updateTable("Inventory")
						.set({
							amount: inventory.amount - amount,
						})
						.where("id", "=", inventory.id)
						.execute();
				}

				const { count: cycle } = await tx
					.selectFrom("Cycle as c")
					.select((eb) => eb.fn.count<number>("c.id").as("count"))
					.executeTakeFirstOrThrow();

				const buildingBase = await tx
					.selectFrom("Building_Base as bb")
					.select(["bb.cycles"])
					.where("bb.id", "=", buildingBaseId)
					.executeTakeFirstOrThrow();

				await tx
					.insertInto("Building_Queue")
					.values({
						id: genId(),
						buildingBaseId,
						userId,
						cycle: 0,
						from: cycle,
						to: cycle + buildingBase.cycles,
					})
					.execute();

				res(undefined);
			});
		}, 500);
	});
};
