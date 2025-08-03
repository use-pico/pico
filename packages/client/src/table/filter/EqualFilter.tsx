import type {
	DeepKeys,
	DeepValue,
	EntitySchema,
	StateType,
} from "@use-pico/common";
import { FilterApplyIcon } from "../../icon/FilterApplyIcon";
import { Icon } from "../../icon/Icon";

export namespace EqualFilter {
	export interface Props<TData extends EntitySchema.Type, TFilter> {
		state: StateType<TFilter>;
		path: DeepKeys<TFilter>;
		value: DeepValue<TData, DeepKeys<TFilter>>;
	}
}

export const EqualFilter = <TData extends EntitySchema.Type, TFilter>({
	state,
	path,
	value,
}: EqualFilter.Props<TData, TFilter>) => {
	return (
		<Icon
			icon={FilterApplyIcon}
			variant={{
				size: "xl",
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
