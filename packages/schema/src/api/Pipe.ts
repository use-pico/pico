import {type Issue}      from "./Issue";
import {type PicoSchema} from "./PicoSchema";

export namespace Pipe {
    export type Info =
        PicoSchema.Parse.Info
        & Pick<Issue, "reason">;

    export type Result<TOutput> =
        | {
              output: TOutput;
              issues?: undefined;
          }
        | {
              output?: undefined;
              issues: Pick<Issue, "validation" | "message" | "input" | "path">[];
          }
}

export type Pipe<TValue> = ((value: TValue) => Pipe.Result<TValue>)[];
