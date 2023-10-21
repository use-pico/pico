import {type PicoSchema} from "@use-pico/schema";

export interface WithEntity<TEntity> {
    entity: TEntity;
}

export namespace WithEntity {
    export type Schema<TSchema extends PicoSchema> = WithEntity<PicoSchema.Output<TSchema>>;

    export namespace Schema {
        export type $<TSchema extends PicoSchema> = Partial<Schema<TSchema>>;
    }

    export type $<TEntity> = Partial<WithEntity<TEntity>>;
}
