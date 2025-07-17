import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import {
	type GraphQLEnumType,
	type GraphQLInputObjectType,
	type GraphQLObjectType,
	type GraphQLSchema,
	type GraphQLType,
	getNamedType,
	isEnumType,
	isInputObjectType,
	isListType,
	isNonNullType,
	isObjectType,
} from "graphql";

export namespace withZodPlugin {
	export interface Config {
		scalars?: Record<string, string>;
	}
}

const knownSchemaNames = new Set<string>();

function typeToZod(type: GraphQLType, config: withZodPlugin.Config): string {
	if (isNonNullType(type)) {
		return typeToZod(type.ofType, config);
	}

	if (isListType(type)) {
		return `z.array(${typeToZod(type.ofType, config)})`;
	}

	const named = getNamedType(type);
	const { name } = named;

	switch (name) {
		case "String":
			return "z.string()";
		case "Int":
			return "z.number().int()";
		case "Float":
			return "z.number()";
		case "Boolean":
			return "z.boolean()";
	}

	if (config.scalars?.[name]) {
		return config.scalars[name];
	}

	if (knownSchemaNames.has(name)) {
		return `z.lazy(() => ${name}Schema)`;
	}

	return `z.any() // unknown: ${name}`;
}

function wrapSchema(name: string, fields: string[], override?: string): string {
	const schema = override ?? `z.object({\n${fields.join(",\n")}\n})`;
	return [
		`export const ${name}Schema = ${schema};`,
		`export type ${name}Schema = typeof ${name}Schema;`,
		`export namespace ${name}Schema {`,
		`	export type Type = z.infer<${name}Schema>;`,
		`}`,
	].join("\n");
}

function inputToZod(
	type: GraphQLInputObjectType,
	config: withZodPlugin.Config,
): string {
	const fields = Object.entries(type.getFields()).map(
		([fieldName, field]) => {
			const required = isNonNullType(field.type);
			const zodType = typeToZod(field.type, config);
			return `  ${fieldName}: ${required ? zodType : `${zodType}.nullish()`}`;
		},
	);
	return wrapSchema(type.name, fields);
}

function objectToZod(
	type: GraphQLObjectType,
	config: withZodPlugin.Config,
): string {
	const fields = Object.entries(type.getFields()).map(
		([fieldName, field]) => {
			const required = isNonNullType(field.type);
			const zodType = typeToZod(field.type, config);
			return `  ${fieldName}: ${required ? zodType : `${zodType}.nullish()`}`;
		},
	);
	return wrapSchema(type.name, fields);
}

function enumToZod(type: GraphQLEnumType): string {
	const values = type
		.getValues()
		.map((v) => `"${v.name}"`)
		.join(", ");
	return wrapSchema(type.name, [], `z.enum([${values}])`);
}

export const withZodPlugin: PluginFunction<withZodPlugin.Config> = (
	schema: GraphQLSchema,
	_: Types.DocumentFile[],
	config: withZodPlugin.Config,
) => {
	const output: string[] = [
		`/* eslint-disable no-use-before-define */`,
		`import { z } from "zod";`,
	];

	for (const typeName of Object.keys(schema.getTypeMap())) {
		if (typeName.startsWith("__")) {
			continue;
		}

		const type = schema.getType(typeName);
		if (isEnumType(type) || isInputObjectType(type) || isObjectType(type)) {
			knownSchemaNames.add(typeName);
		}
	}

	for (const typeName of Object.keys(schema.getTypeMap())) {
		if (typeName.startsWith("__")) {
			continue;
		}

		const type = schema.getType(typeName);

		if (isEnumType(type)) {
			output.push(enumToZod(type));
		} else if (isInputObjectType(type)) {
			output.push(inputToZod(type, config));
		} else if (isObjectType(type)) {
			output.push(objectToZod(type, config));
		}
	}

	return output.join("\n\n");
};

export const plugin = withZodPlugin;
export default {
	plugin: withZodPlugin,
};
