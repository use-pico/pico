import {Kysely}        from "kysely";
import {withUuidTable} from "../utils/withUuidTable";

export async function migration(db: Kysely<any>): Promise<void> {
    await withUuidTable("User", db)
        .addColumn("name", "text")
        .addColumn("email", "text", col => col.unique().notNull())
        .addColumn("emailVerified", "timestamptz")
        .addColumn("image", "text")
        .execute();

    await withUuidTable("Account", db)
        .addColumn("userId", "uuid", col =>
            col.references("User.id").onDelete("cascade").notNull()
        )
        .addColumn("type", "text", col => col.notNull())
        .addColumn("provider", "text", col => col.notNull())
        .addColumn("providerAccountId", "text", col => col.notNull())
        .addColumn("refresh_token", "text")
        .addColumn("access_token", "text")
        .addColumn("expires_at", "bigint")
        .addColumn("token_type", "text")
        .addColumn("scope", "text")
        .addColumn("id_token", "text")
        .addColumn("session_state", "text")
        .execute();

    await withUuidTable("Session", db)
        .addColumn("userId", "uuid", col =>
            col.references("User.id").onDelete("cascade").notNull()
        )
        .addColumn("sessionToken", "text", col => col.notNull().unique())
        .addColumn("expires", "timestamptz", col => col.notNull())
        .execute();

    await db.schema
        .createTable("VerificationToken")
        .addColumn("identifier", "text", col => col.notNull())
        .addColumn("token", "text", col => col.notNull().unique())
        .addColumn("expires", "timestamptz", col => col.notNull())
        .execute();

    await db.schema
        .createIndex("Account_userId_index")
        .on("Account")
        .column("userId")
        .execute();

    await db.schema
        .createIndex("Session_userId_index")
        .on("Session")
        .column("userId")
        .execute();

    await withUuidTable("Translation", db)
        .addColumn("locale", "text", col => col.notNull())
        .addColumn("key", "text", col => col.notNull())
        .addColumn("hash", "text", col => col.notNull())
        .addColumn("value", "text", col => col.notNull())
        .addUniqueConstraint("Translation_locale_hash_unique", ["locale", "hash"])
        .execute();
}
