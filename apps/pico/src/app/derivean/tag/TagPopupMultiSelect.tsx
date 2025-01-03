import { PopupMultiSelect, Tags } from "@use-pico/client";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/db";
import { TagRepository } from "~/app/derivean/tag/TagRepository";
import { TagTable } from "~/app/derivean/tag/TagTable";
import type { TagSchema } from "~/app/tag/TagSchema";

export namespace TagPopupMultiSelect {
	export interface Props
		extends PopupMultiSelect.PropsEx<TagSchema["~output"]> {
		group?: string;
	}
}

export const TagPopupMultiSelect: FC<TagPopupMultiSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupMultiSelect<TagSchema["~output"]>
			table={(props) => (
				<TagTable
					group={group}
					{...props}
				/>
			)}
			render={({ entities }) => {
				return <Tags tags={entities} />;
			}}
			useListQuery={({ query: { where, ...query }, ...props }) =>
				TagRepository(kysely).useListQuery({
					...props,
					query: {
						...query,
						where: {
							...where,
							group,
						},
					},
				})
			}
			{...props}
		/>
	);
};
