import { withSource } from "@use-pico/common";
import { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { kysely } from "~/app/derivean/db/db";

export const BuildingBaseSource = withSource({
	name: "BuildingBaseSource",
	schema: BuildingBaseSchema,
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
			.selectFrom("Building_Base as bb")
			.leftJoin("Resource as r", "r.id", "bb.resourceId");

		$select = $select.selectAll("bb").select("r.name");
		if (use.includes("id")) {
			$select = $select.clearSelect().select("bb.id");
		}

		const $sort = {
			name: "r.name",
		} as const satisfies Record<BuildingBaseSchema["~sort-keyof"], string>;

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

		const $where = (where?: BuildingBaseSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("bb.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("bb.id", "in", where.idIn);
			}

			if (where?.name) {
				$select = $select.where("r.name", "=", where.name);
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
			$select = $select.where("bb.id", "in", link);
		}

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	create$({ tx }) {
		return tx.insertInto("Building_Base");
	},
	patch$({ tx }) {
		return tx.updateTable("Building_Base");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Building_Base");
	},
});
