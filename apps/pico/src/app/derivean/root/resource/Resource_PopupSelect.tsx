import { PopupSelect, Tx, withListCount } from "@use-pico/client";
import { withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import type { FC } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { Resource_Table } from "~/app/derivean/root/resource/Resource_Table";
import { Tag_Schema } from "~/app/derivean/schema/tag/Tag_Schema";

export namespace Resource_PopupSelect {
	export interface Props extends PopupSelect.PropsEx<Resource_Table.Data> {
		group?: string;
	}
}

export const Resource_PopupSelect: FC<Resource_PopupSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupSelect<Resource_Table.Data>
			icon={ResourceIcon}
			textTitle={<Tx label={"Select resource (title)"} />}
			textSelect={<Tx label={"Select resource (label)"} />}
			table={(table) => (
				<Resource_Table
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
						select: tx.selectFrom("Resource as r").select([
							"r.id",
							"r.name",
							(eb) =>
								eb
									.selectFrom("Tag as t")
									.innerJoin("Resource_Tag as rt", "rt.resourceId", "r.id")
									.select((eb) => {
										return sql<string>`json_group_array(json_object(
                                            'id', ${eb.ref("t.id")},
                                            'code', ${eb.ref("t.code")},
                                            'group', ${eb.ref("t.group")},
                                            'sort', ${eb.ref("t.sort")},
                                            'label', ${eb.ref("t.label")},
                                        ))`.as("tags");
									})
									.as("tags"),
						]),
						query({ select, where }) {
							let $select = select;

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();

								$select = $select.where((eb) => {
									return eb.or([
										eb("r.id", "=", fulltext),
										eb("r.name", "=", fulltext),
									]);
								});
							}

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							tags: withJsonArraySchema(Tag_Schema.entity),
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
