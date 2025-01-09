import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { ResourceProductionRequirementSchema } from "~/app/derivean/resource/production/requirement/ResourceProductionRequirementSchema";
import { BuildingBaseIndexMenu } from "~/app/derivean/root/building/base/BuildingBaseIndexMenu";
import { BuildingBasePreview } from "~/app/derivean/root/building/base/BuildingBasePreview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id",
)({
	async loader({ context: { kysely }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await withFetch({
					select: tx
						.selectFrom("Building_Base as bb")
						.innerJoin("Resource as r", "r.id", "bb.resourceId")
						.select([
							"bb.id",
							"r.name",
							"bb.resourceId",
							"bb.cycles",
							(eb) =>
								eb
									.selectFrom("Resource_Production_Requirement as rpr")
									.innerJoin("Resource as rq", "rq.id", "rpr.requirementId")
									.select((eb) => {
										return sql<string>`json_group_array(json_object(
                                            'id', ${eb.ref("rpr.id")},
                                            'amount', ${eb.ref("rpr.amount")},
                                            'level', ${eb.ref("rpr.level")},
                                            'passive', ${eb.ref("rpr.passive")},
                                            'requirementId', ${eb.ref("rpr.requirementId")},
                                            'resourceId', ${eb.ref("rpr.resourceId")},
                                            'name', ${eb.ref("rq.name")}
                                        ))`.as("requirements");
									})
									.where("rpr.resourceId", "=", eb.ref("bb.resourceId"))
									.as("requirements"),
						])
						.where("bb.id", "=", id),
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
				}),
			};
		});
	},
	component() {
		const { tva } = useRouteContext({ from: "__root__" });
		const { entity } = Route.useLoaderData();
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BuildingBasePreview entity={entity} />

				<BuildingBaseIndexMenu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
