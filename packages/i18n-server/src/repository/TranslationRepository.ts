import {lazyOf}                from "@use-pico/container";
import {type withDullSchema}   from "@use-pico/dull-stuff";
import {TranslationDullSchema} from "@use-pico/i18n";
import {
    type Client,
    type Database,
    withClient
}                              from "@use-pico/orm";
import {AbstractRepository}    from "@use-pico/repository";
import {keyOf}                 from "@use-pico/utils";

export class TranslationRepository extends AbstractRepository<
    Database,
    TranslationDullSchema,
    "Translation"
> {
    static inject = [
        lazyOf(withClient.inject),
    ];

    constructor(
        client: Client<Database>,
    ) {
        super(
            client,
            TranslationDullSchema,
            "Translation",
        );
        this.defaultOrderBy = {
            locale: "asc",
            key:    "asc",
        };
        this.matchOf = {
            locale: "locale",
            hash:   "hash",
            key:    "key",
        };
    }


    public async toCreate(create: withDullSchema.Infer.Create<TranslationDullSchema>): Promise<withDullSchema.Infer.EntityWithoutId<TranslationDullSchema>> {
        return {
            ...create,
            hash: keyOf(create.key),
        };
    }

    public async toUpdate(update: withDullSchema.Infer.Update<TranslationDullSchema>["update"]): Promise<withDullSchema.Infer.Entity$<TranslationDullSchema>> {
        return {
            ...update,
            hash: update?.key ? keyOf(update.key) : undefined
        };
    }
}

export namespace TranslationRepository {
    export type Type = InstanceType<typeof TranslationRepository>;
}
