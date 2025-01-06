import { withSource } from "@use-pico/common";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";
import { BuildingQueueSchema } from "~/app/derivean/building/queue/BuildingQueueSchema";
import { kysely } from "~/app/derivean/db/db";

export const BuildingQueueSource = withSource({
	name: "BuildingQueueSource",
	schema: BuildingQueueSchema,
	db: kysely,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
		let $select = tx.selectFrom("BuildingQueue as bq").selectAll("bq");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([ex("bq.id", "like", $input)]);
			});
		};

		const $where = (where?: BuildingQueueSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("bq.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("bq.id", "in", where.idIn);
			}

			if (where?.userId) {
				$select = $select.where("bq.userId", "=", where.userId);
			}
			if (where?.baseBuildingId) {
				$select = $select.where("bq.baseBuildingId", "=", where.baseBuildingId);
			}

			if (where?.finishGte) {
				$select = $select.where("bq.finish", "<=", where.finishGte);
			}

			if (where?.finishGt) {
				$select = $select.where("bq.finish", "<", where.finishGt);
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
		return tx.insertInto("BuildingQueue");
	},
	patch$({ tx }) {
		return tx.updateTable("BuildingQueue");
	},
	delete$({ tx }) {
		return tx.deleteFrom("BuildingQueue");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				baseBuilding: await BaseBuildingSource.getOrThrow$({
					tx,
					id: entity.baseBuildingId,
					error: "Cannot find base building for building queue",
				}),
			};
		},
	},
});
