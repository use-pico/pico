import {type RequestSchema} from "@use-pico/schema";
import {withMutation}       from "./withMutation";

export namespace withPassMutation {
    export interface Props<
        TSchema extends RequestSchema,
    > extends Omit<
        withMutation.Props<TSchema, TSchema>,
        "schema" | "mutator"
    > {
        schema: TSchema;
    }
}

export const withPassMutation = <
    TSchema extends RequestSchema,
>(
    {
        schema,
        ...props
    }: withPassMutation.Props<TSchema>
) => {
    return withMutation({
        schema:  {
            request:  schema,
            response: schema,
        },
        mutator: async request => request,
        ...props,
    });
};
