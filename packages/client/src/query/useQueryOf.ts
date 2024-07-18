import type {
	FilterSchema,
	OrderBySchema,
	QuerySchema,
} from "@use-pico/common";
import { useStore } from "../store/useStore";
import { IQueryStore } from "./IQueryStore";

/**
 * Direct access to a query of the provided source.
 *
 * @template TQuerySchema Shape of the query itself.
 */
export const useQueryOf = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
	store: IQueryStore.Store<TQuerySchema>,
) => {
	return useStore(store, ({ filter, where, orderBy, cursor }) => ({
		filter,
		where,
		orderBy,
		cursor,
	}));
};
