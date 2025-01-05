import { PopupMultiSelect, Tags, useListQuery } from "@use-pico/client";
import type { FC } from "react";
import type { TagSchema } from "~/app/derivean/tag/TagSchema";
import { TagSource } from "~/app/derivean/tag/TagSource";
import { TagTable } from "~/app/derivean/tag/TagTable";

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
			source={TagSource}
			useListQuery={({ where, ...props }) =>
				useListQuery({
					...props,
					where: {
						...where,
						group,
					},
				})
			}
			{...props}
		/>
	);
};
