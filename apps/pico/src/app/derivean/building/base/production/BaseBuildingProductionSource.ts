import { withSource } from "@use-pico/common";
import { BaseBuildingProductionSchema } from "~/app/derivean/building/base/production/BaseBuildingProductionSchema";
import { BaseBuildingProductionRequirementSource } from "~/app/derivean/building/base/production/requirement/BaseBuildingProductionRequirementSource";
import { kysely } from "~/app/derivean/db/db";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";

export const BaseBuildingProductionSource = withSource({
	name: "BaseBuildingProductionSource",
	schema: BaseBuildingProductionSchema,
	db: kysely,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
		let $select = tx
			.selectFrom("BaseBuildingProduction as bbp")
			.selectAll("bbp")
			.leftJoin("BaseBuilding as bb", "bb.id", "bbp.baseBuildingId")
			.leftJoin("Resource as r", "r.id", "bbp.resourceId");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("bbp.id", "like", $input),
					ex("bb.id", "like", $input),
					ex("r.id", "like", $input),
					ex("bb.name", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: BaseBuildingProductionSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("bbp.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("bbp.id", "in", where.idIn);
			}

			if (where?.baseBuildingId) {
				$select = $select.where(
					"bbp.baseBuildingId",
					"=",
					where.baseBuildingId,
				);
			}

			if (where?.resourceId) {
				$select = $select.where("bbp.resourceId", "=", where.resourceId);
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
		return tx.insertInto("BaseBuildingProduction");
	},
	patch$({ tx }) {
		return tx.updateTable("BaseBuildingProduction");
	},
	delete$({ tx }) {
		return tx.deleteFrom("BaseBuildingProduction");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				resource: await ResourceSource.getOrThrow$({
					tx,
					id: entity.resourceId,
				}),
				requirements: await BaseBuildingProductionRequirementSource.list$({
					tx,
					where: {
						baseBuildingProductionId: entity.id,
					},
				}),
			};
		},
	},
});
