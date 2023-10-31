import {type IContainer}     from "@use-pico/container";
import {
    type PicoSchema,
    type WithIdentitySchema
}                            from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {withCreate}          from "./withCreate";

export namespace withMutation {
    export interface Props<
        TMutationSchema extends MutationSchema<any, any>,
    > {
        container: IContainer.Type;
        request: PicoSchema.Output<TMutationSchema>;
        table: string;
    }
}

export const withMutation = async <
    TMutationSchema extends MutationSchema<any, any>,
    TEntity extends WithIdentitySchema,
>(
    {
        request,
        container,
        table,
    }: withMutation.Props<TMutationSchema>
): Promise<PicoSchema.Output<TEntity>> => {
    if (request.create) {
        return withCreate({
            table,
            container,
            request: request.create,
        });
    }

    throw new Error("Nothing to do");
};
