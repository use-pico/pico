import { withListCount } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import type { Transaction } from "kysely";
import { z } from "zod";
import type { BuildingBaseInventorySchema } from "~/app/derivean/building/base/inventory/BuildingBaseInventorySchema";
import type { Database } from "~/app/derivean/db/sdk";

const schema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	resourceId: z.string().min(1),
	inventoryId: z.string().min(1),
	amount: z.number().nonnegative(),
	limit: z.number().nonnegative(),
	level: z.number().nonnegative(),
});

export namespace withBuildingBaseInventoryListCount {
	export type Data = z.infer<typeof schema>;

	export interface Props {
		tx: Transaction<Database>;
		where?: BuildingBaseInventorySchema["~filter"];
		filter?: BuildingBaseInventorySchema["~filter"];
		cursor?: CursorSchema.Type;
	}
}

export const withBuildingBaseInventoryListCount = async ({
	tx,
	where,
	filter,
	cursor,
}: withBuildingBaseInventoryListCount.Props) => {
	return withListCount({
		select: tx
			.selectFrom("Building_Base_Inventory as bbi")
			.innerJoin("Inventory as i", "i.id", "bbi.inventoryId")
			.innerJoin("Resource as r", "r.id", "i.resourceId")
			.select([
				"bbi.id",
				"bbi.level",
				"bbi.inventoryId",
				"i.amount",
				"i.limit",
				"r.name",
				"i.resourceId",
			])
			.orderBy("bbi.level", "asc")
			.orderBy("r.name", "asc"),
		query({ select, where }) {
			let $select = select;

			if (where?.id) {
				$select = $select.where("bbi.id", "=", where.id);
			}
			if (where?.buildingBaseId) {
				$select = $select.where(
					"bbi.buildingBaseId",
					"=",
					where.buildingBaseId,
				);
			}

			if (where?.fulltext) {
				const fulltext = `%${where.fulltext}%`.toLowerCase();

				$select = $select.where((eb) => {
					return eb.or([
						eb("bbi.id", "like", `%${fulltext}%`),
						eb("i.id", "like", `%${fulltext}%`),
						eb("r.id", "like", `%${fulltext}%`),
						eb("r.name", "like", `%${fulltext}%`),
					]);
				});
			}

			return $select;
		},
		output: schema,
		where,
		filter,
		cursor,
	});
};
