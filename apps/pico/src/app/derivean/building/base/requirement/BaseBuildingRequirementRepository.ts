import { withRepository } from "@use-pico/client";
import { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";
import type { Database } from "~/app/derivean/db/Database";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";

export const BaseBuildingRequirementRepository = withRepository<
	Database,
	BaseBuildingRequirementSchema
>({
	name: "BaseBuildingRequirementRepository",
	schema: BaseBuildingRequirementSchema,
	select({
		tx,
		query: { where, filter, cursor = { page: 0, size: 10 } },
		use,
	}) {
		let $select = tx
			.selectFrom("BaseBuilding_Requirement as bbr")
			.selectAll("bbr")
			.leftJoin("BaseBuilding as bb", "bb.id", "bbr.baseBuildingId")
			.leftJoin("Resource as r", "r.id", "bbr.resourceId");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("bbr.id", "like", $input),
					ex("bb.id", "like", $input),
					ex("r.id", "like", $input),
					ex("bb.name", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: BaseBuildingRequirementSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("bbr.id", "=", where.id);
			}

			if (where?.idIn && where.idIn.length) {
				$select = $select.where("bbr.id", "in", where.idIn);
			}

			if (where?.baseBuildingId) {
				$select = $select.where(
					"bbr.baseBuildingId",
					"=",
					where.baseBuildingId,
				);
			}

			if (where?.resourceId) {
				$select = $select.where("bbr.resourceId", "=", where.resourceId);
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
		return tx.insertInto("BaseBuilding_Requirement");
	},
	update({ tx, filter }) {
		let $update = tx.updateTable("BaseBuilding_Requirement");

		if (filter?.id) {
			$update = $update.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$update = $update.where("id", "in", filter.idIn);
		}

		return $update;
	},
	remove({ tx, filter }) {
		let $remove = tx.deleteFrom("BaseBuilding_Requirement");

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
					query: {
						where: { id: entity.resourceId },
					},
				}),
			};
		},
	},
});
