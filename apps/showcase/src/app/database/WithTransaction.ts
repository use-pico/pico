import type { Transaction } from "kysely";
import type { Database } from "~/app/database/Database";

export type WithTransaction = Transaction<Database>;
