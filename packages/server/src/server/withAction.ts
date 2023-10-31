import {
    type IContainer,
    instance
} from "@use-pico/container";
import {
    parse,
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
} from "@use-pico/schema";

export namespace withAction {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        (container: IContainer.Type): ActionProps<TRequestSchema, TResponseSchema>;
    }

    export interface ActionProps<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        request: TRequestSchema;
        response: TResponseSchema;
        action: Action<TRequestSchema, TResponseSchema>;
    }

    export type Action<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > = (request: PicoSchema.Output<TRequestSchema>) => Promise<PicoSchema.Output<TResponseSchema>>;
}

export const withAction = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    factory: withAction.Props<TRequestSchema, TResponseSchema>,
): withAction.Action<TRequestSchema, TResponseSchema> => {
    const $container = instance.container().child();
    // here container could be modified (provide user stuff and so on)
    const {
        request,
        response,
        action
    } = factory($container);
    return async $request => parse(
        response,
        await action(
            parse(request, $request),
        )
    );
};
