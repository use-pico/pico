import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withFillInventory {
	export interface Props {
		tx: WithTransaction;
		blueprintId: string;
	}
}

export const withFillInventory = async ({
	tx,
	blueprintId,
}: withFillInventory.Props) => {
	await tx
		.deleteFrom("Blueprint_Inventory")
		.where("blueprintId", "=", blueprintId)
		.execute();

	const requirements = await tx
		.selectFrom("Blueprint_Requirement")
		.select(["resourceId", "amount"])
		.where("blueprintId", "=", blueprintId)
		.execute();

	for await (const { resourceId, amount } of requirements) {
		await tx
			.insertInto("Blueprint_Inventory")
			.values({
				id: genId(),
				blueprintId,
				inventoryId: (
					await tx
						.insertInto("Inventory")
						.values({
							id: genId(),
							resourceId,
							amount: 0,
							limit: amount,
							type: "construction",
						})
						.returning("id")
						.executeTakeFirstOrThrow()
				).id,
			})
			.execute();
	}

	const resources = await tx
		.selectFrom(
			tx
				.selectFrom("Blueprint_Production")
				.select(["resourceId", "amount"])
				.where("blueprintId", "=", blueprintId)
				.union(
					tx
						.selectFrom("Blueprint_Production_Resource as bpr")
						.innerJoin(
							"Blueprint_Production as bp",
							"bp.id",
							"bpr.blueprintProductionId",
						)
						.select(["bpr.resourceId", "bpr.amount"])
						.where("bp.blueprintId", "=", blueprintId),
				)
				.union(
					tx
						.selectFrom("Blueprint_Production_Requirement as bpr")
						.innerJoin(
							"Blueprint_Production as bp",
							"bp.id",
							"bpr.blueprintProductionId",
						)
						.select(["bpr.resourceId", "bpr.amount"])
						.where("bp.blueprintId", "=", blueprintId),
				)
				.as("resources"),
		)
		.select(["resourceId", (eb) => eb.fn.max("amount").as("amount")])
		.groupBy("resourceId")
		.orderBy("amount", "desc")
		.execute();

	for await (const { resourceId, amount } of resources) {
		await tx
			.insertInto("Blueprint_Inventory")
			.values({
				id: genId(),
				blueprintId,
				inventoryId: (
					await tx
						.insertInto("Inventory")
						.values({
							id: genId(),
							resourceId,
							amount: 0,
							limit: amount * 5,
							type: "storage",
						})
						.returning("id")
						.executeTakeFirstOrThrow()
				).id,
			})
			.execute();
	}
};
