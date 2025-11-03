import type { EntitySchema, withQuerySchema } from "@use-pico/common/schema";
import type { DeepKeys, DeepValue, StateType } from "@use-pico/common/type";
import { FilterApplyIcon } from "../../../icon/FilterApplyIcon";
import { Action } from "../../action/Action";

export namespace EqualFilter {
	export interface Props<
		TData extends EntitySchema.Type,
		TFilter extends withQuerySchema.Query,
	> {
		state: StateType<TFilter["filter"]>;
		path: DeepKeys<TFilter["filter"]>;
		value: DeepValue<TData, DeepKeys<TFilter["filter"]>>;
	}
}

export const EqualFilter = <
	TData extends EntitySchema.Type,
	TFilter extends withQuerySchema.Query,
>({
	state,
	path,
	value,
}: EqualFilter.Props<TData, TFilter>) => {
	return (
		<Action
			iconEnabled={FilterApplyIcon}
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
					[path]: value,
				});
			}}
		/>
	);
};
