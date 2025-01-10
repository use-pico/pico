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
                                            'name', ${eb.ref("r.name")}
                                        ))`.as("requirements");
									})
									.where("bbrr.buildingBaseId", "=", "bb.id")
									.as("requirements"),
						])
						.where("bb.id", "=", id),
					output: z.object({
						id: z.string().min(1),
						name: z.string().min(1),
						cycles: z.number().nonnegative(),
						requirements: withJsonArraySchema(
							Building_Base_Resource_Requirement_Schema.entity.merge(
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
