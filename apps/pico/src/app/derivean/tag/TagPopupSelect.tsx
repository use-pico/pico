import { PopupSelect } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import { TagRepository } from "~/app/derivean/tag/TagRepository";
import { TagTable } from "~/app/derivean/tag/TagTable";
import type { TagSchema } from "~/app/tag/TagSchema";

export namespace TagPopupSelect {
	export interface Props
		extends PopupSelect.PropsEx<withRepositorySchema.Output<TagSchema>> {
		group?: string;
	}
}

export const TagPopupSelect: FC<TagPopupSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupSelect<withRepositorySchema.Output<TagSchema>>
			table={(props) => (
				<TagTable
					group={group}
					{...props}
				/>
			)}
			render={({ entity }) => {
				return entity.label;
			}}
			useListQuery={TagRepository.useListQuery}
			{...props}
		/>
	);
};
