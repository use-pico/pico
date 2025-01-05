import { withSource } from "@use-pico/common";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";
import { BuildingResourceSchema } from "~/app/derivean/building/resource/BuildingResourceSchema";
import { kysely } from "~/app/derivean/db/db";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";

export const BuildingResourceSource = withSource({
	name: "BuildingResourceSource",
	schema: BuildingResourceSchema,
	db: kysely,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
		let $select = tx
			.selectFrom("Building_Resource as br")
			.selectAll("br")
			.leftJoin("Building as b", "b.id", "br.buildingId")
			.leftJoin("BaseBuilding as bb", "bb.id", "b.baseBuildingId")
			.leftJoin("Resource as r", "r.id", "br.resourceId");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("br.id", "like", $input),
					ex("bb.id", "like", $input),
					ex("r.id", "like", $input),
					ex("bb.name", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: BuildingResourceSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("br.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("br.id", "in", where.idIn);
			}

			if (where?.buildingId) {
				$select = $select.where("br.buildingId", "=", where.buildingId);
			}

			if (where?.baseBuildingId) {
				$select = $select.where("b.baseBuildingId", "=", where.baseBuildingId);
			}

			if (where?.resourceId) {
				$select = $select.where("br.resourceId", "=", where.resourceId);
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
		return tx.insertInto("Building_Resource");
	},
	patch$({ tx }) {
		return tx.updateTable("Building_Resource");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Building_Resource");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				building: await BuildingSource.getOrThrow$({
					tx,
					id: entity.buildingId,
				}),
				resource: await ResourceSource.getOrThrow$({
					tx,
					id: entity.resourceId,
				}),
			};
		},
	},
});
