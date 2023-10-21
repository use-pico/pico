import {toNestErrors} from "@hookform/resolvers";
import {
    parse,
    parseAsync,
    ParseError,
    type PicoSchema
}                     from "@use-pico/schema";
import {
    appendErrors,
    FieldError,
    FieldErrors,
    FieldValues,
    ResolverOptions,
    ResolverResult
}                     from "react-hook-form";

export type picoResolver = <TSchema extends PicoSchema>(
    schema: TSchema,
    schemaOptions?: Partial<Pick<PicoSchema.Parse.Info, "abortEarly" | "abortPipeEarly">>,
    resolverOptions?: {
        /**
         * @default async
         */
        mode?: "sync" | "async";
        /**
         * Return the raw input values rather than the parsed values.
         * @default false
         */
        raw?: boolean;
    },
) => <TFieldValues extends FieldValues, TContext>(
    values: TFieldValues,
    context: TContext | undefined,
    options: ResolverOptions<TFieldValues>,
) => Promise<ResolverResult<TFieldValues>>;

const parseErrors = (
    parseError: ParseError,
    validateAllFieldCriteria: boolean,
): FieldErrors => {
    const errors: Record<string, FieldError> = {};

    for (; parseError.issues.length;) {
        const error = parseError.issues[0];
        if (!error.path) {
            continue;
        }
        const _path = error.path.map(({key}) => key).join(".");

        if (!errors[_path]) {
            errors[_path] = {
                message: error.message,
                type:    error.validation
            };
        }

        if (validateAllFieldCriteria && errors[_path]) {
            const types = errors[_path]?.types;
            const messages = types && types[error.validation];

            errors[_path] = appendErrors(
                _path,
                validateAllFieldCriteria,
                errors,
                error.validation,
                messages
                    ? ([] as string[]).concat(messages as string[], error.message)
                    : error.message,
            ) as FieldError;
        }

        parseError.issues.shift();
    }

    return errors;
};

export const picoResolver: picoResolver = (
    schema,
    schemaOptions,
    resolverOptions = {},
) =>
    async (values, _, options) => {
        try {
            const schemaOpts = Object.assign(
                {},
                {
                    abortEarly:     false,
                    abortPipeEarly: false,
                },
                schemaOptions,
            );

            const parsed =
                resolverOptions.mode === "sync"
                    ? parse(schema, values, schemaOpts)
                    : await parseAsync(
                        schema,
                        values,
                        schemaOpts,
                    );

            return {
                values: resolverOptions.raw ? values : parsed,
                errors: {} as FieldErrors,
            };
        } catch (error) {
            if (error instanceof ParseError) {
                return {
                    values: {},
                    errors: toNestErrors(
                        parseErrors(
                            error,
                            !options.shouldUseNativeValidation &&
                            options.criteriaMode === "all",
                        ),
                        options,
                    ),
                };
            }

            throw error;
        }
    };
