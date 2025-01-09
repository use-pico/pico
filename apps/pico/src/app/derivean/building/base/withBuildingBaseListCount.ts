import { withListCount } from "@use-pico/client";
import { withJsonArraySchema, type CursorSchema } from "@use-pico/common";
import { sql, type Transaction } from "kysely";
import { z } from "zod";
import type { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import type { Database } from "~/app/derivean/db/sdk";
import { ResourceProductionRequirementSchema } from "~/app/derivean/resource/production/requirement/ResourceProductionRequirementSchema";

export namespace withBuildingBaseListCount {
	export interface Props {
		tx: Transaction<Database>;
		filter?: BuildingBaseSchema["~filter"];
		cursor?: CursorSchema.Type;
	}
}

export const withBuildingBaseListCount = async ({
	tx,
	filter,
	cursor,
}: withBuildingBaseListCount.Props) => {
	return withListCount({
		select: tx
			.selectFrom("Building_Base as bb")
			.innerJoin("Resource as r", "r.id", "bb.resourceId")
			.select([
				"bb.id",
				"bb.resourceId",
				"r.name",
				"bb.cycles",
				(eb) =>
					eb
						.selectFrom("Resource_Production_Requirement as rpr")
						.innerJoin("Resource as rq", "rq.id", "rpr.requirementId")
						.select((eb) => {
							return sql<string>`json_group_array(json_object(
                                'id', ${eb.ref("rpr.id")},
                                'amount', ${eb.ref("rpr.amount")},
                                'passive', ${eb.ref("rpr.passive")},
                                'level', ${eb.ref("rpr.level")},
                                'requirementId', ${eb.ref("rpr.requirementId")},
                                'resourceId', ${eb.ref("rpr.resourceId")},
                                'name', ${eb.ref("rq.name")}
                            ))`.as("requirements");
						})
						.where("rpr.resourceId", "=", eb.ref("bb.resourceId"))
						.as("requirements"),
			]),
		query({ select, where }) {
			let $select = select;

			if (where?.id) {
				$select = $select.where("bb.id", "=", where.id);
			}
			if (where?.idIn) {
				$select = $select.where("bb.id", "in", where.idIn);
			}
			if (where?.name) {
				$select = $select.where("bb.id", "=", where.name);
			}

			if (where?.fulltext) {
				const fulltext = `%${where.fulltext}%`.toLowerCase();

				$select = $select.where((eb) => {
					return eb.or([
						eb("bb.id", "like", `%${fulltext}%`),
						eb("r.id", "like", `%${fulltext}%`),
						eb("r.name", "like", `%${fulltext}%`),
					]);
				});
			}

			return $select;
		},
		output: z.object({
			id: z.string().min(1),
			name: z.string().min(1),
			resourceId: z.string().min(1),
			cycles: z.number().nonnegative(),
			requirements: withJsonArraySchema(
				ResourceProductionRequirementSchema.entity.merge(
					z.object({
						name: z.string().min(1),
					}),
				),
			),
		}),
		filter,
		cursor,
	});
};
