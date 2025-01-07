import { withSource } from "@use-pico/common";
import { BuildingBaseSource } from "~/app/derivean/building/base/BuildingBaseSource";
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { kysely } from "~/app/derivean/db/db";

export const BuildingSource = withSource({
	name: "BuildingSource",
	db: kysely,
	schema: BuildingSchema,
	select$({ tx, where, filter, link, cursor = { page: 0, size: 10 }, use }) {
		let $select = tx
			.selectFrom("Building as b")
			.leftJoin("Building_Base as bb", "bb.id", "b.buildingBaseId")
			.leftJoin("Resource as r", "r.id", "bb.resourceId");

		$select = $select.selectAll("b");
		if (use.includes("id")) {
			$select = $select.clearSelect().select("b.id");
		}

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("b.id", "like", $input),
					ex("bb.id", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: BuildingSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("b.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("b.id", "in", where.idIn);
			}

			if (where?.buildingBaseId) {
				$select = $select.where("b.buildingBaseId", "=", where.buildingBaseId);
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
			$select = $select.where("b.id", "in", link);
		}

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	create$({ tx }) {
		return tx.insertInto("Building");
	},
	patch$({ tx }) {
		return tx.updateTable("Building");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Building");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				buildingBase: await BuildingBaseSource.getOrThrow$({
					tx,
					id: entity.buildingBaseId,
				}),
			};
		},
	},
});
