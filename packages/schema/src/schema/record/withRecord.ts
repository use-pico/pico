import {type ErrorMessage} from "../../api/ErrorMessage";
import {type Issue}        from "../../api/Issue";
import {type PicoSchema}   from "../../api/PicoSchema";
import {type Pipe}         from "../../api/Pipe";
import {type RecordSchema} from "../../api/schema/RecordSchema";
import {type StringSchema} from "../../api/schema/StringSchema";
import {argsOf}            from "../../utils/argsOf";
import {issuesOf}          from "../../utils/issuesOf";
import {pipeOf}            from "../../utils/pipeOf";
import {withString}        from "../string/withString";
import {withSchema}        from "../withSchema";

const OMIT = ["__proto__", "prototype", "constructor"];

function $argsOf<
    TKey extends RecordSchema.Key,
    TValue extends PicoSchema,
    TPipe extends Pipe<any>,
>(
    arg1: TValue | TKey,
    arg2: TPipe | ErrorMessage | TValue | undefined,
    arg3: TPipe | ErrorMessage | undefined,
    arg4: TPipe | undefined
): [TKey, TValue, ErrorMessage | undefined, TPipe | undefined] {
    if (typeof arg2 === "object" && !Array.isArray(arg2)) {
        const [error, pipe] = argsOf(arg3, arg4);
        return [arg1 as TKey, arg2, error, pipe];
    }
    const [error, pipe] = argsOf<TPipe>(
        arg2 as TPipe | ErrorMessage | undefined,
        arg3 as TPipe | undefined
    );
    return [withString() as TKey, arg1 as TValue, error, pipe];
}

export function withRecord<
    TValue extends PicoSchema,
>(
    value: TValue,
    pipe?: Pipe<RecordSchema.Output<StringSchema, TValue>>,
): RecordSchema<StringSchema, TValue>;

export function withRecord<
    TValue extends PicoSchema,
>(
    value: TValue,
    error: ErrorMessage,
    pipe?: Pipe<RecordSchema.Output<StringSchema, TValue>>,
): RecordSchema<StringSchema, TValue>;

export function withRecord<
    TKey extends RecordSchema.Key,
    TValue extends PicoSchema,
>(
    key: TKey,
    value: TValue,
    pipe?: Pipe<RecordSchema.Output<StringSchema, TValue>>,
): RecordSchema<StringSchema, TValue>;

export function withRecord<
    TKey extends RecordSchema.Key,
    TValue extends PicoSchema,
>(
    key: TKey,
    value: TValue,
    error: ErrorMessage,
    pipe?: Pipe<RecordSchema.Output<StringSchema, TValue>>,
): RecordSchema<StringSchema, TValue>;

export function withRecord<
    TKey extends RecordSchema.Key,
    TValue extends PicoSchema,
>(
    arg1: TKey | TValue,
    arg2?:
        | Pipe<RecordSchema.Output<TKey, TValue>>
        | ErrorMessage
        | TValue,
    arg3?:
        | Pipe<RecordSchema.Output<TKey, TValue>>
        | ErrorMessage,
    arg4?:
        | Pipe<RecordSchema.Output<TKey, TValue>>,
): RecordSchema<TKey, TValue> {
    const [key, value, error, pipe] = $argsOf<
        TKey,
        TValue,
        Pipe<RecordSchema.Output<TKey, TValue>>
    >(arg1, arg2, arg3, arg4);

    return withSchema({
        schema: "record",
        record: {
            key,
            value,
        },
        _parse(input, info) {
            if (!input || typeof input !== "object") {
                return issuesOf(
                    info,
                    "type",
                    "record",
                    error || "Given type is not an object",
                    input
                );
            }

            let issues: Issue.Issues | undefined;
            const output: Record<string | number | symbol, any> = {};

            for (const [$key, $value] of Object.entries(input)) {
                if (OMIT.includes($key)) {
                    continue;
                }
                let pathItem: RecordSchema.PathItem | undefined;

                const keyResult = key._parse($key, {
                    origin:         "key",
                    abortEarly:     info?.abortEarly,
                    abortPipeEarly: info?.abortPipeEarly,
                    skipPipe:       info?.skipPipe,
                });

                if (keyResult.issues) {
                    pathItem = {
                        schema: "record",
                        input,
                        key:    $key,
                        value:  $value,
                    };

                    for (const issue of keyResult.issues) {
                        issue.path = [pathItem];
                        issues?.push(issue);
                    }
                    if (!issues) {
                        issues = keyResult.issues;
                    }

                    if (info?.abortEarly) {
                        break;
                    }
                }

                const valueResult = value._parse($value, info);

                if (valueResult.issues) {
                    pathItem = pathItem || {
                        schema: "record",
                        input,
                        key:    $key,
                        value:  $value,
                    };

                    for (const issue of valueResult.issues) {
                        issue.path ? issue.path.unshift(pathItem) : (issue.path = [pathItem]);
                        issues?.push(issue);
                    }

                    !issues && (issues = valueResult.issues);

                    if (info?.abortEarly) {
                        break;
                    }
                }

                if (!keyResult.issues && !valueResult.issues) {
                    output[keyResult.output] = valueResult.output;
                }
            }

            return issues
                ? {issues}
                : pipeOf(
                    output as RecordSchema.Output<TKey, TValue>,
                    pipe,
                    info,
                    "record"
                );
        },
    });
}
