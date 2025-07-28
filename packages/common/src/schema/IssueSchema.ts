import { z } from "zod";
import { IdentitySchema } from "./IdentitySchema";

export const IssueSchema = z.object({
	...IdentitySchema.shape,
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
