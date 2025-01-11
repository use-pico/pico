import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";

export type WithTransaction = Transaction<Database>;
