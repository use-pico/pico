import { fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { CursorSchema } from "./CursorSchema";
import type { FulltextSchema } from "./FulltextSchema";
import type { IdentitySchema } from "./IdentitySchema";

export namespace withSearchSchema {
	export interface Props<
		TDataSchema extends IdentitySchema,
		TFilterSchema extends FulltextSchema,
	> {
		data: TDataSchema;
		filter: TFilterSchema;
	}
}

export const withSearchSchema = <
	TDataSchema extends IdentitySchema,
	TFilterSchema extends FulltextSchema,
>({
	data,
	filter,
}: withSearchSchema.Props<TDataSchema, TFilterSchema>) => {
	return z.object({
		global: fallback(filter.optional(), {
			fulltext: "",
		}).default({
			fulltext: "",
		} as any),
		filter: fallback(filter.optional(), undefined),
		cursor: fallback(CursorSchema, { page: 0, size: 30 }).default({
			page: 0,
			size: 30,
		}),
		selection: fallback(z.record(data), {}).default({}),
	});
};
