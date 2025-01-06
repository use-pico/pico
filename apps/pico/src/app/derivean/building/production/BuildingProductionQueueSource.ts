import { withSource } from "@use-pico/common";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";
import { BuildingProductionQueueSchema } from "~/app/derivean/building/production/BuildingProductionQueueSchema";
import { kysely } from "~/app/derivean/db/db";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";

export const BuildingProductionQueueSource = withSource({
	name: "BuildingProductionQueueSource",
	schema: BuildingProductionQueueSchema,
	db: kysely,
	select$({ tx, where, filter, sort, cursor = { page: 0, size: 10 }, use }) {
		let $select = tx
			.selectFrom("BuildingProductionQueue as bpq")
			.selectAll("bpq")
			.leftJoin("Building as b", "b.id", "bpq.buildingId")
			.leftJoin("BaseBuilding as bb", "bb.id", "b.baseBuildingId")
			.leftJoin("Resource as r", "r.id", "bpq.resourceId");

		const $sort = {
			resource: "r.name",
			building: "bb.name",
			start: "bpq.start",
			current: "bpq.current",
			finish: "bpq.finish",
		} as const satisfies Record<
			BuildingProductionQueueSchema["~sort-keyof"],
			string
		>;

		sort?.forEach(({ name, sort }) => {
			$select = $select.orderBy($sort[name], sort);
		});

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([ex("bpq.id", "like", $input)]);
			});
		};

		const $where = (where?: BuildingProductionQueueSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("bpq.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("bpq.id", "in", where.idIn);
			}

			if (where?.userId) {
				$select = $select.where("b.userId", "=", where.userId);
			}
			if (where?.baseBuildingId) {
				$select = $select.where("b.baseBuildingId", "=", where.baseBuildingId);
			}

			if (where?.baseBuildingProductionId) {
				$select = $select.where(
					"bpq.baseBuildingProductionId",
					"=",
					where.baseBuildingProductionId,
				);
			}

			if (where?.finishGte) {
				$select = $select.where("bpq.finish", "<=", where.finishGte);
			}

			if (where?.finishGt) {
				$select = $select.where("bpq.finish", "<", where.finishGt);
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
		return tx.insertInto("BuildingProductionQueue");
	},
	patch$({ tx }) {
		return tx.updateTable("BuildingProductionQueue");
	},
	delete$({ tx }) {
		return tx.deleteFrom("BuildingProductionQueue");
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
