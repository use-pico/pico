import { withSource } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import { ResourceTagSchema } from "~/app/derivean/resource/tag/ResourceTagSchema";

export const ResourceTagSource = withSource({
	name: "ResourceTagSource",
	schema: ResourceTagSchema,
	db: kysely,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
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

			if (where?.idIn) {
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
		return tx.insertInto("Resource_Tag");
	},
	patch$({ tx }) {
		return tx.updateTable("Resource_Tag");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Resource_Tag");
	},
});
