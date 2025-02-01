import { PopupSelect, Tx, withListCount } from "@use-pico/client";
import {
    withIntSchema,
    withJsonArraySchema
} from "@use-pico/common";
import { sql } from "kysely";
import type { FC } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceTable } from "~/app/derivean/root/ResourceTable";
import { TagSchema } from "~/app/derivean/schema/TagSchema";

export namespace ResourcePopupSelect {
	export interface Props extends PopupSelect.PropsEx<ResourceTable.Data> {
		group?: string;
	}
}

export const ResourcePopupSelect: FC<ResourcePopupSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupSelect<ResourceTable.Data>
			icon={ResourceIcon}
			textTitle={<Tx label={"Select resource (title)"} />}
			textSelect={<Tx label={"Select resource (label)"} />}
			table={(table) => (
				<ResourceTable
					group={group}
					{...table}
				/>
			)}
			render={({ entity }) => {
				return entity.name;
			}}
			queryKey={"Resource"}
			query={async ({ filter, cursor }) => {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Resource as r")
							.select([
								"r.id",
								"r.name",
								"r.weight",
								(eb) =>
									eb
										.selectFrom("Tag as t")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                'id', ${eb.ref("t.id")},
                                                'code', ${eb.ref("t.code")},
                                                'group', ${eb.ref("t.group")},
                                                'sort', ${eb.ref("t.sort")},
                                                'label', ${eb.ref("t.label")}
                                            ))`.as("tags");
										})
										.where(
											"t.id",
											"in",
											tx
												.selectFrom("Resource_Tag as rt")
												.select("rt.tagId")
												.where("rt.resourceId", "=", eb.ref("r.id")),
										)
										.as("tags"),
								(eb) => {
									return eb
										.selectFrom("Blueprint_Requirement")
										.select((eb) => eb.fn.count("id").as("count"))
										.whereRef("resourceId", "=", "r.id")
										.as("countRequirement");
								},
								(eb) => {
									return eb
										.selectFrom("Blueprint_Production")
										.select((eb) => eb.fn.count("id").as("count"))
										.whereRef("resourceId", "=", "r.id")
										.as("countProduction");
								},
								(eb) => {
									return eb
										.selectFrom("Blueprint_Production_Requirement")
										.select((eb) => eb.fn.count("id").as("count"))
										.whereRef("resourceId", "=", "r.id")
										.as("countProductionRequirement");
								},
							])
							.orderBy("r.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("r.id", "=", where.id);
							}

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();

								$select = $select.where((eb) => {
									return eb.or([
										eb("r.id", "like", fulltext),
										eb("r.name", "like", fulltext),
										eb(
											"r.id",
											"in",
											eb
												.selectFrom("Resource_Tag as rt")
												.innerJoin("Tag as t", "t.id", "rt.tagId")
												.select("rt.resourceId")
												.where((eb) => {
													return eb.or([
														eb("t.code", "like", fulltext),
														eb("t.label", "like", fulltext),
														eb("t.group", "like", fulltext),
													]);
												}),
										),
									]);
								});
							}

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							weight: withIntSchema(),
							tags: withJsonArraySchema(TagSchema.entity),
							countRequirement: z.number().nonnegative(),
							countProduction: z.number().nonnegative(),
							countProductionRequirement: z.number().nonnegative(),
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
