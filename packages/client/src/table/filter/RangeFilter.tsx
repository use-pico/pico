import { type DeepKeys, pathOf, type StateType } from "@use-pico/common";
import { Action } from "../../action/Action";
import { FilterRemoveIcon } from "../../icon/FilterRemoveIcon";
import { GteIcon } from "../../icon/GteIcon";
import { LteIcon } from "../../icon/LteIcon";

export namespace RangeFilter {
	export interface Props<TFilter> {
		lte: DeepKeys<TFilter>;
		gte: DeepKeys<TFilter>;
		state: StateType<TFilter>;
		value: any;
	}
}

export const RangeFilter = <TFilter,>({
	lte,
	gte,
	state,
	value,
}: RangeFilter.Props<TFilter>) => {
	const isLte = pathOf(state.value || {}).get(lte) !== undefined;
	const isGte = pathOf(state.value || {}).get(gte) !== undefined;

	return (
		<div className={"flex flex-row gap-1"}>
			{isLte ? (
				<Action
					iconEnabled={FilterRemoveIcon}
					onClick={() => {
						state.set({
							...state.value,
							[lte]: undefined,
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
						state.set({
							...state.value,
							[lte]: value,
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
						state.set({
							...state.value,
							[gte]: undefined,
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
						state.set({
							...state.value,
							[gte]: value,
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
