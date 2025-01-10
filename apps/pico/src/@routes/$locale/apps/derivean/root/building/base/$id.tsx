import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { Building_Base_Index_Menu } from "~/app/derivean/root/building/Building_Base_Index_Menu";
import { Building_Base_Preview } from "~/app/derivean/root/building/Building_Base_Preview";
import { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";
import { Building_Base_Production_Schema } from "~/app/derivean/schema/building/Building_Base_Production_Schema";
import { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id",
)({
	async loader({ context: { kysely }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await withFetch({
					select: tx
						.selectFrom("Building_Base as bb")
						.select([
							"bb.id",
							"bb.name",
							"bb.cycles",
							(eb) =>
								eb
									.selectFrom("Building_Base_Resource_Requirement as bbrr")
									.innerJoin("Resource as r", "r.id", "bbrr.resourceId")
									.select((eb) => {
										return sql<string>`json_group_array(json_object(
                                            'id', ${eb.ref("bbrr.id")},
                                            'amount', ${eb.ref("bbrr.amount")},
                                            'passive', ${eb.ref("bbrr.passive")},
                                            'resourceId', ${eb.ref("bbrr.resourceId")},
                                            'buildingBaseId', ${eb.ref("bbrr.buildingBaseId")},
                                            'name', ${eb.ref("r.name")}
                                        ))`.as("requirements");
									})
									.where("bbrr.buildingBaseId", "=", eb.ref("bb.id"))
									.orderBy("r.name", "asc")
									.as("requiredResources"),
							(eb) =>
								eb
									.selectFrom(
										"Building_Base_Building_Base_Requirement as bbbbr",
									)
									.innerJoin(
										"Building_Base as bb2",
										"bb2.id",
										"bbbbr.requirementId",
									)
									.select((eb) => {
										return sql<string>`json_group_array(json_object(
                                            'id', ${eb.ref("bbbbr.id")},
                                            'amount', ${eb.ref("bbbbr.amount")},
                                            'requirementId', ${eb.ref("bbbbr.requirementId")},
                                            'buildingBaseId', ${eb.ref("bbbbr.buildingBaseId")},
                                            'name', ${eb.ref("bb2.name")}
                                        ))`.as("requirements");
									})
									.where("bbbbr.buildingBaseId", "=", eb.ref("bb.id"))
									.orderBy("bb2.name", "asc")
									.as("requiredBuildings"),
							(eb) =>
								eb
									.selectFrom("Building_Base_Production as bbp")
									.innerJoin("Resource as r", "r.id", "bbp.resourceId")
									.select((eb) => {
										return sql<string>`json_group_array(json_object(
                                            'id', ${eb.ref("bbp.id")},
                                            'amount', ${eb.ref("bbp.amount")},
                                            'cycles', ${eb.ref("bbp.cycles")},
                                            'limit', ${eb.ref("bbp.limit")},
                                            'resourceId', ${eb.ref("bbp.resourceId")},
                                            'buildingBaseId', ${eb.ref("bbp.buildingBaseId")},
                                            'name', ${eb.ref("r.name")}
                                        ))`.as("requirements");
									})
									.where("bbp.buildingBaseId", "=", eb.ref("bb.id"))
									.orderBy("r.name", "asc")
									.as("productions"),
						])
						.where("bb.id", "=", id),
					output: z.object({
						id: z.string().min(1),
						name: z.string().min(1),
						cycles: z.number().nonnegative(),
						requiredResources: withJsonArraySchema(
							Building_Base_Resource_Requirement_Schema.entity.merge(
								z.object({
									name: z.string().min(1),
								}),
							),
						),
						requiredBuildings: withJsonArraySchema(
							Building_Base_Building_Base_Requirement_Schema.entity.merge(
								z.object({
									name: z.string().min(1),
								}),
							),
						),
						productions: withJsonArraySchema(
							Building_Base_Production_Schema.entity.merge(
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
				<Building_Base_Preview entity={entity} />

				<Building_Base_Index_Menu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
