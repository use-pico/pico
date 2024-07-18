import type {
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	WithIdentitySchema,
} from "@use-pico/common";
import { Table } from "./Table";

export namespace WithTable {
	export interface Props<
		TColumns extends string,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends Table.Props<TColumns, TQuerySchema, TSchema> {
		defaultQuery?: QuerySchema.QueryType<TQuerySchema>;
		/**
		 * Inherit query store (means: with table will not provide Query Store).
		 */
		inherit?: boolean;
	}

	export type PropsEx<
		TColumns extends string,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> = Omit<
		Props<TColumns, TQuerySchema, TSchema>,
		"withQueryStore" | "withSourceQuery"
	>;
}

/**
 * This component is a wrapper around Table component that provides query store and default query values.
 *
 * It's basically the same as a Table component wrapped by QueryStore.Provider.
 */
export const WithTable = <
	TColumns extends string,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>({
	defaultQuery = {},
	inherit = false,
	...props
}: WithTable.Props<TColumns, TQuerySchema, TSchema>) => {
	return inherit ?
			<Table {...props} />
		:	<props.withQueryStore.Provider values={defaultQuery}>
				<Table {...props} />
			</props.withQueryStore.Provider>;
};
