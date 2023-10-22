import {
    type MutationKey,
    useMutation,
    useQueryClient
}                          from "@tanstack/react-query";
import {
    parse,
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                          from "@use-pico/schema";
import {type IInvalidator} from "../api/IInvalidator";
import {type WithMutation} from "../api/WithMutation";

export namespace withMutation {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        key: MutationKey;
        schema: {
            request: TRequestSchema;
            response: TResponseSchema;
        };
        invalidator?: IInvalidator.Invalidator;

        mutator(request: PicoSchema.Output<TRequestSchema>): Promise<PicoSchema.Output<TResponseSchema>>;

        defaultOptions?: WithMutation.Options<TRequestSchema, TResponseSchema>;
    }
}

export const withMutation = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    {
        key,
        schema,
        invalidator,
        mutator,
        defaultOptions: {
                            onSuccess: onDefaultSuccess,
                            ...        defaultOptions
                        } = {},
    }: withMutation.Props<
        TRequestSchema,
        TResponseSchema
    >
): WithMutation<TRequestSchema, TResponseSchema> => {
    return {
        key,
        schema,
        useInvalidator() {
            const queryClient = useQueryClient();
            return invalidator ? (async () => {
                return invalidator({
                    queryClient,
                });
            }) : (async () => {
                return queryClient.invalidateQueries({
                    queryKey: key,
                });
            });
        },
        useMutation: (
                         {
                             mutationKey: $mutationKey,
                             onSuccess,
                             ...options
                         }: WithMutation.Options<TRequestSchema, TResponseSchema> = {}
                     ) => {
            const queryClient = useQueryClient();
            return useMutation({
                mutationKey: key.concat($mutationKey || []),
                mutationFn:  request => {
                    try {
                        return mutator(parse(schema.request, request));
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                },
                ...defaultOptions,
                ...options,
                onSuccess: async (data, variables, context) => {
                    setTimeout(() => {
                        invalidator?.({
                            queryClient,
                        });
                    }, 0);
                    onDefaultSuccess?.(data, variables, context);
                    onSuccess?.(data, variables, context);
                },
            });
        },
    };
};
