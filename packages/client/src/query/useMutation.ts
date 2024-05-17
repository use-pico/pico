import {useMutation as useCoolMutation} from "@tanstack/react-query";
import type {
    RequestSchema,
    ResponseSchema
}                                       from "@use-pico2/common";
import {IWithMutation}                  from "./IWithMutation";
import {useInvalidator}                 from "./useInvalidator";

export namespace useMutation {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > extends IWithMutation.Options<TRequestSchema, TResponseSchema> {
        withMutation: IWithMutation<TRequestSchema, TResponseSchema>;
    }
}

export const useMutation = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    {
        withMutation: {
                          key,
                          useCallback,
                          schema,
                          invalidator,
                          defaultOptions: {
                                              onSuccess: onDefaultSuccess,
                                              ...        defaultOptions
                                          } = {},
                      },
        mutationKey:  $mutationKey,
        onSuccess,
        ...options
    }: useMutation.Props<TRequestSchema, TResponseSchema>
) => {
    const $invalidator = useInvalidator({
        invalidator: {
            invalidator,
            key
        }
    });
    const callback = useCallback();
    return useCoolMutation({
        mutationKey: key.concat($mutationKey || []),
        mutationFn:  async request => {
            try {
                return schema.response.parse(
                    await callback(
                        schema.request.parse(request)
                    )
                );
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        ...defaultOptions,
        ...options,
        onSuccess: async (data, variables, context) => {
            setTimeout(() => {
                $invalidator();
            }, 0);
            onDefaultSuccess?.(data, variables, context);
            onSuccess?.(data, variables, context);
        },
    });
};
