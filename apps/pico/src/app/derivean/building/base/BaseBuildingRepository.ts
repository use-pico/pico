import { withRepository } from "@use-pico/client";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingLimitRepository } from "~/app/derivean/building/base/limit/BaseBuildingLimitRepository";
import { BaseBuildingRequirementRepository } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementRepository";
import type { Database } from "~/app/derivean/db/Database";

export const BaseBuildingRepository = withRepository<
	Database,
	BaseBuildingSchema
>({
	name: "BaseBuilding",
	schema: BaseBuildingSchema,
	select({
		tx,
		query: { where, filter, cursor = { page: 0, size: 10 } },
		use,
	}) {
		let $select = tx.selectFrom("BaseBuilding as bb").selectAll("bb");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("bb.id", "like", $input),
					ex("bb.name", "like", $input),
				]);
			});
		};

		const $where = (where?: BaseBuildingSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("bb.id", "=", where.id);
			}

			if (where?.idIn && where.idIn.length) {
				$select = $select.where("bb.id", "in", where.idIn);
			}

			if (where?.name) {
				$select = $select.where("bb.name", "=", where.name);
			}

			if (where?.fulltext) {
				$select = fulltext(where.fulltext);
			}

			if (where?.preview !== undefined) {
				$select = $select.where("bb.preview", "=", where.preview);
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
		return tx.insertInto("BaseBuilding");
	},
	update({ tx, filter }) {
		let $update = tx.updateTable("BaseBuilding");

		if (filter?.id) {
			$update = $update.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$update = $update.where("id", "in", filter.idIn);
		}

		return $update;
	},
	remove({ tx, filter }) {
		let $remove = tx.deleteFrom("BaseBuilding");

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
				requirements: await BaseBuildingRequirementRepository(tx).list({
					tx,
					query: {
						where: {
							baseBuildingId: entity.id,
						},
					},
				}),
				limits: await BaseBuildingLimitRepository(tx).list({
					tx,
					query: {
						where: {
							baseBuildingId: entity.id,
						},
					},
				}),
			};
		},
	},
});
