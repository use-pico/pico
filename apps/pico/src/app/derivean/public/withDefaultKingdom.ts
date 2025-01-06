import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/Database";
import { DefaultInventorySource } from "~/app/derivean/inventory/default/DefaultInventorySource";
import { InventorySource } from "~/app/derivean/inventory/InventorySource";

export namespace withDefaultKingdom {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withDefaultKingdom = async ({
	tx,
	userId,
}: withDefaultKingdom.Props) => {
	const resources = await DefaultInventorySource.list$({
		tx,
		cursor: { page: 0, size: 5000 },
	});

	for await (const resource of resources) {
		const shape = {
			userId,
			resourceId: resource.resourceId,
			amount: resource.amount,
		} as const;

		await InventorySource.create$({
			tx,
			shape,
			entity: shape,
		});
	}
};
