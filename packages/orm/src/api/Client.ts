import {type Kysely}   from "kysely";
import {type Database} from "./Database";

export type Client<TDatabase extends Database> = Kysely<TDatabase>;
