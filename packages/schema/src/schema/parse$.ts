import {type Issue}      from "../api/Issue";
import {type PicoSchema} from "../api/PicoSchema";

export namespace parse$ {
    export type ResultSuccess<TSchema extends PicoSchema> = {
        success: true;
        data: PicoSchema.Output<TSchema>;
    };

    export type ResultIssues = {
        success: false;
        issues: Issue.Issues;
    }

    export type Result<TSchema extends PicoSchema> =
        | ResultSuccess<TSchema>
        | ResultIssues;
}

export const parse$ = <TSchema extends PicoSchema>(
    schema: TSchema,
    input: unknown,
    info?: Pick<PicoSchema.Parse.Info, "abortEarly" | "abortPipeEarly" | "skipPipe">
): parse$.Result<TSchema> => {
    const result = schema.parse(input, info);
    return result.issues ? {
        success: false,
        issues:  result.issues,
    } : {
        success: true,
        data:    result.output,
    };
};
