import { PopupSelect, Tx } from "@use-pico/client";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";
import { ResourceTable } from "~/app/derivean/resource/ResourceTable";

export namespace ResourcePopupSelect {
	export interface Props extends PopupSelect.PropsEx {
		//
	}
}

export const ResourcePopupSelect: FC<ResourcePopupSelect.Props> = (props) => {
	return (
		<PopupSelect
			icon={ResourceIcon}
			titleText={<Tx label={"Select resource (title)"} />}
			table={ResourceTable}
			useListQuery={ResourceRepository.useListQuery}
			{...props}
		/>
	);
};
