import { withList, withQuery } from "@use-pico/client";
import { kysely } from "~/app/database/kysely";
import { InventoryItemSchema } from "~/app/inventory/db/InventoryItemSchema";

export const withInventoryItemListQuery = () => {
	return withQuery({
		keys(data) {
			return [
				"inventory-item-list",
				data,
			];
		},
		async queryFn(data) {
			return withList({
				select: kysely.selectFrom("InventoryItem").selectAll(),
				output: InventoryItemSchema,
                
			});
		},
	});
};
