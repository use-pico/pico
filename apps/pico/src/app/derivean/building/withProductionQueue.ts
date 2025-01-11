import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";
import { ActionBreakTimeout } from "~/app/derivean/utils/ActionBreakTimeout";

export namespace withProductionQueue {
	export interface Props {
		userId: string;
		buildingId: string;
		buildingBaseProductionId: string;
	}
}

export const withProductionQueue = async ({
	userId,
	buildingId,
	buildingBaseProductionId,
}: withProductionQueue.Props) => {
	return new Promise((res) => {
		setTimeout(async () => {
			return kysely.transaction().execute(async (tx) => {
				const buildingBaseProduction = await tx
					.selectFrom("Building_Base_Production as bbp")
					.select(["bbp.cycles"])
					.where("bbp.id", "=", buildingBaseProductionId)
					.executeTakeFirstOrThrow();

				const { count: cycles } = await tx
					.selectFrom("Cycle as c")
					.select((eb) => eb.fn.count<number>("c.id").as("count"))
					.where("c.userId", "=", userId)
					.executeTakeFirstOrThrow();

				const requirements = await tx
					.selectFrom("Building_Base_Production_Requirement as bbpr")
					.innerJoin("Resource as r", "r.id", "bbpr.resourceId")
					.select(["bbpr.resourceId", "bbpr.amount", "bbpr.passive"])
					.where("bbpr.buildingBaseProductionId", "=", buildingBaseProductionId)
					.execute();

				for await (const { resourceId, amount, passive } of requirements) {
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

				await tx
					.insertInto("Building_Resource_Queue")
					.values({
						id: genId(),
						buildingId,
						buildingBaseProductionId,
						userId,
						cycle: 0,
						from: cycles,
						to: cycles + buildingBaseProduction.cycles,
					})
					.execute();

				res(undefined);
			});
		}, ActionBreakTimeout);
	});
};
