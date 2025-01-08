import {
    PopupMultiSelect,
    TagIcon,
    Tags
} from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { TagTable } from "~/app/derivean/root/tag/TagTable";

interface Data extends IdentitySchema.Type {
	code: string;
	label: string;
	group: string;
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
			useListQuery={null}
			{...props}
		/>
	);
};
