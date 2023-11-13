import {withDullSchema}        from "@use-pico/dull-stuff";
import {TranslationDullSchema} from "@use-pico/i18n";
import {
    type Client,
    type Database,
    withClient
}                              from "@use-pico/orm";
import {AbstractRepository}    from "@use-pico/repository";
import {type PicoSchema}       from "@use-pico/schema";
import {keyOf}                 from "@use-pico/utils";

export class TranslationRepository extends AbstractRepository<
    Database,
    withDullSchema.Infer.RepositorySchema<TranslationDullSchema>,
    "Translation"
> {
    static inject = [
        withClient.inject,
    ];

    constructor(
        client: Client<Database>,
    ) {
        super(
            client,
            TranslationDullSchema.repository,
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


    public async toCreate(create: NonNullable<PicoSchema.Output<withDullSchema.Infer.MutationSchema<TranslationDullSchema>["shape"]["create"]>>): Promise<Omit<withDullSchema.Infer.Entity<TranslationDullSchema>, "id">> {
        return {
            ...create,
            hash: keyOf(create.key),
        };
    }

    public async toUpdate(update: NonNullable<PicoSchema.Output<withDullSchema.Infer.MutationSchema<TranslationDullSchema>["shape"]["update"]>>["update"]): Promise<Partial<withDullSchema.Infer.Entity<TranslationDullSchema>>> {
        return {
            ...update,
            hash: update?.key ? keyOf(update.key) : undefined
        };
    }
}

export namespace TranslationRepository {
    export type Type = InstanceType<typeof TranslationRepository>;
}
