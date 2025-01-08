import { id } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/Database";

export namespace withDefaultInventory {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withDefaultInventory = async ({
	tx,
	userId,
}: withDefaultInventory.Props) => {
	const defaultInventoryList = await tx
		.selectFrom("Default_Inventory as di")
		.select(["di.amount", "di.resourceId", "di.limit"])
		.limit(5000)
		.execute();

	for await (const { amount, resourceId, limit } of defaultInventoryList) {
		tx.insertInto("User_Inventory")
			.values({
				id: id(),
				userId,
				inventoryId: (
					await tx
						.insertInto("Inventory")
						.values({
							id: id(),
							amount,
							resourceId,
							limit,
						})
						.returning("id")
						.executeTakeFirstOrThrow()
				).id,
			})
			.execute();
	}
};
