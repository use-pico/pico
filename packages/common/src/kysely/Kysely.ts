import { sql, type Expression, type RawBuilder } from "kysely";

export const Kysely = {
	jsonObject(fields: Record<string, Expression<any>>): RawBuilder<string> {
		const jsonParts = sql.join(
			Object.entries(fields).map(([key, value]) => sql`${key}, ${value}`),
		);

		return sql<string>`json_object(${jsonParts})`;
	},
	jsonGroupArray(fields: Record<string, Expression<any>>): RawBuilder<string> {
		return sql<string>`json_group_array(${Kysely.jsonObject(fields)})`;
	},
} as const;
