import { withRepository } from "@use-pico/client";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import type { Database } from "~/app/derivean/db/Database";

export const BuildingRepository = withRepository<Database, BuildingSchema>({
	name: "BuildingRepository",
	schema: BuildingSchema,
	select({
		tx,
		query: { where, filter, cursor = { page: 0, size: 10 } },
		use,
	}) {
		let $select = tx
			.selectFrom("Building as b")
			.selectAll("b")
			.leftJoin("BaseBuilding as bb", "bb.id", "b.baseBuildingId");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("b.id", "like", $input),
					ex("bb.id", "like", $input),
					ex("bb.name", "like", $input),
				]);
			});
		};

		const $where = (where?: BuildingSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("b.id", "=", where.id);
			}
			if (where?.baseBuildingId) {
				$select = $select.where("b.baseBuildingId", "=", where.baseBuildingId);
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
		return tx.insertInto("Building");
	},
	update({ tx }) {
		return tx.updateTable("Building");
	},
	remove({ tx }) {
		return tx.deleteFrom("Building");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				baseBuilding: await BaseBuildingRepository(tx).fetchOrThrow({
					tx,
					query: { where: { id: entity.baseBuildingId } },
				}),
			};
		},
	},
});
