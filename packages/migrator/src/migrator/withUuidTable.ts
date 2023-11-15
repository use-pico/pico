import {
    Kysely,
    sql
} from "kysely";

export const withUuidTable = (table: string, db: Kysely<any>) => {
    return db.schema
        .createTable(table)
        .addColumn("id", "uuid", col =>
            col.primaryKey().defaultTo(sql`gen_random_uuid()`)
        );
};
