import { withSource } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import { DefaultInventorySchema } from "~/app/derivean/inventory/default/DefaultInventorySchema";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";

export const DefaultInventorySource = withSource({
	name: "DefaultInventorySource",
	schema: DefaultInventorySchema,
	db: kysely,
	select$({
		tx,
		where,
		filter,
		link,
		sort,
		cursor = { page: 0, size: 10 },
		use,
	}) {
		let $select = tx
			.selectFrom("Default_Inventory as di")
			.leftJoin("Resource as r", "r.id", "di.resourceId");

		$select = $select.selectAll("di");
		if (use.includes("id")) {
			$select = $select.clearSelect().select("di.id");
		}

		const $sort = {
			resource: "r.name",
		} as const satisfies Record<DefaultInventorySchema["~sort-keyof"], string>;

		sort?.forEach(({ name, sort }) => {
			$select = $select.orderBy($sort[name], sort);
		});

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("di.id", "like", $input),
					ex("r.id", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: DefaultInventorySchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("di.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("di.id", "in", where.idIn);
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
			$select = $select.where("di.id", "in", link);
		}

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	create$({ tx }) {
		return tx.insertInto("Default_Inventory");
	},
	patch$({ tx }) {
		return tx.updateTable("Default_Inventory");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Default_Inventory");
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
