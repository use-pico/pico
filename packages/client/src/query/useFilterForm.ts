import {
	cleanOf,
	mapEmptyToUndefined,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
} from "@use-pico/common";
import { z } from "zod";
import { useForm } from "../form/useForm";
import type { IQueryStore } from "./IQueryStore";
import type { IWithMutation } from "./IWithMutation";
import { withMutation } from "./withMutation";

export namespace useFilterForm {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> extends Omit<
			useForm.Props<
				IWithMutation<QuerySchema.Filter<TQuerySchema>, z.ZodVoid>,
				QuerySchema.Filter<TQuerySchema>
			>,
			"withMutation"
		> {
		withQueryStore: IQueryStore.Store<TQuerySchema>;
	}
}

export const useFilterForm = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>({
	withQueryStore,
	...props
}: useFilterForm.Props<TQuerySchema>): useForm.UseForm<
	IWithMutation<QuerySchema.Filter<TQuerySchema>, z.ZodVoid>,
	QuerySchema.Filter<TQuerySchema>
> => {
	const queryStore = withQueryStore.useSelector(
		({ schema, setFilter, filter }) => ({ schema, setFilter, filter }),
	);
	return useForm({
		withMutation: withMutation({
			key: ["filter", withQueryStore.name],
			schema: {
				request: queryStore.schema.filter,
				response: z.void(),
			},
			useCallback: () => async (request) => {
				queryStore.setFilter(
					cleanOf(mapEmptyToUndefined(request), {
						nullCleaner: true,
						emptyStringsCleaner: true,
						emptyArraysCleaner: true,
						emptyObjectsCleaner: true,
					}),
				);
			},
		}),
		values: queryStore.filter ?? {},
		...props,
	});
};
