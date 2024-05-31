import type {
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	WithIdentitySchema
}               from "@use-pico/common";
import {type z} from "zod";
import {Table}  from "./Table";

export const filterEqual = <
	TSchema extends WithIdentitySchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
	key: keyof NonNullable<z.infer<TQuerySchema["shape"]["filter"]>>,
	value: keyof z.infer<TSchema>,
): Table.Filter<TSchema, TQuerySchema> => ({
	isFilter: filter => (filter)?.[key] !== undefined,
	filter:   ({
				   shallowFilter,
				   item,
			   }) => {
		shallowFilter({
			[key]: item[value],
		});
	},
	clear:    ({shallowFilter}) => {
		shallowFilter({
			[key]: undefined
		});
	},
});
