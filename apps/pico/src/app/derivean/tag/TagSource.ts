import { withSource } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import { TagSchema } from "~/app/derivean/tag/TagSchema";

export const TagSource = withSource({
	name: "TagSource",
	schema: TagSchema,
	db: kysely,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
		let $select = tx.selectFrom("Tag as t").selectAll("t");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("t.id", "like", $input),
					ex("t.code", "like", $input),
					ex("t.group", "like", $input),
					ex("t.label", "like", $input),
				]);
			});
		};

		const $where = (where?: TagSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("t.id", "=", where.id);
			}

			if (where?.idIn && where.idIn.length) {
				$select = $select.where("t.id", "in", where.idIn);
			}

			if (where?.code) {
				$select = $select.where("t.code", "=", where.code);
			}

			if (where?.group) {
				$select = $select.where("t.group", "=", where.group);
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

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	create$({ tx }) {
		return tx.insertInto("Tag");
	},
	patch$({ tx }) {
		return tx.updateTable("Tag");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Tag");
	},
});
