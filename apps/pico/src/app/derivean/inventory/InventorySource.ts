import { withSource } from "@use-pico/common";
import type { SelectQueryBuilder, Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/Database";
import { kysely } from "~/app/derivean/db/db";
import { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";

const foo = (
	tx: Transaction<Database>,
): SelectQueryBuilder<{ src: { id: string | null } }, "src", {}> => {
	return tx
		.selectFrom("Inventory as src")
		.leftJoin("Resource as r", "r.id", "src.resourceId");
};

const bla = kysely.transaction().execute(async (tx) => {
	foo(tx).select("src.id").where("src.id", "=", "dfdf").execute();
});

export const InventorySource = withSource({
	name: "InventorySource",
	db: kysely,
	schema: InventorySchema,
	select$({
		tx,
		where,
		filter,
		sort,
		link,
		cursor = { page: 0, size: 10 },
		use,
	}) {
		let $select = tx
			.selectFrom("Inventory as i")
			.leftJoin("Resource as r", "r.id", "i.resourceId");

		$select = $select.selectAll("i");
		if (use.includes("id")) {
			$select = $select.clearSelect().select("i.id");
		}

		const $sort = {
			resource: "r.name",
			amount: "i.amount",
			limit: "i.limit",
		} as const satisfies Record<InventorySchema["~sort-keyof"], string>;

		sort?.forEach(({ name, sort }) => {
			$select = $select.orderBy($sort[name], sort);
		});

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("i.id", "like", $input),
					ex("r.id", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: InventorySchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("i.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("i.id", "in", where.idIn);
			}

			if (where?.resourceId) {
				$select = $select.where("i.resourceId", "=", where.resourceId);
			}

			if (where?.fulltext) {
				$select = fulltext(where.fulltext);
			}
		};

		if (use.includes("filter")) {
			$where(filter || {});
		}
		if (use.includes("where")) {
			$where(where || {});
		}

		if (link) {
			$select = $select.where("i.id", "in", link);
		}

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	create$({ tx }) {
		return tx.insertInto("Inventory");
	},
	patch$({ tx }) {
		return tx.updateTable("Inventory");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Inventory");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				resource: await ResourceSource.getOrThrow$({
					tx,
					id: entity.resourceId,
				}),
			};
		},
	},
});
