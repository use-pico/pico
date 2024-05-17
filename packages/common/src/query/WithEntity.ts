import {type z} from "zod";

export interface WithEntity<TEntity> {
    entity: TEntity;
}

export namespace WithEntity {
    export type Schema<TSchema extends z.ZodSchema> = WithEntity<z.infer<TSchema>>;

    export namespace Schema {
        export type $<TSchema extends z.ZodSchema> = Partial<Schema<TSchema>>;
    }

    export type $<TEntity> = Partial<WithEntity<TEntity>>;
}
