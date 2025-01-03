import { PopupSelect, Tx } from "@use-pico/client";
import type { FC } from "react";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingTable } from "~/app/derivean/building/base/BaseBuildingTable";
import { kysely } from "~/app/derivean/db/db";
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
			useListQuery={BaseBuildingRepository(kysely).useListQuery}
			{...props}
		/>
	);
};
