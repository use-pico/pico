import { PopupSelect, Tx, withListCount } from "@use-pico/client";
import { withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import type { FC } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { Building_Base_Table } from "~/app/derivean/root/building/Building_Base_Table";
import { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";
import { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";

export namespace Building_Base_PopupSelect {
	export interface Props extends PopupSelect.PropsEx<Building_Base_Table.Data> {
		//
	}
}

export const Building_Base_PopupSelect: FC<Building_Base_PopupSelect.Props> = (
	props,
) => {
	return (
		<PopupSelect<Building_Base_Table.Data>
			icon={BuildingBaseIcon}
			textTitle={<Tx label={"Select building base (title)"} />}
			table={Building_Base_Table}
			render={({ entity }) => {
				return entity.name;
			}}
			queryKey={"Building_Base"}
			query={async ({ filter, cursor }) => {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Building_Base as bb")
							.select([
								"bb.id",
								"bb.name",
								"bb.cycles",
								"bb.productionLimit",
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
										.as("requiredResources"),
								(eb) =>
									eb
										.selectFrom(
											"Building_Base_Building_Base_Requirement as bbbbr",
										)
										.innerJoin(
											"Building_Base as bb",
											"bb.id",
											"bbbbr.buildingBaseId",
										)
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                    'id', ${eb.ref("bbbbr.id")},
                                                    'amount', ${eb.ref("bbbbr.amount")},
                                                    'requirementId', ${eb.ref("bbbbr.requirementId")},
                                                    'buildingBaseId', ${eb.ref("bbbbr.buildingBaseId")},
                                                    'name', ${eb.ref("bb.name")}
                                                ))`.as("requirements");
										})
										.where("bbbbr.buildingBaseId", "=", eb.ref("bb.id"))
										.as("requiredBuildings"),
							])
							.orderBy("bb.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("bb.id", "=", where.id);
							}

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();

								$select = $select.where((eb) => {
									return eb.or([
										eb("bb.id", "like", fulltext),
										eb("bb.name", "like", fulltext),
									]);
								});
							}

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							cycles: z.number().int(),
							productionLimit: z.number().int(),
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
						}),
						filter,
						cursor,
					});
				});
			}}
			{...props}
		/>
	);
};
