import {type Issue} from "./Issue";

export namespace Parse {
    export type Result<TOutput> =
        | {
              output: TOutput;
              issues?: undefined;
          }
        | {
              output?: undefined;
              issues: Issue.Issues;
          };

    export type Info = Partial<
        Pick<Issue, "origin" | "abortEarly" | "abortPipeEarly" | "skipPipe">
    >;
}
