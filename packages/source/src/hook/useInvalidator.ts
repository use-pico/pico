import {
    type IInvalidator,
    type QuerySchema,
    useInvalidator as useCoolInvalidator
}                                from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {type IWithSourceQuery}   from "../api/IWithSourceQuery";

export namespace useInvalidator {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TSchema extends WithIdentitySchema,
    > {
        withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
    }
}

export const useInvalidator = <
    TQuerySchema extends QuerySchema<any, any>,
    TSchema extends WithIdentitySchema,
>(
    {
        withSourceQuery,
    }: useInvalidator.Props<TQuerySchema, TSchema>
): IInvalidator.Result => {
    const invalidator = useCoolInvalidator({invalidator: withSourceQuery});
    const countInvalidator = useCoolInvalidator({invalidator: withSourceQuery.withCountQuery});
    return async () => {
        await invalidator();
        await countInvalidator();
    };
};
