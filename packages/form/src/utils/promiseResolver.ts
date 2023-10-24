import {
    type FilterSchema,
    type WithQuery
}                                from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {type ValuesSchema}       from "../schema/ValuesSchema";
import {type Form}               from "../ui/Form";

export function promiseResolver<
    TValuesSchema extends ValuesSchema,
    TResult extends string | undefined,
    TFilterSchema extends FilterSchema,
>(
    promise: WithQuery.UsePromise<TFilterSchema, WithIdentitySchema>,
    pick: keyof TValuesSchema["shape"],
): Form.Resolver<TValuesSchema, TResult> {
    return async ({defaultValues}) => {
        return (defaultValues[pick] ? (await promise(defaultValues[pick])).id : undefined) as TResult;
    };
}
