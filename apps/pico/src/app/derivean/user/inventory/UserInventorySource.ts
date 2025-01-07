import { withSource } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import { UserInventorySchema } from "~/app/derivean/user/inventory/UserInventorySchema";

export const UserInventorySource = withSource({
	name: "UserInventorySource",
	schema: UserInventorySchema,
	db: kysely,
	select$({ tx, where, filter, link, cursor = { page: 0, size: 10 }, use }) {
		let $select = tx.selectFrom("User_Inventory as ui");

		$select = $select.selectAll("ui");
		if (use.includes("id")) {
			$select = $select.clearSelect().select("ui.id");
		}

		const $where = (where?: UserInventorySchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("ui.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("ui.id", "in", where.idIn);
			}

			if (where?.userId) {
				$select = $select.where("ui.userId", "=", where.userId);
			}

			if (where?.inventoryId) {
				$select = $select.where("ui.inventoryId", "=", where.inventoryId);
			}
		};

		if (use.includes("filter")) {
			$where(filter || {});
		}
		if (use.includes("where")) {
			$where(where || {});
		}

		if (link) {
			$select = $select.where("ui.id", "in", link);
		}

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	create$({ tx }) {
		return tx.insertInto("User_Inventory");
	},
	patch$({ tx }) {
		return tx.updateTable("User_Inventory");
	},
	delete$({ tx }) {
		return tx.deleteFrom("User_Inventory");
	},
});
