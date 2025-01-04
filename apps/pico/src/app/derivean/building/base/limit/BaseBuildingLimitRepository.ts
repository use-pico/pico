import { withRepository } from "@use-pico/client";
import { BaseBuildingLimitSchema } from "~/app/derivean/building/base/limit/BaseBuildingLimitSchema";
import type { Database } from "~/app/derivean/db/Database";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";

export const BaseBuildingLimitRepository = withRepository<
	Database,
	BaseBuildingLimitSchema
>({
	name: "BaseBuildingLimitRepository",
	schema: BaseBuildingLimitSchema,
	select({
		tx,
		query: { where, filter, cursor = { page: 0, size: 10 } },
		use,
	}) {
		let $select = tx
			.selectFrom("BaseBuilding_Limit as bbl")
			.selectAll("bbl")
			.leftJoin("BaseBuilding as bb", "bb.id", "bbl.baseBuildingId")
			.leftJoin("Resource as r", "r.id", "bbl.resourceId");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("bbl.id", "like", $input),
					ex("bb.id", "like", $input),
					ex("r.id", "like", $input),
					ex("bb.name", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: BaseBuildingLimitSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("bb.id", "=", where.id);
			}

			if (where?.idIn && where.idIn.length) {
				$select = $select.where("bb.id", "in", where.idIn);
			}

			if (where?.resourceId) {
				$select = $select.where("bbl.resourceId", "=", where.resourceId);
			}

			if (where?.baseBuildingId) {
				$select = $select.where(
					"bbl.baseBuildingId",
					"=",
					where.baseBuildingId,
				);
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
		return tx.insertInto("BaseBuilding_Limit");
	},
	update({ tx, filter }) {
		let $update = tx.updateTable("BaseBuilding_Limit");

		if (filter?.id) {
			$update = $update.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$update = $update.where("id", "in", filter.idIn);
		}

		return $update;
	},
	remove({ tx, filter }) {
		let $remove = tx.deleteFrom("BaseBuilding_Limit");

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
				resource: await ResourceRepository(tx).fetchOrThrow({
					tx,
					query: { where: { id: entity.resourceId } },
				}),
			};
		},
	},
});
