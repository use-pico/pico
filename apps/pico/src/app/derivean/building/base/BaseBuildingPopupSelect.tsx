import { PopupSelect, Tx } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingTable } from "~/app/derivean/building/base/BaseBuildingTable";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";

export namespace BaseBuildingPopupSelect {
	export interface Props
		extends PopupSelect.PropsEx<
			withRepositorySchema.Output<BaseBuildingSchema>
		> {
		//
	}
}

export const BaseBuildingPopupSelect: FC<BaseBuildingPopupSelect.Props> = (
	props,
) => {
	return (
		<PopupSelect<withRepositorySchema.Output<BaseBuildingSchema>>
			icon={BaseBuildingIcon}
			titleText={<Tx label={"Select base building (title)"} />}
			table={BaseBuildingTable}
			render={({ entity }) => {
				return entity.name;
			}}
			useListQuery={BaseBuildingRepository.useListQuery}
			{...props}
		/>
	);
};
