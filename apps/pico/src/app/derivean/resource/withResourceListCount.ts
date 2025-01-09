import { withListCount } from "@use-pico/client";
import { withJsonArraySchema, type CursorSchema } from "@use-pico/common";
import { sql, type Transaction } from "kysely";
import { z } from "zod";
import type { Database } from "~/app/derivean/db/sdk";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import { TagSchema } from "~/app/derivean/tag/TagSchema";

export namespace withResourceListCount {
	export interface Props {
		tx: Transaction<Database>;
		filter?: ResourceSchema["~filter"];
		cursor?: CursorSchema.Type;
	}
}

export const withResourceListCount = async ({
	tx,
	filter,
	cursor,
}: withResourceListCount.Props) => {
	return withListCount({
		select: tx.selectFrom("Resource as r").select([
			"r.id",
			"r.name",
			(eb) =>
				eb
					.selectFrom("Tag as t")
					.select((eb) => {
						return sql<string>`json_group_array(json_object(
                                                'id', ${eb.ref("t.id")},
                                                'code', ${eb.ref("t.code")},
                                                'group', ${eb.ref("t.group")},
                                                'label', ${eb.ref("t.label")},
                                                'sort', ${eb.ref("t.sort")}
                                            ))`.as("tags");
					})
					.where(
						"t.id",
						"in",
						eb
							.selectFrom("Resource_Tag as rt")
							.select(["rt.tagId"])
							.where("rt.resourceId", "=", eb.ref("r.id")),
					)
					.as("tags"),
		]),
		query({ select, where }) {
			let $select = select;

			if (where?.id) {
				$select = $select.where("r.id", "=", where.id);
			}
			if (where?.idIn) {
				$select = $select.where("r.id", "in", where.idIn);
			}

			if (where?.fulltext) {
				const fulltext = `%${where.fulltext}%`.toLowerCase();

				$select = $select.where((qb) => {
					return qb.or([
						qb("r.id", "like", `%${fulltext}%`),
						qb("r.name", "like", `%${fulltext}%`),
						qb(
							"r.id",
							"in",
							qb
								.selectFrom("Resource_Tag as rt")
								.innerJoin("Tag as t", "t.id", "rt.tagId")
								.select("rt.resourceId")
								.where((qb) => {
									return qb.or([
										qb("t.id", "like", `%${fulltext}%`),
										qb("t.code", "like", `%${fulltext}%`),
										qb("t.group", "like", `%${fulltext}%`),
										qb("t.label", "like", `%${fulltext}%`),
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
			tags: withJsonArraySchema(TagSchema.entity),
		}),
		filter,
		cursor,
	});
};
