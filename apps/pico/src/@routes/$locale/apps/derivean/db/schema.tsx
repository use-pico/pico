import { createFileRoute } from "@tanstack/react-router";
import type { ColumnMetadata } from "kysely";

export const Route = createFileRoute("/$locale/apps/derivean/db/schema")({
	async loader({ context: { kysely } }) {
		return {
			tables: await kysely.introspection.getTables(),
		};
	},
	component() {
		const { tables } = Route.useLoaderData();

		const toZodType = ({ dataType, isNullable }: ColumnMetadata) => {
			const type = dataType.toLowerCase();

			let zod = `z.never({message: '${dataType}'})`;

			switch (type) {
				case "integer": {
					zod = "z.number().int()";
					break;
				}
				case "float4": {
					zod = "z.number()";
					break;
				}
				case "datetime": {
					zod = "z.string()";
					break;
				}
				case "boolean": {
					zod = "withBoolSchema()";
					break;
				}
			}
			if (type.startsWith("varchar")) {
				zod = `z.string()${isNullable ? "" : ".min(1)"}`;
			}

			return `
// ${dataType} / ${isNullable ? "nullable" : "not nullable"}
${zod}${isNullable ? ".nullish()" : ""}
`;
		};

		const sources = tables.map((table) => {
			const name = table.name.replaceAll("_", "");

			return `
export const with${name}Schema = <
    TShapeSchema extends ShapeSchema,
    TFilterSchema extends FilterSchema,
>({
    shape,
    filter,
}: {
    shape: TShapeSchema;
    filter: TFilterSchema;
}) => {
    return withSourceSchema({
        entity: IdentitySchema.merge(z.object({
                ${table.columns
									.filter(({ name }) => name !== "id")
									.map((column) =>
										`
    "${column.name}": ${toZodType(column)}
        `.trim(),
									)
									.join(",\n\t\t\t")},
        })),
        shape,
        filter,
        sort: [${table.columns.map((column) => `"${column.name}"`).join(", ")}],
    });
}

export type ${name}Entity = ReturnType<typeof with${name}Schema>['~entity'];
            `.trim();
		});

		const database = tables.map((table) => {
			const name = table.name.replaceAll("_", "");

			return `${table.name}: ${name}Entity;`;
		});

		return (
			<pre>
				{`
import {
    IdentitySchema,
    withSourceSchema,
    type FilterSchema,
    type ShapeSchema,
    withBoolSchema,
} from "@use-pico/common";
import { z } from "zod";
            `.trim()}

				{`\n\n${sources.join("\n\n")}`}
				{`\n
export interface Database {
    ${database.join("\n\t")}
}
                `}
			</pre>
		);
	},
});
