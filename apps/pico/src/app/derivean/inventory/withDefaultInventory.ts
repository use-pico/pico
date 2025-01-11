import { genId } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";

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

	await tx.deleteFrom("User_Inventory").where("userId", "=", userId).execute();

	for await (const { amount, resourceId, limit } of defaultInventoryList) {
		tx.insertInto("User_Inventory")
			.values({
				id: genId(),
				userId,
				inventoryId: (
					await tx
						.insertInto("Inventory")
						.values({
							id: genId(),
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
