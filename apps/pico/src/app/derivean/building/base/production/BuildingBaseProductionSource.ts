import { withSource } from "@use-pico/common";
import { BuildingBaseSource } from "~/app/derivean/building/base/BuildingBaseSource";
import { BuildingBaseProductionSchema } from "~/app/derivean/building/base/production/BuildingBaseProductionSchema";
import { kysely } from "~/app/derivean/db/db";
import { ResourceProductionSource } from "~/app/derivean/resource/production/ResourceProductionSource";

export const BuildingBaseProductionSource = withSource({
	name: "BuildingBaseProductionSource",
	schema: BuildingBaseProductionSchema,
	db: kysely,
	select$({
		tx,
		where,
		filter,
		link,
		sort,
		cursor = { page: 0, size: 10 },
		use,
	}) {
		let $select = tx
			.selectFrom("Building_Base_Production as bbp")
			.leftJoin("Building_Base as bb", "bb.id", "bbp.buildingBaseId")
			.leftJoin(
				"Resource_Production as rp",
				"rp.id",
				"bbp.resourceProductionId",
			)
			.leftJoin("Resource as r", "r.id", "rp.resourceId");

		$select = $select.selectAll("bbp");
		if (use.includes("id")) {
			$select = $select.clearSelect().select("bbp.id");
		}

		const $sort = {
			resource: "r.name",
		} as const satisfies Record<
			BuildingBaseProductionSchema["~sort-keyof"],
			string
		>;

		sort?.forEach(({ name, sort }) => {
			$select = $select.orderBy($sort[name], sort);
		});

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("bbp.id", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: BuildingBaseProductionSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("bbp.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("bbp.id", "in", where.idIn);
			}

			if (where?.buildingBaseId) {
				$select = $select.where(
					"bbp.buildingBaseId",
					"=",
					where.buildingBaseId,
				);
			}

			if (where?.resourceProductionId) {
				$select = $select.where(
					"bbp.resourceProductionId",
					"=",
					where.resourceProductionId,
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

		if (link) {
			$select = $select.where("bbp.id", "in", link);
		}

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	create$({ tx }) {
		return tx.insertInto("Building_Base_Production");
	},
	patch$({ tx }) {
		return tx.updateTable("Building_Base_Production");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Building_Base_Production");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				buildingBase: await BuildingBaseSource.getOrThrow$({
					tx,
					id: entity.buildingBaseId,
				}),
				resourceProduction: await ResourceProductionSource.getOrThrow$({
					tx,
					id: entity.resourceProductionId,
				}),
			};
		},
	},
});
