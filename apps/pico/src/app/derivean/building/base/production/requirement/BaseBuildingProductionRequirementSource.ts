import { withSource } from "@use-pico/common";
import { BaseBuildingProductionRequirementSchema } from "~/app/derivean/building/base/production/requirement/BaseBuildingProductionRequirementSchema";
import { kysely } from "~/app/derivean/db/db";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";

export const BaseBuildingProductionRequirementSource = withSource({
	name: "BaseBuildingProductionRequirementSource",
	schema: BaseBuildingProductionRequirementSchema,
	db: kysely,
	select$({ tx, where, filter, sort, cursor = { page: 0, size: 10 }, use }) {
		let $select = tx
			.selectFrom("BaseBuildingProductionRequirement as bbpr")
			.selectAll("bbpr")
			.leftJoin("Resource as r", "r.id", "bbpr.resourceId");

		const $sort = {
			resource: "r.name",
		} as const satisfies Record<
			BaseBuildingProductionRequirementSchema["~sort-keyof"],
			string
		>;

		sort?.forEach(({ name, sort }) => {
			$select = $select.orderBy($sort[name], sort);
		});

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("bbpr.id", "like", $input),
					ex("r.id", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (
			where?: BaseBuildingProductionRequirementSchema["~filter"],
		) => {
			if (where?.id) {
				$select = $select.where("bbpr.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("bbpr.id", "in", where.idIn);
			}

			if (where?.resourceId) {
				$select = $select.where("bbpr.resourceId", "=", where.resourceId);
			}

			if (where?.baseBuildingProductionId) {
				$select = $select.where(
					"bbpr.baseBuildingProductionId",
					"=",
					where.baseBuildingProductionId,
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
		return tx.insertInto("BaseBuildingProductionRequirement");
	},
	patch$({ tx }) {
		return tx.updateTable("BaseBuildingProductionRequirement");
	},
	delete$({ tx }) {
		return tx.deleteFrom("BaseBuildingProductionRequirement");
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
