import {type Database}           from "@use-pico/orm";
import {type SelectQueryBuilder} from "kysely";
import {type IRepository}        from "../api/IRepository";
import {type IWithApply}         from "../api/IWithApply";

export abstract class AbstractWithApply<
    TDatabase extends Database,
    TSchema extends IRepository.Schema<any, any, any, any>,
    TTable extends keyof TDatabase & string,
> implements IWithApply<
    TDatabase,
    TSchema,
    TTable
> {
    protected constructor(
        public schema: TSchema,
        public table: TTable,
    ) {
    }

    public applyWhere<T>(
        query: TSchema["query"],
        select: SelectQueryBuilder<TDatabase, TTable, T>
    ): SelectQueryBuilder<TDatabase, TTable, T> {
        return select;
    }

    public applyFilter<T>(
        query: TSchema["query"],
        select: SelectQueryBuilder<TDatabase, TTable, T>
    ): SelectQueryBuilder<TDatabase, TTable, T> {
        return select;
    }
}
