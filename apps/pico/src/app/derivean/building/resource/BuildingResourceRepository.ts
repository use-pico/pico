import { withRepository } from "@use-pico/client";
import { BuildingRepository } from "~/app/derivean/building/BuildingRepository";
import { BuildingResourceSchema } from "~/app/derivean/building/resource/BuildingResourceSchema";
import type { Database } from "~/app/derivean/db/Database";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";

export const BuildingResourceRepository = withRepository<
	Database,
	BuildingResourceSchema
>({
	name: "BuildingResourceRepository",
	schema: BuildingResourceSchema,
	select({
		tx,
		query: { where, filter, cursor = { page: 0, size: 10 } },
		use,
	}) {
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

			if (where?.idIn && where.idIn.length) {
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
	insert({ tx }) {
		return tx.insertInto("Building_Resource");
	},
	update({ tx, filter }) {
		let $update = tx.updateTable("Building_Resource");

		if (filter?.id) {
			$update = $update.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$update = $update.where("id", "in", filter.idIn);
		}

		return $update;
	},
	remove({ tx, filter }) {
		let $remove = tx.deleteFrom("Building_Resource");

		if (filter?.id) {
			$remove = $remove.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$remove = $remove.where("id", "in", filter.idIn);
		}

		return $remove;
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				building: await BuildingRepository(tx).fetchOrThrow({
					tx,
					query: { where: { id: entity.buildingId } },
				}),
				resource: await ResourceRepository(tx).fetchOrThrow({
					tx,
					query: { where: { id: entity.resourceId } },
				}),
			};
		},
	},
});
