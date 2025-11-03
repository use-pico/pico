import type { InferResult, SelectQueryBuilder } from "kysely";
import type { z } from "zod";
import type { IsSame } from "../type/IsSame";

// Original simple implementation (for reference):
// export type EnsureSelectOutputSchema<
// 	TSelect extends SelectQueryBuilder<any, any, any>,
// 	TOutputSchema extends z.ZodSchema,
// > = IsSame<
// 	Record<keyof InferResult<TSelect>[number], unknown>,
// 	Record<keyof z.infer<TOutputSchema>, unknown>
// > extends true
// 	? TOutputSchema
// 	: "Output schema is not assignable to select result.";

type SelectKeys<TSelect extends SelectQueryBuilder<any, any, any>> =
	keyof InferResult<TSelect>[number];
type SchemaKeys<TOutputSchema extends z.ZodSchema> =
	keyof z.infer<TOutputSchema>;

type MissingInSchema<
	TSelect extends SelectQueryBuilder<any, any, any>,
	TOutputSchema extends z.ZodSchema,
> = Exclude<SelectKeys<TSelect>, SchemaKeys<TOutputSchema>>;

type MissingInSelect<
	TSelect extends SelectQueryBuilder<any, any, any>,
	TOutputSchema extends z.ZodSchema,
> = Exclude<SchemaKeys<TOutputSchema>, SelectKeys<TSelect>>;

type FormatError<
	TSelect extends SelectQueryBuilder<any, any, any>,
	TOutputSchema extends z.ZodSchema,
> = MissingInSchema<TSelect, TOutputSchema> extends never
	? MissingInSelect<TSelect, TOutputSchema> extends never
		? never
		: {
				error: "Schema has extra fields that are not in select result";
				missingInSelect: MissingInSelect<TSelect, TOutputSchema>[];
			}
	: MissingInSelect<TSelect, TOutputSchema> extends never
		? {
				error: "Select result has extra fields that are not in schema";
				missingInSchema: MissingInSchema<TSelect, TOutputSchema>[];
			}
		: {
				error: "Select result and schema have mismatched fields";
				missingInSchema: MissingInSchema<TSelect, TOutputSchema>[];
				missingInSelect: MissingInSelect<TSelect, TOutputSchema>[];
			};

export type EnsureSelectOutputSchema<
	TSelect extends SelectQueryBuilder<any, any, any>,
	TOutputSchema extends z.ZodSchema,
> = IsSame<
	Record<SelectKeys<TSelect>, unknown>,
	Record<SchemaKeys<TOutputSchema>, unknown>
> extends true
	? TOutputSchema
	: FormatError<TSelect, TOutputSchema>;
