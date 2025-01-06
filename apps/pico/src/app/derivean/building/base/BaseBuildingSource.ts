import { withSource } from "@use-pico/common";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingLimitSource } from "~/app/derivean/building/base/limit/BaseBuildingLimitSource";
import { BaseBuildingRequirementSource } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSource";
import { kysely } from "~/app/derivean/db/db";

export const BaseBuildingSource = withSource({
	name: "BaseBuildingSource",
	schema: BaseBuildingSchema,
	db: kysely,
	select$({ tx, where, filter, sort, cursor = { page: 0, size: 10 }, use }) {
		let $select = tx.selectFrom("BaseBuilding as bb").selectAll("bb");

		const $sort = {
			name: "bb.name",
		} as const satisfies Record<BaseBuildingSchema["~sort-keyof"], string>;

		sort?.forEach(({ name, sort }) => {
			$select = $select.orderBy($sort[name], sort);
		});

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

			if (where?.idIn) {
				$select = $select.where("bb.id", "in", where.idIn);
			}

			if (where?.name) {
				$select = $select.where("bb.name", "=", where.name);
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
		return tx.insertInto("BaseBuilding");
	},
	patch$({ tx }) {
		return tx.updateTable("BaseBuilding");
	},
	delete$({ tx }) {
		return tx.deleteFrom("BaseBuilding");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				requirements: await BaseBuildingRequirementSource.list$({
					tx,
					where: {
						baseBuildingId: entity.id,
					},
				}),
				limits: await BaseBuildingLimitSource.list$({
					tx,
					where: {
						baseBuildingId: entity.id,
					},
				}),
			};
		},
	},
});
