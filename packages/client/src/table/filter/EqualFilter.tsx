import type {
	DeepKeys,
	DeepValue,
	EntitySchema,
	StateType,
	withQuerySchema,
} from "@use-pico/common";
import { Action } from "../../action/Action";
import { FilterApplyIcon } from "../../icon/FilterApplyIcon";

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
			tweak={({ what }) => ({
				variant: what.variant({
					tone: "primary",
					theme: "light",
				}),
			})}
			onClick={() => {
				state.set({
					...state.value,
					[path]: value,
				});
			}}
		/>
	);
};
