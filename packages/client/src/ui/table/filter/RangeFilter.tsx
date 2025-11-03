import type { withQuerySchema } from "@use-pico/common/schema";
import type { DeepKeys, DeepValue, StateType } from "@use-pico/common/type";
import pathOf from "object-path";
import { FilterRemoveIcon } from "../../../icon/FilterRemoveIcon";
import { GteIcon } from "../../../icon/GteIcon";
import { LteIcon } from "../../../icon/LteIcon";
import { Action } from "../../action/Action";

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
	const path = pathOf(state.value || {});
	const isLte = path.get(lte) !== undefined;
	const isGte = path.get(gte) !== undefined;

	return (
		<div className={"flex flex-row gap-2"}>
			{isLte ? (
				<Action
					iconEnabled={FilterRemoveIcon}
					size={"xs"}
					tweak={{
						variant: {
							tone: "primary",
							theme: "light",
						},
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
					size={"xs"}
					tweak={{
						variant: {
							tone: "primary",
							theme: "light",
						},
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
					size={"xs"}
					tweak={{
						variant: {
							tone: "primary",
							theme: "light",
						},
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
					size={"xs"}
					tweak={{
						variant: {
							tone: "primary",
							theme: "light",
						},
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
