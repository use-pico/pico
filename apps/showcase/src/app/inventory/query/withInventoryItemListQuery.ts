import { withQuery } from "@use-pico/client/query";
import { withList } from "@use-pico/common/list";
import { database } from "~/app/database/kysely";
import type { InventoryItemQuerySchema } from "~/app/inventory/db/InventoryItemQuerySchema";
import { InventoryItemSchema } from "~/app/inventory/db/InventoryItemSchema";
import { withInventoryItemQueryBuilderWithSort } from "./withInventoryItemQueryBuilder";

export const withInventoryItemListQuery = () => {
	return withQuery<InventoryItemQuerySchema.Type, InventoryItemSchema.Type[]>(
		{
			keys(data) {
				return [
					"inventory-item",
					"list",
					data,
				];
			},
			async queryFn({ filter, where, cursor, sort }) {
				return new Promise((res) => {
					setTimeout(() => {
						res(
							withList({
								select: database.kysely
									.selectFrom("InventoryItem")
									.selectAll(),
								output: InventoryItemSchema,
								cursor,
								filter,
								where,
								query({ select, where }) {
									return withInventoryItemQueryBuilderWithSort(
										{
											select,
											where,
											sort,
										},
									);
								},
							}),
						);
					}, 750);
				});
			},
		},
	);
};
