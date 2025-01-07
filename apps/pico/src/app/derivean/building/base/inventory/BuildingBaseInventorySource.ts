import { withSource } from "@use-pico/common";
import { BuildingBaseSource } from "~/app/derivean/building/base/BuildingBaseSource";
import { BuildingBaseInventorySchema } from "~/app/derivean/building/base/inventory/BuildingBaseInventorySchema";
import { kysely } from "~/app/derivean/db/db";
import { InventorySource } from "~/app/derivean/inventory/InventorySource";

export const BuildingBaseInventorySource = withSource({
	name: "BuildingBaseInventorySource",
	schema: BuildingBaseInventorySchema,
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
			.selectFrom("Building_Base_Inventory as bbi")
			.leftJoin("Building_Base as bb", "bb.id", "bbi.buildingBaseId")
			.leftJoin("Inventory as i", "i.id", "bbi.inventoryId")
			.leftJoin("Resource as r", "r.id", "i.resourceId");

		$select = $select.selectAll("bbi");
		if (use.includes("id")) {
			$select = $select.clearSelect().select("bbi.id");
		}

		const $sort = {
			name: "r.name",
		} as const satisfies Record<
			BuildingBaseInventorySchema["~sort-keyof"],
			string
		>;

		sort?.forEach(({ name, sort }) => {
			$select = $select.orderBy($sort[name], sort);
		});

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("bb.id", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: BuildingBaseInventorySchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("bbi.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("bbi.id", "in", where.idIn);
			}

			if (where?.buildingBaseId) {
				$select = $select.where(
					"bbi.buildingBaseId",
					"=",
					where.buildingBaseId,
				);
			}

			if (where?.inventoryId) {
				$select = $select.where("bbi.inventoryId", "=", where.inventoryId);
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
			$select = $select.where("bbi.id", "in", link);
		}

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	create$({ tx }) {
		return tx.insertInto("Building_Base_Inventory");
	},
	patch$({ tx }) {
		return tx.updateTable("Building_Base_Inventory");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Building_Base_Inventory");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				buildingBase: await BuildingBaseSource.getOrThrow$({
					tx,
					id: entity.buildingBaseId,
				}),
				inventory: await InventorySource.getOrThrow$({
					tx,
					id: entity.inventoryId,
				}),
			};
		},
	},
});
