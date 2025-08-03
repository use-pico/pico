import {
	type DeepKeys,
	type DeepValue,
	pathOf,
	type StateType,
	type withQuerySchema,
} from "@use-pico/common";
import { Action } from "../../action/Action";
import { FilterRemoveIcon } from "../../icon/FilterRemoveIcon";
import { GteIcon } from "../../icon/GteIcon";
import { LteIcon } from "../../icon/LteIcon";

export namespace RangeFilter {
	export interface Props<TFilter extends withQuerySchema.Query> {
		lte: DeepKeys<TFilter["filter"]>;
		gte: DeepKeys<TFilter["filter"]>;
		state: StateType<TFilter["filter"]>;
		value: DeepValue<TFilter, DeepKeys<TFilter>>;
	}
}

export const RangeFilter = <TFilter extends withQuerySchema.Query>({
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
					variant={{
						borderless: true,
					}}
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
					variant={{
						borderless: true,
					}}
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
					variant={{
						borderless: true,
					}}
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
					variant={{
						borderless: true,
					}}
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
