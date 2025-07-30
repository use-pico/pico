import { zodValidator } from "@tanstack/zod-adapter";
import {
	CursorSchema,
	type FilterSchema,
	type OrderSchema,
} from "@use-pico/common";
import { z } from "zod";

export namespace withSourceSearchSchema {
	export interface Options {
		size?: number;
	}

	export interface Props<
		TFilterSchema extends FilterSchema,
		TSort extends Record<string, OrderSchema.Type>,
	> {
		filter: TFilterSchema;
		defaultSort?: TSort;
	}
}

export const withSourceSearchSchema = <
	TFilterSchema extends FilterSchema,
	TSort extends Record<string, OrderSchema.Type>,
>(
	{
		filter,
		defaultSort = {} as TSort,
	}: withSourceSearchSchema.Props<TFilterSchema, TSort>,
	{ size = 30 }: withSourceSearchSchema.Options = {
		size: 30,
	},
) => {
	const schema = z.object({
		filter: filter.optional(),
		cursor: CursorSchema.default({
			page: 0,
			size,
		}),
		sort: z
			.record(
				z.string(),
				z
					.enum([
						"asc",
						"desc",
					])
					.optional(),
			)
			.default(defaultSort) as unknown as z.ZodDefault<
			z.ZodObject<
				Record<
					keyof TSort,
					z.ZodOptional<
						z.ZodEnum<{
							asc: "asc";
							desc: "desc";
						}>
					>
				>
			>
		>,
		selection: z.array(z.string()).default([]),
	});

	return {
		schema,
		validateSearch: zodValidator(schema),
	} as const;
};
