import { fallback } from "@tanstack/zod-adapter";
import {
    CursorSchema,
    type FilterSchema,
    type SortSchema,
} from "@use-pico/common";
import { z } from "zod";

export namespace withSourceSearchSchema {
	export interface Props<
		TFilterSchema extends FilterSchema,
		TSortSchema extends SortSchema<any>,
	> {
		filter: TFilterSchema;
		sort: TSortSchema;
	}
}

export const withSourceSearchSchema = <
	TFilterSchema extends FilterSchema,
	TSortSchema extends SortSchema<any>,
>({
	filter,
	sort,
}: withSourceSearchSchema.Props<TFilterSchema, TSortSchema>) => {
	return z.object({
		filter: fallback(filter.optional(), undefined),
		cursor: fallback(CursorSchema, { page: 0, size: 15 }).default({
			page: 0,
			size: 15,
		}),
		sort: fallback(sort.optional(), undefined),
		selection: fallback(z.array(z.string()), []).default([]),
	});
};
