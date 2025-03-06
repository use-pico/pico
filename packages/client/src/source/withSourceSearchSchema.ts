import { fallback } from "@tanstack/zod-adapter";
import { CursorSchema, type FilterSchema } from "@use-pico/common";
import { z } from "zod";

export namespace withSourceSearchSchema {
	export interface Opts {
		size?: number;
	}

	export interface Props<TFilterSchema extends FilterSchema> {
		filter: TFilterSchema;
	}
}

export const withSourceSearchSchema = <TFilterSchema extends FilterSchema>(
	{ filter }: withSourceSearchSchema.Props<TFilterSchema>,
	{ size = 30 }: withSourceSearchSchema.Opts = { size: 30 },
) => {
	return z.object({
		filter: fallback(filter.default({ fulltext: "" }), {
			fulltext: "",
		}),
		cursor: fallback(CursorSchema, { page: 0, size }).default({
			page: 0,
			size,
		}),
		sort: fallback(
			z.record(z.enum(["asc", "desc"]).optional()).default({}),
			{},
		),
		selection: fallback(z.array(z.string()).default([]), []),
	});
};
