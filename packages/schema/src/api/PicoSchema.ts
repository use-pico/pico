import {type Issue} from "./Issue";

export interface PicoSchema<TInput = any, TOutput = TInput> {
    _parse(input: unknown, info?: PicoSchema.Parse.Info): PicoSchema.Parse.Result<TOutput>;

    _parseAsync(input: unknown, info?: PicoSchema.Parse.Info): Promise<PicoSchema.Parse.Result<TOutput>>;

    types: {
        input: TInput;
        output: TOutput;
    };
}

export namespace PicoSchema {
    export type Input<TSchema extends PicoSchema> = TSchema["types"]["input"];
    export type Output<TSchema extends PicoSchema> = TSchema["types"]["output"];

    export namespace Parse {
        export type ResultSuccess<TOutput> = {
            output: TOutput;
            issues?: undefined;
        }

        export type ResultIssues = {
            output?: undefined;
            issues: Issue.Issues;
        }

        export type Result<TOutput> =
            | ResultSuccess<TOutput>
            | ResultIssues;

        export type Info = Partial<
            Pick<Issue, "origin" | "abortEarly" | "abortPipeEarly" | "skipPipe">
        >;
    }
}
