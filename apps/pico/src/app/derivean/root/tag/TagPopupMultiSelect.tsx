import {
    PopupMultiSelect,
    TagIcon,
    Tags,
    withListCount,
} from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/db";
import { TagTable } from "~/app/derivean/root/tag/TagTable";

interface Data extends IdentitySchema.Type {
	code: string;
	label: string;
	group?: string | null;
	sort: number;
}

export namespace TagPopupMultiSelect {
	export interface Props extends PopupMultiSelect.PropsEx<Data> {
		group?: string;
	}
}

export const TagPopupMultiSelect: FC<TagPopupMultiSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupMultiSelect<Data>
			name={"tag"}
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
			query={async ({ filter, cursor }) => {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Tag as t")
							.select(["t.id", "t.code", "t.label", "t.group", "t.sort"]),
						output: z.object({
							id: z.string(),
							code: z.string(),
							label: z.string(),
							group: z.string().nullish(),
							sort: z.number().default(0),
						}),
						query({ select, where }) {
							let $select = select
								.$if(Boolean(where?.id), (qb) => {
									return qb.where("t.id", "=", where?.id!);
								})
								.$if(Boolean(where?.idIn), (qb) => {
									return qb.where("t.id", "in", where?.idIn!);
								});

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`;

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
