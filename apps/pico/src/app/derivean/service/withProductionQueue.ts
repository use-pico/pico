import { genId } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/kysely";
import { ActionBreakTimeout } from "~/app/derivean/utils/ActionBreakTimeout";

export namespace withProductionQueue {
	export interface Props {
		userId: string;
		buildingId: string;
		blueprintProductionId: string;
	}
}

export const withProductionQueue = async ({
	userId,
	buildingId,
	blueprintProductionId,
}: withProductionQueue.Props) => {
	return new Promise((res) => {
		setTimeout(async () => {
			return kysely.transaction().execute(async (tx) => {
				const blueprintProduction = await tx
					.selectFrom("Blueprint_Production as bp")
					.select(["bp.cycles"])
					.where("bp.id", "=", blueprintProductionId)
					.executeTakeFirstOrThrow();

				const { count: cycles } = await tx
					.selectFrom("Cycle as c")
					.select((eb) => eb.fn.count<number>("c.id").as("count"))
					.where("c.userId", "=", userId)
					.executeTakeFirstOrThrow();

				const requirements = await tx
					.selectFrom("Blueprint_Production_Requirement as bpr")
					.innerJoin("Resource as r", "r.id", "bpr.resourceId")
					.select(["bpr.resourceId", "bpr.amount", "bpr.passive"])
					.where("bpr.blueprintProductionId", "=", blueprintProductionId)
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
					.insertInto("Production")
					.values({
						id: genId(),
						buildingId,
						blueprintProductionId,
						userId,
						cycle: 0,
						from: cycles,
						to: cycles + blueprintProduction.cycles,
					})
					.execute();

				res(undefined);
			});
		}, ActionBreakTimeout);
	});
};