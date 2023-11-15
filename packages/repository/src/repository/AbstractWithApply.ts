import {type withDullSchema} from "@use-pico/dull-stuff";
import {type Database}       from "@use-pico/orm";
import {
    type FilterSchema,
    type OrderSchema
}                            from "@use-pico/query";
import {type IWithApply}     from "../api/IWithApply";
import {type SelectOf}       from "../api/SelectOf";

export abstract class AbstractWithApply<
    TDatabase extends Database,
    TSchema extends withDullSchema.Schema<any, any, any, any>,
    TTable extends keyof TDatabase & string,
> implements IWithApply<
    TDatabase,
    TSchema,
    TTable
> {
    public defaultOrderBy?: withDullSchema.Infer.OrderBy<TSchema>;
    public matchOf?: Record<
        keyof Omit<
            withDullSchema.Infer.Filter<TSchema>,
            keyof FilterSchema.Type
        >,
        string
    >;
    public matchOfIn?: Partial<
        Record<
            keyof Omit<
                withDullSchema.Infer.Filter<TSchema>,
                keyof FilterSchema.Type
            >,
            string
        >
    >;
    public fulltextOf?: Partial<
        Record<
            keyof Omit<
                withDullSchema.Infer.Filter<TSchema>,
                keyof FilterSchema.Type
            >,
            string
        >
    >;

    protected constructor(
        public schema: TSchema,
        public table: TTable,
    ) {
    }

    public with<T>(query: withDullSchema.Infer.Query<TSchema>, select: SelectOf<TDatabase, TTable, T>): SelectOf<TDatabase, TTable, T> {
        return select;
    }

    protected applyMatchOf<T>(
        matchOf: FilterSchema.Type | null | undefined,
        select: SelectOf<TDatabase, TTable, T>
    ) {
        let $select = select;

        const $matchOf = {
            /**
             * Default fields; it assumes standard ID field is present
             */
            id: "id",
            ...this.matchOf,
        };
        const $matchOfIn = {
            idIn: "id",
            ...this.matchOfIn,
        };

        /**
         * A bit of magic: look into fields coming from the outside and remap them on exact match for database column.
         *
         * This is because we don't want to let user directly send column names here.
         *
         * Also, this enables search only for known fields, not arbitrary ones.
         */
        for (const [match, value] of Object.entries(matchOf || {})) {
            if (value === undefined) {
                continue;
            }
            $matchOf[match as keyof typeof this.matchOf] && ($select = $select.where(
                    $matchOf[match as keyof typeof this.matchOf] as any,
                    value === null ? "is" : "=",
                    value
                )
            );
        }
        for (const [match, values] of Object.entries(matchOf || {})) {
            if (!Array.isArray(values)) {
                continue;
            }
            $matchOfIn[match as keyof typeof this.matchOfIn] && ($select = $select.where(
                    $matchOfIn[match as keyof typeof this.matchOfIn] as any,
                    values.length ? "in" : "is",
                    values.length ? values : null
                )
            );
        }

        return $select;
    }

    public applyWhere<T>(
        query: withDullSchema.Infer.Query<TSchema>,
        select: SelectOf<TDatabase, TTable, T>
    ): SelectOf<TDatabase, TTable, T> {
        return this.applyMatchOf(query.where, select);
    }

    public applyFilter<T>(
        query: withDullSchema.Infer.Query<TSchema>,
        select: SelectOf<TDatabase, TTable, T>
    ): SelectOf<TDatabase, TTable, T> {
        return this.applyMatchOf(query.filter, select);
    }

    public applyOrderBy<T>(
        query: withDullSchema.Infer.Query<TSchema>,
        select: SelectOf<TDatabase, TTable, T>
    ): SelectOf<TDatabase, TTable, T> {
        let $select = select;

        for (const [column, order] of Object.entries(query.orderBy || this.defaultOrderBy || {})) {
            $select = $select.orderBy(column as any, order as OrderSchema.Type);
        }

        return $select;
    }

    public applyTo<T>(
        query: withDullSchema.Infer.Query<TSchema>,
        select: SelectOf<TDatabase, TTable, T>
    ): SelectOf<TDatabase, TTable, T> {
        let $select = this.applyFilter(
            query,
            this.applyWhere(
                query,
                this.with(query, select),
            )
        );

        query.cursor && ($select = $select.limit(query.cursor.size).offset(query.cursor.page * query.cursor.size));

        return this.applyOrderBy(query, $select);
    }
}
