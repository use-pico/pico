import { withRepository } from "@use-pico/client";
import type { Database } from "~/app/derivean/db/Database";
import { TagSchema } from "~/app/derivean/tag/TagSchema";

export const TagRepository = withRepository<Database, TagSchema>({
	name: "TagRepository",
	schema: TagSchema,
	select({
		tx,
		query: { where, filter, cursor = { page: 0, size: 10 } },
		use,
	}) {
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

		if (use?.includes("filter")) {
			$where(filter || {});
		}
		if (use?.includes("where")) {
			$where(where || {});
		}

		if (use?.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	insert({ tx }) {
		return tx.insertInto("Tag");
	},
	update({ tx, filter }) {
		let $update = tx.updateTable("Tag");

		if (filter?.id) {
			$update = $update.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$update = $update.where("id", "in", filter.idIn);
		}

		return $update;
	},
	remove({ tx, filter }) {
		let $remove = tx.deleteFrom("Tag");

		if (filter?.id) {
			$remove = $remove.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$remove = $remove.where("id", "in", filter.idIn);
		}

		return $remove;
	},
});
