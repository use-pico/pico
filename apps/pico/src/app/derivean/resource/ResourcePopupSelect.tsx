import { PopupSelect, Tx } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import { ResourceTable } from "~/app/derivean/resource/ResourceTable";

export namespace ResourcePopupSelect {
	export interface Props
		extends PopupSelect.PropsEx<withRepositorySchema.Output<ResourceSchema>> {
		//
	}
}

export const ResourcePopupSelect: FC<ResourcePopupSelect.Props> = (props) => {
	return (
		<PopupSelect<withRepositorySchema.Output<ResourceSchema>>
			icon={ResourceIcon}
			titleText={<Tx label={"Select resource (title)"} />}
			table={ResourceTable}
			render={({ entity }) => {
				return entity.name;
			}}
			useListQuery={ResourceRepository.useListQuery}
			{...props}
		/>
	);
};
