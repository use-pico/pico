import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withProductionQueue {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		buildingId: string;
		blueprintProductionId: string;
	}
}

export const withProductionQueue = async ({
	tx,
	userId,
	buildingId,
	blueprintProductionId,
}: withProductionQueue.Props) => {
	const blueprintProduction = await tx
		.selectFrom("Blueprint_Production as bp")
		.select(["bp.cycles"])
		.where("bp.id", "=", blueprintProductionId)
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
			.innerJoin("Building_Inventory as bi", "bi.inventoryId", "i.id")
			.select(["i.id", "i.amount"])
			.where("bi.buildingId", "=", buildingId)
			.where("i.resourceId", "=", resourceId)
			.where("i.amount", ">=", amount)
			.where("i.type", "in", ["storage", "input"])
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
			cycles: blueprintProduction.cycles,
		})
		.execute();
};
