import type {
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	WithIdentitySchema,
} from "@use-pico/common";
import { type z } from "zod";
import { Table } from "./Table";

export const filterCompare = <
	TSchema extends WithIdentitySchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
	start: keyof NonNullable<QuerySchema.FilterType<TQuerySchema>>,
	end: keyof NonNullable<QuerySchema.FilterType<TQuerySchema>>,
	value: keyof z.infer<TSchema>,
	extra?: QuerySchema.FilterType<TQuerySchema>,
	// eslint-disable-next-line max-params
): Table.Compare<TSchema, TQuerySchema> => ({
	gte: {
		isFilter: (filter) => filter?.[start] !== undefined,
		filter: ({ shallowFilter, item }) => {
			shallowFilter({
				...extra,
				[start]: item[value],
			});
		},
		clear: ({ shallowFilter }) => {
			shallowFilter({
				[start]: undefined,
			});
		},
	},
	lte: {
		isFilter: (filter) => filter?.[end] !== undefined,
		filter: ({ shallowFilter, item }) => {
			shallowFilter({
				...extra,
				[end]: item[value],
			});
		},
		clear: ({ shallowFilter }) => {
			shallowFilter({
				[end]: undefined,
			});
		},
	},
});
