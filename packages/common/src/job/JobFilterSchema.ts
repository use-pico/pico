import {z}            from "zod";
import {FilterSchema} from "../query/FilterSchema";

export const JobFilterSchema = FilterSchema.merge(z.object({
	status:    z.number().optional(),
	statusIn:  z.array(z.number()).optional(),
	service:   z.string().optional(),
	serviceIn: z.array(z.string()).optional(),
	reference: z.string().optional(),
	commit:    z.boolean().optional(),
	userId:    z.string().optional(),
	user:      z.boolean().optional(),
}));
export type JobFilterSchema = typeof JobFilterSchema;
export namespace JobFilterSchema {
	export type Type = z.infer<JobFilterSchema>;
}
