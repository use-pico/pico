import { withSource } from "@use-pico/common";
import { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";
import { kysely } from "~/app/derivean/db/db";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";

export const BaseBuildingRequirementSource = withSource({
	name: "BaseBuildingRequirementSource",
	schema: BaseBuildingRequirementSchema,
	db: kysely,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
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

			if (where?.idIn) {
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
	create$({ tx }) {
		return tx.insertInto("BaseBuilding_Requirement");
	},
	patch$({ tx }) {
		return tx.updateTable("BaseBuilding_Requirement");
	},
	delete$({ tx }) {
		return tx.deleteFrom("BaseBuilding_Requirement");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				resource: await ResourceSource.getOrThrow$({
					tx,
					id: entity.resourceId,
				}),
			};
		},
	},
});
