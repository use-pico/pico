import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/Database";
import { DefaultInventorySource } from "~/app/derivean/inventory/default/DefaultInventorySource";
import { InventorySource } from "~/app/derivean/inventory/InventorySource";
import { UserInventorySource } from "~/app/derivean/user/inventory/UserInventorySource";

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
		await UserInventorySource.create$({
			tx,
			entity: {
				inventoryId: (
					await InventorySource.create$({
						tx,
						entity: {
							amount,
							resourceId,
							limit,
						},
					})
				).id,
				userId,
			},
		});
	}
};
