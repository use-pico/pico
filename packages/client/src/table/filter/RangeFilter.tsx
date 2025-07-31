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
		filterInstance: FilterType.Filter;
		value: any;
	}
}

export const RangeFilter: FC<RangeFilter.Props> = ({
	lte,
	gte,
	filterInstance,
	value,
}) => {
	const isLte = pathOf(filterInstance.value || {}).get(lte) !== undefined;
	const isGte = pathOf(filterInstance.value || {}).get(gte) !== undefined;

	return (
		<div className={"flex flex-row gap-1"}>
			{isLte ? (
				<Action
					iconEnabled={FilterRemoveIcon}
					onClick={() => {
						filterInstance.shallow({
							path: lte,
							value: undefined,
						});
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
				/>
			) : (
				<Action
					iconEnabled={LteIcon}
					onClick={() => {
						filterInstance.shallow({
							path: lte,
							value,
						});
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
				/>
			)}
			{isGte ? (
				<Action
					iconEnabled={FilterRemoveIcon}
					onClick={() => {
						filterInstance.shallow({
							path: gte,
							value: undefined,
						});
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
				/>
			) : (
				<Action
					iconEnabled={GteIcon}
					onClick={() => {
						filterInstance.shallow({
							path: gte,
							value,
						});
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
				/>
			)}
		</div>
	);
};
