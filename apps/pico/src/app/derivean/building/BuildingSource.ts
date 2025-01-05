import { withSource } from "@use-pico/common";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { kysely } from "~/app/derivean/db/db";

export const BuildingSource = withSource({
	name: "BuildingSource",
	db: kysely,
	schema: BuildingSchema,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
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

			if (where?.idIn) {
				$select = $select.where("b.id", "in", where.idIn);
			}

			if (where?.baseBuildingId) {
				$select = $select.where("b.baseBuildingId", "=", where.baseBuildingId);
			}

			if (where?.name) {
				$select = $select.where("bb.name", "=", where.name);
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
				baseBuilding: await BaseBuildingSource.getOrThrow$({
					tx,
					id: entity.baseBuildingId,
				}),
			};
		},
	},
});
