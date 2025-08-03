import { withCount, withQuery } from "@use-pico/client";
import type { CountSchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { InventoryItemQuerySchema } from "~/app/inventory/db/InventoryItemQuerySchema";
import { withInventoryItemQueryBuilder } from "./withInventoryItemQueryBuilder";

export const withInventoryItemCountQuery = () => {
	return withQuery<InventoryItemQuerySchema.Type, CountSchema.Type>({
		keys(data) {
			return [
				"inventory-item",
				"count",
				data,
			];
		},
		async queryFn({ filter, where }) {
			return withCount({
				select: kysely.selectFrom("InventoryItem").selectAll(),
				filter,
				where,
				query({ select, where }) {
					return withInventoryItemQueryBuilder({
						select,
						where,
					});
				},
			});
		},
	});
};
