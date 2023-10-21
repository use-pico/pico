import {type PathItem} from "./PathItem";

export interface Issue {
    reason: Issue.Reason;
    validation: string;
    origin: Issue.Origin;
    message: string;
    input: any;
    path?: PathItem[];
    issues?: Issue.Issues;
    abortEarly?: boolean;
    abortPipeEarly?: boolean;
    skipPipe?: boolean;
}

export namespace Issue {
    export type Reason =
        | "any"
        | "array"
        | "bigint"
        | "blob"
        | "boolean"
        | "date"
        | "function"
        | "instance"
        | "map"
        | "number"
        | "object"
        | "record"
        | "set"
        | "special"
        | "string"
        | "symbol"
        | "tuple"
        | "undefined"
        | "unknown"
        | "type";

    export type Origin =
        | "key"
        | "value";

    export type Issues = [Issue, ...Issue[]];
}
