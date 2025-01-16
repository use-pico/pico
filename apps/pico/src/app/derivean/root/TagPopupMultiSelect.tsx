import {
    PopupMultiSelect,
    TagIcon,
    Tags,
    withListCount,
} from "@use-pico/client";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { TagTable } from "~/app/derivean/root/TagTable";
import { TagSchema } from "~/app/derivean/schema/TagSchema";

export namespace TagPopupMultiSelect {
	export interface Props extends PopupMultiSelect.PropsEx<TagTable.Data> {
		group?: string;
	}
}

export const TagPopupMultiSelect: FC<TagPopupMultiSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupMultiSelect<TagTable.Data>
			icon={TagIcon}
			table={(props) => (
				<TagTable
					group={group}
					{...props}
				/>
			)}
			render={({ entities }) => {
				return <Tags tags={entities} />;
			}}
			queryKey={"Tag"}
			query={async ({ filter, cursor }) => {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Tag as t")
							.select(["t.id", "t.code", "t.label", "t.group", "t.sort"]),
						output: TagSchema.entity,
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("t.id", "=", where.id);
							}

							if (where?.idIn) {
								$select = $select.where("t.id", "in", where.idIn);
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
