import { PopupMultiSelect, Tags } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import { TagRepository } from "~/app/derivean/tag/TagRepository";
import { TagTable } from "~/app/derivean/tag/TagTable";
import type { TagSchema } from "~/app/tag/TagSchema";

export namespace TagPopupMultiSelect {
	export interface Props
		extends PopupMultiSelect.PropsEx<withRepositorySchema.Output<TagSchema>> {
		group?: string;
	}
}

export const TagPopupMultiSelect: FC<TagPopupMultiSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupMultiSelect<withRepositorySchema.Output<TagSchema>>
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
				TagRepository.useListQuery({
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
