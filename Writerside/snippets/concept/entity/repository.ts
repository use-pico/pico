/**
 * Pico uses Kysely under the hood, so Database defines your
 * database shape.
 */
import {type Database}         from "@use-pico/orm";
/**
 * Here we need dull schema factory as a type to infer types
 * we need for the Repository.
 */
import {withDullSchema}        from "@use-pico/dull-stuff";
import {TranslationDullSchema} from "@use-pico/i18n";
/**
 * Client (database) connector; basically wrapped Kysely client.
 */
import {
    type Client,
    withClient
}                              from "@use-pico/orm";
import {AbstractRepository}    from "@use-pico/repository";

export class TranslationRepository extends AbstractRepository<
    Database,
    withDullSchema.Infer.RepositorySchema<TranslationDullSchema>,
    /**
     * Table name
     */
    "Translation"
> {
    /**
     * Pico uses DI container, so this will be injected
     */
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
        /**
         * You can optionally specify default orderBy for the repository
         */
        this.defaultOrderBy = {
            locale: "asc",
            key:    "asc",
        };
        /**
         * Based on you schemas here you will be forced to map all
         * "filter" keys to database columns.
         */
        this.matchOf = {
            locale: "locale",
            key:    "key",
        };
    }
}

export namespace TranslationRepository {
    export type Type = InstanceType<typeof TranslationRepository>;
}
