import { fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { CursorSchema } from "./CursorSchema";
import type { FulltextSchema } from "./FulltextSchema";

export namespace withSearchSchema {
	export interface Props<TFilterSchema extends FulltextSchema> {
		filter: TFilterSchema;
	}
}

export const withSearchSchema = <TFilterSchema extends FulltextSchema>({
	filter,
}: withSearchSchema.Props<TFilterSchema>) => {
	return z.object({
		global: fallback(filter.optional(), {
			fulltext: "",
		}).default({
			fulltext: "",
		} as any),
		filter: fallback(filter.optional(), undefined),
		cursor: fallback(CursorSchema, { page: 0, size: 15 }).default({
			page: 0,
			size: 15,
		}),
		selection: fallback(z.array(z.string()), []).default([]),
	});
};
