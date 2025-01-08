import { id } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/Database";
import { DefaultInventorySource } from "~/app/derivean/inventory/default/DefaultInventorySource";

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
	const defaultInventoryList = await DefaultInventorySource.list$({
		tx,
		cursor: { page: 0, size: 5000 },
	});

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
