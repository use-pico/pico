import { PopupSelect } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { TagTable } from "~/app/derivean/root/tag/TagTable";

interface Data extends IdentitySchema.Type {
	code: string;
	label: string;
	group: string;
	sort: number;
}

export namespace TagPopupSelect {
	export interface Props extends PopupSelect.PropsEx<Data> {
		group?: string;
	}
}

export const TagPopupSelect: FC<TagPopupSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupSelect<Data>
			table={(props) => (
				<TagTable
					group={group}
					{...props}
				/>
			)}
			render={({ entity }) => {
				return entity.label;
			}}
			useListQuery={null}
			{...props}
		/>
	);
};
