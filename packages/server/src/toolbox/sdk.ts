import axios from "axios";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";

namespace sdk {
	export interface Props {
		source: string;
		target: string;
		replace?: string[];
	}

	export interface Meta {
		request?: string | null;
		response?: string | null;
	}

	export interface QueryMeta extends Meta {}
	export interface MutationMeta extends Meta {
		invalidators?: string[] | null;
	}

	export interface Endpoint {
		ref: string;
		name: string;
		mutation: MutationMeta | null;
		query: QueryMeta | null;
	}

	export interface ObjectSchema {
		name: string;
		type: "object";
		nullable?: boolean | null;
		object: Record<
			string,
			{
				type: "string" | "number" | "boolean" | "array" | "object";
				ref?: string | null;
				nullable?: boolean | null;
				zod?: string | null;
			}
		>;
	}

	export interface ArraySchema {
		name: string;
		type: "array";
		array: string;
	}

	export type Schema = ObjectSchema | ArraySchema;

	export interface Reflection {
		api: Record<string, Endpoint>;
		schema: Record<string, Schema>;
	}
}

const exportObjectSchema = (schema: sdk.ObjectSchema, tabs: number) => {
	const props: string[] = Object.entries(schema.object)
		.filter(([, value]) => Boolean(value.zod))
		.map(([key, value]) => {
			return `${key}: ${value.zod},`;
		});

	return `z.object({
${"\t".repeat(tabs)}${props.join(`\n${"\t".repeat(tabs)}`)}
})`;
};

