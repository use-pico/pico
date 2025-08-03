import { z } from "zod";
import { EntitySchema } from "../source/EntitySchema";

export const IssueSchema = z.object({
	...EntitySchema.shape,
	message: z.string(),
	type: z
		.enum([
			"info",
			"warning",
			"error",
		])
		.default("info"),
	context: z.object({}).loose().nullish(),
});

type IssueSchema = typeof IssueSchema;

export namespace IssueSchema {
	export type Type = z.infer<IssueSchema>;
}
