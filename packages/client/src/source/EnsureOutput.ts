import type { IsSame } from "@use-pico/common";
import type { InferResult, SelectQueryBuilder } from "kysely";
import type { z } from "zod";

export type EnsureOutput<
	TSelect extends SelectQueryBuilder<any, any, any>,
	TOutputSchema extends z.ZodSchema,
> =
	IsSame<
		Record<keyof InferResult<TSelect>[number], unknown>,
		Record<keyof z.infer<TOutputSchema>, unknown>
	> extends true ?
		TOutputSchema
	:	"Output schema is not assignable to select result.";
