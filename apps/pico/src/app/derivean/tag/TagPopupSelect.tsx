import { PopupSelect, useListQuery } from "@use-pico/client";
import type { FC } from "react";
import type { TagSchema } from "~/app/derivean/tag/TagSchema";
import { TagSource } from "~/app/derivean/tag/TagSource";
import { TagTable } from "~/app/derivean/tag/TagTable";

export namespace TagPopupSelect {
	export interface Props extends PopupSelect.PropsEx<TagSchema["~output"]> {
		group?: string;
	}
}

export const TagPopupSelect: FC<TagPopupSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupSelect<TagSchema["~output"]>
			table={(props) => (
				<TagTable
					group={group}
					{...props}
				/>
			)}
			render={({ entity }) => {
				return entity.label;
			}}
			source={TagSource}
			useListQuery={useListQuery}
			{...props}
		/>
	);
};
