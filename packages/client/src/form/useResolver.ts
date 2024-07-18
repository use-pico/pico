import type {
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	ValuesSchema,
	WithIdentitySchema,
} from "@use-pico/common";
import type { z } from "zod";
import type { IWithSourceQuery } from "../query/IWithSourceQuery";
import { useFetchPromise } from "../query/useFetchPromise";
import type { useForm } from "./useForm";

export namespace useResolver {
	export interface Props<
		TValuesSchema extends ValuesSchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> {
		withQuery: IWithSourceQuery<TQuerySchema, WithIdentitySchema>;
		filter(
			defaults: z.infer<TValuesSchema>,
		): QuerySchema.FilterType<TQuerySchema> | undefined | null;
	}
}

export const useResolver = <
	TValuesSchema extends ValuesSchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>({
	withQuery,
	filter,
}: useResolver.Props<TValuesSchema, TQuerySchema>): useForm.Resolver<
	TValuesSchema,
	string | undefined
> => {
	const promise = useFetchPromise({ withQuery });
	return async ({ defaults }) => {
		const $filter = filter(defaults);
		return $filter ?
				(
					await promise({
						filter: $filter,
					})
				).id
			:	undefined;
	};
};
