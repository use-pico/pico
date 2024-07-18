import type { JobSchema, RequestSchema } from "@use-pico/common";
import type { IWithMutation } from "../query/IWithMutation";

export type IWithAsync<TRequestSchema extends RequestSchema> = IWithMutation<
	TRequestSchema,
	JobSchema
>;
