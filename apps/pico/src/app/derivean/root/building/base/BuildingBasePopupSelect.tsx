import { PopupSelect, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { BuildingBaseSource } from "~/app/derivean/building/base/BuildingBaseSource";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { BuildingBaseTable } from "~/app/derivean/root/building/base/BuildingBaseTable";

export namespace BuildingBasePopupSelect {
	export interface Props
		extends PopupSelect.PropsEx<BuildingBaseSchema["~output"]> {
		//
	}
}

export const BuildingBasePopupSelect: FC<BuildingBasePopupSelect.Props> = (
	props,
) => {
	return (
		<PopupSelect<BuildingBaseSchema["~output"]>
			icon={BuildingBaseIcon}
			textTitle={<Tx label={"Select building base (title)"} />}
			table={BuildingBaseTable}
			render={({ entity }) => {
				return entity.name;
			}}
			source={BuildingBaseSource}
			{...props}
		/>
	);
};
