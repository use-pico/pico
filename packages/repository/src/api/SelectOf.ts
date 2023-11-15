import {type Database}           from "@use-pico/orm";
import {type SelectQueryBuilder} from "kysely";

export type SelectOf<
    TDatabase extends Database,
    TTable extends keyof TDatabase & string,
    T,
> = SelectQueryBuilder<TDatabase, TTable, T>;