export async function sdk({ source, target, replace }: sdk.Props) {
	const { data: reflection } = await axios.get<sdk.Reflection>(source);

	rmSync(target, { recursive: true, force: true });

	const schemaDir = `${target}/schema`;
	const mutationDir = `${target}/mutation`;
	const queryDir = `${target}/query`;
	const apiDir = `${target}/api`;

	mkdirSync(queryDir, { recursive: true });
	mkdirSync(mutationDir, { recursive: true });
	mkdirSync(schemaDir, { recursive: true });
	mkdirSync(apiDir, { recursive: true });

	const apiIndex = Object.values(reflection.api).map((def) => ({
		...def,
		id: def.ref
			.split("/")
			.filter(Boolean)
			.map((part: string) =>
				(part[0]?.toUpperCase() + part.slice(1))
					.split("-")
					.map((part) => part[0]?.toUpperCase() + part.slice(1))
					.join(""),
			)
			.join(""),
	}));

	const exports = new Set<string>();

	for (const schema of Object.values(reflection.schema)) {
		switch (schema.type) {
			case "object":
				exports.add(`schema/${schema.name}`);

				writeFileSync(
					`${schemaDir}/${schema.name}.ts`,
					`import { z } from "zod";
${Array.from(
	new Set(
		Object.values(schema.object)
			.map((def) => {
				return def.ref ?
						`import { ${def.ref} } from "./${def.ref}";`
					:	undefined;
			})
			.filter(Boolean),
	),
).join("\n")}

export const ${schema.name} = ${exportObjectSchema(schema, 1)}${schema.nullable ? ".nullish()" : ""};

export type ${schema.name} = typeof ${schema.name};

export namespace ${schema.name} {
	export type Type = z.infer<typeof ${schema.name}>;
}
`,
				);
				break;
			case "array":
				exports.add(`schema/${schema.name}`);

				writeFileSync(
					`${schemaDir}/${schema.name}.ts`,
					`import { z } from "zod";
import { ${schema.array} } from "./${schema.array}";

export const ${schema.name} = z.array(${schema.array});					

export type ${schema.name} = typeof ${schema.name};

export namespace ${schema.name} {
	export type Type = z.infer<typeof ${schema.name}>;
}
`,
				);

				break;
		}
	}

	for (const { id, name, ref, mutation, query } of apiIndex) {
		if (!query && !mutation) {
			continue;
		}

		const $name = replace?.reduce((acc, replace) => {
			return acc.replaceAll(replace, "");
		}, id);

		if (query) {
			const requestSchema =
				query.request ? reflection.schema[query.request] : null;
			const responseSchema =
				query.response ? reflection.schema[query.response] : null;

			const imports: (string | undefined)[] = [
				requestSchema ?
					`import { ${requestSchema.name} } from "../schema/${requestSchema.name}";`
				:	undefined,
				responseSchema ?
					`import { ${responseSchema.name} } from "../schema/${responseSchema.name}";`
				:	undefined,
			];

			exports.add(`api/with${$name}Api`);
			exports.add(`query/with${$name}Query`);
			exports.add(`query/with${$name}Query$`);

			writeFileSync(
				`${apiDir}/with${$name}Api.ts`,
				`
import axios from "axios";
${imports.filter(Boolean).join("\n")}

export namespace with${$name}Api {
	export interface Props {
		${requestSchema ? `request: ${requestSchema.name}.Type` : "request?: any"};
	}
}

export const with${$name}Api = async ({ request }: with${$name}Api.Props): Promise<${responseSchema ? `${responseSchema.name}.Type` : "any"}> => {
	const { data } = await axios.get("${ref}", {
		params: ${requestSchema ? `${requestSchema.name}.parse(request)` : "request"},
	});
	const result = ${responseSchema ? `${responseSchema.name}.parse(data);` : "data"};

	return result;
}
				`.trim(),
			);

			writeFileSync(
				`${queryDir}/with${$name}Query.ts`,
				`
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import { with${$name}Api } from "../api/with${$name}Api";
${imports.filter(Boolean).join("\n")}

export namespace with${$name}Query {
	export interface Props extends with${$name}Api.Props {
        options?: Omit<
            UseQueryOptions<${responseSchema ? `${responseSchema.name}.Type` : "any"}>,
			"queryKey" | "queryFn"
		>;
    }
}

export const with${$name}Query = ({request, options}: with${$name}Query.Props) => {
	return queryOptions({
		queryKey: ["${name.replaceAll("\\", "\\\\")}", request],
		queryFn: async (): Promise<${responseSchema ? `${responseSchema.name}.Type` : "any"}> => {
			return with${$name}Api({ request });
		},
        ...options,
	});
}
`.trim(),
			);

			writeFileSync(
				`${queryDir}/with${$name}Query$.ts`,
				`
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import { with${$name}Api } from "../api/with${$name}Api";
${imports.filter(Boolean).join("\n")}

export namespace with${$name}Query$ {
	export interface Props extends with${$name}Api.Props {
        options?: Omit<
            UseQueryOptions<${responseSchema ? `${responseSchema.name}.Type | null` : "any"}>,
			"queryKey" | "queryFn"
		>;
    }
}

export const with${$name}Query$ = ({request, options}: with${$name}Query$.Props) => {
	return queryOptions({
		queryKey: ["${name.replaceAll("\\", "\\\\")}", request],
		queryFn: async (): Promise<${responseSchema ? `${responseSchema.name}.Type | null` : "any"}> => {
			try {
				return await with${$name}Api({ request });
			} catch(e) {
				return null;
			}
		},
        ...options,
	});
}
`.trim(),
			);
		}

		if (mutation) {
			const requestSchema =
				mutation.request ? reflection.schema[mutation.request] : null;
			const responseSchema =
				mutation.response ? reflection.schema[mutation.response] : null;

			const imports: (string | undefined)[] = [
				requestSchema ?
					`import { ${requestSchema.name} } from "../schema/${requestSchema.name}";`
				:	undefined,
				responseSchema ?
					`import { ${responseSchema.name} } from "../schema/${responseSchema.name}";`
				:	undefined,
			];

			exports.add(`mutation/use${$name}Mutation`);

			writeFileSync(
				`${mutationDir}/use${$name}Mutation.ts`,
				`
import { useMutation, useQueryClient, type UseMutationOptions, type QueryKey } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { invalidator } from "@use-pico/client";
import axios from "axios";
${imports.filter(Boolean).join("\n")}

export namespace use${$name}Mutation {
	export interface Props {
		invalidate?: QueryKey[];
		options?: UseMutationOptions<${responseSchema ? `${responseSchema.name}.Type` : "any"}, Error, ${requestSchema ? `${requestSchema.name}.Type` : "any"}>;
	}
}

export const use${$name}Mutation = (
	{ invalidate, options }: use${$name}Mutation.Props = { invalidate: [] }
) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationKey: ["${name.replaceAll("\\", "\\\\")}"],
		mutationFn: async (${requestSchema ? `request: ${requestSchema.name}.Type` : "request?: any"}): Promise<${responseSchema ? `${responseSchema.name}.Type` : "any"}> => {
			const { data } = await axios.post("${ref}", ${requestSchema ? `${requestSchema.name}.parse(request)` : "request"});
			await invalidator({
				queryClient,
				keys: ${mutation.invalidators ? JSON.stringify(mutation.invalidators.map((i) => [i])) : "[]"},
			});
			invalidate && await invalidator({
				queryClient,
				keys: invalidate,
			});
			await router.invalidate();
			return ${responseSchema ? `${responseSchema.name}.parse(data);` : "data"};
		},
		...options,
	});
}
`.trim(),
			);
		}
	}

	for (const file of exports) {
		writeFileSync(`${target}/index.ts`, `export * from "./${file}";\n`, {
			flag: "a",
		});
	}
}
