import {
	cleanOf,
	isCallable,
	merge,
	ValuesSchema
}                     from "@use-pico/common";
import {type z}       from "zod";
import {type useForm} from "./useForm";

export namespace defaultsOf {
	export interface Props<
		TValuesSchema extends ValuesSchema,
	> {
		defaults?: useForm.Defaults<TValuesSchema>;
		values?: useForm.Values<TValuesSchema>;
	}
}

export const defaultsOf = async <
	TValuesSchema extends ValuesSchema,
>(
	{
		defaults,
		values,
	}: defaultsOf.Props<TValuesSchema>,
): Promise<z.infer<TValuesSchema>> => {
	return merge(
		(isCallable(defaults) ? await defaults() : defaults) || {},
		cleanOf(isCallable(values) ? await values() : values, {
			nullCleaner: true,
		}) || {}
	);
};
