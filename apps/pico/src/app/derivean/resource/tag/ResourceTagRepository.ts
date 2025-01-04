import { withRepository } from "@use-pico/client";
import type { Database } from "~/app/derivean/db/Database";
import { ResourceTagSchema } from "~/app/derivean/resource/tag/ResourceTagSchema";

export const ResourceTagRepository = withRepository<
	Database,
	ResourceTagSchema
>({
	name: "ResourceTagRepository",
	schema: ResourceTagSchema,
	select({
		tx,
		query: { where, filter, cursor = { page: 0, size: 10 } },
		use,
	}) {
		let $select = tx
			.selectFrom("Resource_Tag as rt")
			.selectAll("rt")
			.leftJoin("Resource as r", "r.id", "rt.resourceId")
			.leftJoin("Tag as t", "t.id", "rt.tagId");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("rt.id", "like", $input),
					ex("r.id", "like", $input),
					ex("t.id", "like", $input),
					ex("r.name", "like", $input),
					ex("t.code", "like", $input),
					ex("t.label", "like", $input),
					ex("t.group", "like", $input),
				]);
			});
		};

		const $where = (where?: ResourceTagSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("rt.id", "=", where.id);
			}

			if (where?.idIn && where.idIn.length) {
				$select = $select.where("rt.id", "in", where.idIn);
			}

			if (where?.resourceId) {
				$select = $select.where("rt.resourceId", "=", where.resourceId);
			}

			if (where?.tagId) {
				$select = $select.where("rt.tagId", "=", where.tagId);
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
		return tx.insertInto("Resource_Tag");
	},
	update({ tx, filter }) {
		let $update = tx.updateTable("Resource_Tag");

		if (filter?.id) {
			$update = $update.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$update = $update.where("id", "in", filter.idIn);
		}

		return $update;
	},
	remove({ tx, filter }) {
		let $remove = tx.deleteFrom("Resource_Tag");

		if (filter?.id) {
			$remove = $remove.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$remove = $remove.where("id", "in", filter.idIn);
		}

		return $remove;
	},
});
