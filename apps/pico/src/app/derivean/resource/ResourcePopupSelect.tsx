import { PopupSelect, Tx, useListQuery } from "@use-pico/client";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";
import { ResourceTable } from "~/app/derivean/resource/ResourceTable";

export namespace ResourcePopupSelect {
	export interface Props
		extends PopupSelect.PropsEx<ResourceSchema["~output"]> {
		//
	}
}

export const ResourcePopupSelect: FC<ResourcePopupSelect.Props> = (props) => {
	return (
		<PopupSelect<ResourceSchema["~output"]>
			icon={ResourceIcon}
			titleText={<Tx label={"Select resource (title)"} />}
			table={ResourceTable}
			render={({ entity }) => {
				return entity.name;
			}}
			source={ResourceSource}
			useListQuery={useListQuery}
			{...props}
		/>
	);
};
