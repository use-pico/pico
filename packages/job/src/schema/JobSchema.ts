import {
    nonEmpty,
    type PicoSchema,
    withAny,
    withBool,
    withNullish,
    withNumber,
    withObject,
    withString
} from "@use-pico/schema";

export const JobSchema = withObject({
    id:           withString([nonEmpty("Non-empty")]),
    service:      withString([nonEmpty("Non-empty")]),
    reference:    withNullish(withString()),
    status:       withNumber(),
    total:        withNumber(),
    progress:     withAny(),
    successCount: withNumber(),
    errorCount:   withNumber(),
    skipCount:    withNumber(),
    request:      withNullish(withAny()),
    response:     withNullish(withAny()),
    started:      withString(),
    finished:     withNullish(withString()),
    commit:       withBool(),
    userId:       withString([nonEmpty("Non-empty")]),
});
export type JobSchema = typeof JobSchema;
export namespace JobSchema {
    export type Type = PicoSchema.Output<JobSchema>;
}
