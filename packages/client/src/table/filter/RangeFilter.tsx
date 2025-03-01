import { pathOf } from "@use-pico/common";
import type { FC } from "react";
import { Action } from "../../action/Action";
import { FilterRemoveIcon } from "../../icon/FilterRemoveIcon";
import { GteIcon } from "../../icon/GteIcon";
import { LteIcon } from "../../icon/LteIcon";
import type { FilterType } from "../type/FilterType";

export namespace RangeFilter {
	export interface Props {
		lte: string;
		gte: string;
		filter: FilterType.Filter;
		value: any;
	}
}

export const RangeFilter: FC<RangeFilter.Props> = ({
	lte,
	gte,
	filter,
	value,
}) => {
	const isLte = pathOf(filter.value).get(lte) !== undefined;
	const isGte = pathOf(filter.value).get(gte) !== undefined;

	return (
		<div className={"flex flex-row gap-1"}>
			{isLte ?
				<Action
					iconEnabled={FilterRemoveIcon}
					onClick={() => {
						filter.shallow(lte, undefined);
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
				/>
			:	<Action
					iconEnabled={LteIcon}
					onClick={() => {
						filter.shallow(lte, value);
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
				/>
			}
			{isGte ?
				<Action
					iconEnabled={FilterRemoveIcon}
					onClick={() => {
						filter.shallow(gte, undefined);
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
				/>
			:	<Action
					iconEnabled={GteIcon}
					onClick={() => {
						filter.shallow(gte, value);
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
				/>
			}
		</div>
	);
};
