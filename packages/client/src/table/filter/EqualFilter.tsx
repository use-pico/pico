import type { FC } from "react";
import { FilterApplyIcon } from "../../icon/FilterApplyIcon";
import { Icon } from "../../icon/Icon";
import type { FilterType } from "../type/FilterType";

export namespace EqualFilter {
	export interface Props {
		path: string;
		filterInstance: FilterType.Filter;
		value: any;
	}
}

export const EqualFilter: FC<EqualFilter.Props> = ({
	filterInstance,
	path,
	value,
}) => {
	return (
		<Icon
			icon={FilterApplyIcon}
			variant={{ size: "xl" }}
			onClick={() => {
				filterInstance.shallow({ path, value });
			}}
		/>
	);
};
