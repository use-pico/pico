import {
    Kysely,
    PostgresDialect
}                 from "kysely";
import {DateTime} from "luxon";
import {
    Pool,
    types
}                 from "pg";

export namespace withKysely {
    export interface Props {
        dsn?: string;
    }
}

export const withKysely = <TDatabase>(
    {
        dsn = process.env.DATABASE_URL,
    }: withKysely.Props
) => {
    return new Kysely<TDatabase>({
        dialect: new PostgresDialect({
            pool: new Pool({
                connectionString: dsn,
                types:            {
                    getTypeParser: oid => {
                        switch (oid) {
                            case types.builtins.BOOL:
                                return value => value === "f" ? false : value === "t" ? true : null;
                            case types.builtins.FLOAT4:
                            case types.builtins.FLOAT8:
                                return value => value !== null ? parseFloat(value as string) : null;
                            case types.builtins.INT2:
                            case types.builtins.INT4:
                            case types.builtins.INT8:
                                return value => value !== null ? parseInt(value as string) : null;
                            case types.builtins.TIMESTAMP:
                                return value => value !== null ? DateTime.fromSQL(value as string, {
                                    zone: "UTC",
                                }).toISO() : null;
                        }
                        return value => value;
                    },
                },
            }),
        }),
    });
};
