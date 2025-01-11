import { PopupSelect, withListCount } from "@use-pico/client";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { Tag_Table } from "~/app/derivean/root/tag/Tag_Table";
import { Tag_Schema } from "~/app/derivean/schema/tag/Tag_Schema";

export namespace Tag_PopupSelect {
	export interface Props extends PopupSelect.PropsEx<Tag_Table.Data> {
		group?: string;
	}
}

export const Tag_PopupSelect: FC<Tag_PopupSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupSelect<Tag_Table.Data>
			table={(props) => (
				<Tag_Table
					group={group}
					{...props}
				/>
			)}
			render={({ entity }) => {
				return entity.label;
			}}
			queryKey={"Tag"}
			query={async ({ filter, cursor }) => {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Tag as t")
							.select(["t.id", "t.code", "t.label", "t.group", "t.sort"]),
						output: Tag_Schema.entity,
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("t.id", "=", where.id);
							}

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();

								$select = $select.where((qb) => {
									return qb.or([
										qb("t.code", "like", fulltext),
										qb("t.group", "like", fulltext),
										qb("t.label", "like", fulltext),
										qb("t.id", "like", fulltext),
									]);
								});
							}

							return $select;
						},
						filter,
						cursor,
					});
				});
			}}
			{...props}
		/>
	);
};
