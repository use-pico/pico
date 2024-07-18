import { z } from "zod";

export const JobSchema = z.object({
	id: z.string().min(1),
	service: z.string().min(1),
	reference: z.string().nullish(),
	status: z.number(),
	total: z.number(),
	progress: z.any(),
	successCount: z.number(),
	errorCount: z.number(),
	skipCount: z.number(),
	request: z.any().nullish(),
	response: z.any().nullish(),
	started: z.string(),
	finished: z.string().nullish(),
	commit: z.boolean(),
	userId: z.string().min(1),
});
export type JobSchema = typeof JobSchema;
export namespace JobSchema {
	export type Type = z.infer<JobSchema>;
}
