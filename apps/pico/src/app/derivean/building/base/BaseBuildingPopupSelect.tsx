import { PopupSelect, Tx, useListQuery } from "@use-pico/client";
import type { FC } from "react";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import {
    BaseBuildingSource
} from "~/app/derivean/building/base/BaseBuildingSource";
import { BaseBuildingTable } from "~/app/derivean/building/base/BaseBuildingTable";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";

export namespace BaseBuildingPopupSelect {
	export interface Props
		extends PopupSelect.PropsEx<BaseBuildingSchema["~output"]> {
		//
	}
}

export const BaseBuildingPopupSelect: FC<BaseBuildingPopupSelect.Props> = (
	props,
) => {
	return (
		<PopupSelect<BaseBuildingSchema["~output"]>
			icon={BaseBuildingIcon}
			titleText={<Tx label={"Select base building (title)"} />}
			table={BaseBuildingTable}
			render={({ entity }) => {
				return entity.name;
			}}
			source={BaseBuildingSource}
			useListQuery={useListQuery}
			{...props}
		/>
	);
};
