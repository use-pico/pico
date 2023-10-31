import {type IContainer}  from "@use-pico/container";
import {withClient}       from "@use-pico/orm";
import {
    type PicoSchema,
    type WithIdentitySchema
}                         from "@use-pico/schema";
import {type ShapeSchema} from "@use-pico/source";
import {generateId}       from "@use-pico/utils";

export namespace withCreate {
    export interface Props<
        TShapeSchema extends ShapeSchema,
    > {
        container: IContainer.Type;
        request: PicoSchema.Output<TShapeSchema>;
        table: string;
    }
}

export const withCreate = async <
    TShapeSchema extends ShapeSchema,
    TEntity extends WithIdentitySchema,
>(
    {
        request,
        container,
        table,
    }: withCreate.Props<TShapeSchema>
): Promise<PicoSchema.Output<TEntity>> => {
    return await withClient
        .use(container)
        .insertInto(table as any)
        .values({
            ...request,
            id: generateId(),
        })
        .returningAll()
        .executeTakeFirstOrThrow() as any;
};
