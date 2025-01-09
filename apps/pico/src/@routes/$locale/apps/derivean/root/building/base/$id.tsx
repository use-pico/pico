import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { ResourceRequirementSchema } from "~/app/derivean/resource/requirement/ResourceRequirementSchema";
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
									.selectFrom("Resource_Requirement as rr")
									.innerJoin("Resource as re", "re.id", "rr.requirementId")
									.select((eb) => {
										return sql<string>`json_group_array(json_object(
                                            'id', ${eb.ref("rr.id")},
                                            'amount', ${eb.ref("rr.amount")},
                                            'passive', ${eb.ref("rr.passive")},
                                            'requirementId', ${eb.ref("rr.requirementId")},
                                            'resourceId', ${eb.ref("rr.resourceId")},
                                            'name', ${eb.ref("re.name")}
                                        ))`.as("tags");
									})
									.where(
										"rr.resourceId",
										"in",
										eb
											.selectFrom("Building_Base as bb2")
											.select(["bb2.resourceId"])
											.where("bb2.id", "=", id),
									)
									.as("requirements"),
						])
						.where("bb.id", "=", id),
					output: z.object({
						id: z.string().min(1),
						name: z.string().min(1),
						resourceId: z.string().min(1),
						cycles: z.number().nonnegative(),
						requirements: withJsonArraySchema(
							ResourceRequirementSchema.entity.merge(
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
