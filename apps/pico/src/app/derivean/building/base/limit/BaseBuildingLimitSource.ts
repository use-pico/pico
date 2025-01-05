import { withSource } from "@use-pico/common";
import { BaseBuildingLimitSchema } from "~/app/derivean/building/base/limit/BaseBuildingLimitSchema";
import { kysely } from "~/app/derivean/db/db";
import {
    ResourceSource
} from "~/app/derivean/resource/ResourceSource";

export const BaseBuildingLimitSource = withSource({
	name: "BaseBuildingLimitSource",
	schema: BaseBuildingLimitSchema,
	db: kysely,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
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
	create$({ tx }) {
		return tx.insertInto("BaseBuilding_Limit");
	},
	patch$({ tx }) {
		return tx.updateTable("BaseBuilding_Limit");
	},
	delete$({ tx }) {
		return tx.deleteFrom("BaseBuilding_Limit");
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
