import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import {
	type GraphQLEnumType,
	type GraphQLInputObjectType,
	type GraphQLInterfaceType,
	type GraphQLObjectType,
	type GraphQLSchema,
	type GraphQLType,
	type GraphQLUnionType,
	getNamedType,
	isEnumType,
	isInputObjectType,
	isInterfaceType,
	isListType,
	isNonNullType,
	isObjectType,
	isUnionType,
	Kind,
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
		case "ID":
			return "z.string()";
		case "Date":
		case "DateTime":
			return "z.date()";
		case "JSON":
			return "z.any()";
	}

	if (config.scalars?.[name]) {
		return config.scalars[name];
	}

	// Check if there's a fragment with this name first
	if (knownSchemaNames.has(`${name}Fragment`)) {
		return `${name}FragmentSchema`;
	}

	// Then check for regular types
	if (knownSchemaNames.has(name)) {
		return `${name}Schema`;
	}

	return `z.any() // unknown: ${name}`;
}

function wrapSchema(name: string, fields: string[], override?: string): string {
	const schema = override ?? `z.strictObject({\n${fields.join(",\n")}\n})`;
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

			// Check if this field references a known schema (potential recursive reference)
			const namedType = getNamedType(field.type);
			const isRecursiveReference =
				knownSchemaNames.has(namedType.name) ||
				knownSchemaNames.has(`${namedType.name}Fragment`);

			if (isRecursiveReference) {
				// Use getter pattern for recursive references
				return `  get ${fieldName}() {\n    return ${required ? zodType : `${zodType}.nullish()`}\n  }`;
			}

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

			// Check if this field references a known schema (potential recursive reference)
			const namedType = getNamedType(field.type);
			const isRecursiveReference =
				knownSchemaNames.has(namedType.name) ||
				knownSchemaNames.has(`${namedType.name}Fragment`);

			if (isRecursiveReference) {
				// Use getter pattern for recursive references
				return `  get ${fieldName}() {\n    return ${required ? zodType : `${zodType}.nullish()`}\n  }`;
			}

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

function unionToZod(type: GraphQLUnionType): string {
	const types = type
		.getTypes()
		.map((t) => `${t.name}Schema`)
		.join(", ");

	if (types.length === 0) {
		return `// Union ${type.name}: No types found`;
	}

	return wrapSchema(type.name, [], `z.union([${types}])`);
}

function interfaceToZod(
	type: GraphQLInterfaceType,
	config: withZodPlugin.Config,
): string {
	const fields = Object.entries(type.getFields()).map(
		([fieldName, field]) => {
			const required = isNonNullType(field.type);
			const zodType = typeToZod(field.type, config);

			// Check if this field references a known schema (potential recursive reference)
			const namedType = getNamedType(field.type);
			const isRecursiveReference =
				knownSchemaNames.has(namedType.name) ||
				knownSchemaNames.has(`${namedType.name}Fragment`);

			if (isRecursiveReference) {
				// Use getter pattern for recursive references
				return `  get ${fieldName}() {\n    return ${required ? zodType : `${zodType}.nullish()`}\n  }`;
			}

			return `  ${fieldName}: ${required ? zodType : `${zodType}.nullish()`}`;
		},
	);
	return wrapSchema(type.name, fields);
}

function fragmentToZod(
	fragment: any,
	schema: GraphQLSchema,
	config: withZodPlugin.Config,
): string {
	const fragmentName = `${fragment.name.value}Fragment`;
	const typeCondition = fragment.typeCondition;
	const typeName = typeCondition.name.value;

	// Get the base type from the schema
	const baseType = schema.getType(typeName);
	if (!baseType) {
		return `// Fragment ${fragmentName}: Base type ${typeName} not found in schema`;
	}
	if (!isObjectType(baseType)) {
		return `// Fragment ${fragmentName}: Base type ${typeName} is not an object type`;
	}

	// Process the fragment's selection set
	const fields = processSelectionSet(
		fragment.selectionSet,
		baseType,
		schema,
		config,
	);

	return wrapSchema(fragmentName, fields);
}

function processSelectionSet(
	selectionSet: any,
	baseType: GraphQLObjectType,
	schema: GraphQLSchema,
	config: withZodPlugin.Config,
): string[] {
	const fields: string[] = [];

	for (const selection of selectionSet.selections) {
		if (selection.kind === Kind.FIELD) {
			const fieldName = selection.name.value;
			const field = baseType.getFields()[fieldName];

			if (field) {
				const required = isNonNullType(field.type);
				const zodType = typeToZod(field.type, config);

				// Check if this field references a known schema (potential recursive reference)
				const namedType = getNamedType(field.type);
				const isRecursiveReference =
					knownSchemaNames.has(namedType.name) ||
					knownSchemaNames.has(`${namedType.name}Fragment`);

				if (isRecursiveReference) {
					// Use getter pattern for recursive references
					fields.push(
						`  get ${fieldName}() {\n    return ${required ? zodType : `${zodType}.nullish()`}\n  }`,
					);
				} else {
					fields.push(
						`  ${fieldName}: ${required ? zodType : `${zodType}.nullish()`}`,
					);
				}
			} else {
				fields.push(
					`  // Field ${fieldName} not found on type ${baseType.name}`,
				);
			}
		} else if (selection.kind === Kind.FRAGMENT_SPREAD) {
			// Handle fragment spreads by referencing the fragment schema
			const fragmentName = selection.name.value;
			// For fragment spreads, we need to check if the fragment exists
			if (knownSchemaNames.has(`${fragmentName}Fragment`)) {
				fields.push(
					`  get ${fragmentName}() {\n    return ${fragmentName}FragmentSchema\n  }`,
				);
			} else {
				// Fallback to the base type if fragment doesn't exist
				fields.push(`  ${fragmentName}: ${fragmentName}Schema`);
			}
		} else if (selection.kind === Kind.INLINE_FRAGMENT) {
			// Handle inline fragments
			const typeCondition = selection.typeCondition;
			if (typeCondition) {
				const inlineTypeName = typeCondition.name.value;
				const inlineType = schema.getType(inlineTypeName);
				if (!inlineType) {
					fields.push(
						`  // Inline fragment: Type ${inlineTypeName} not found in schema`,
					);
				} else if (isObjectType(inlineType)) {
					const inlineFields = processSelectionSet(
						selection.selectionSet,
						inlineType,
						schema,
						config,
					);
					fields.push(...inlineFields);
				} else {
					fields.push(
						`  // Inline fragment: Type ${inlineTypeName} is not an object type`,
					);
				}
			}
		}
	}

	return fields;
}

export const withZodPlugin: PluginFunction<withZodPlugin.Config> = (
	schema: GraphQLSchema,
	documents: Types.DocumentFile[],
	config: withZodPlugin.Config = {},
) => {
	const output: string[] = [
		`/* eslint-disable no-use-before-define */`,
		`import { z } from "zod";`,
	];

	// First pass: collect all known schema names
	for (const typeName of Object.keys(schema.getTypeMap())) {
		if (typeName.startsWith("__")) {
			continue;
		}

		const type = schema.getType(typeName);
		if (
			isEnumType(type) ||
			isInputObjectType(type) ||
			isObjectType(type) ||
			isUnionType(type) ||
			isInterfaceType(type)
		) {
			knownSchemaNames.add(typeName);
		}
	}

	// Second pass: generate schemas for types
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
		} else if (isUnionType(type)) {
			output.push(unionToZod(type));
		} else if (isInterfaceType(type)) {
			output.push(interfaceToZod(type, config));
		}
	}

	// Third pass: generate schemas for fragments
	for (const document of documents) {
		if (document.document?.definitions) {
			for (const definition of document.document.definitions) {
				if (definition.kind === Kind.FRAGMENT_DEFINITION) {
					knownSchemaNames.add(`${definition.name.value}Fragment`);
				}
			}
		}
	}

	for (const document of documents) {
		if (document.document?.definitions) {
			for (const definition of document.document.definitions) {
				if (definition.kind === Kind.FRAGMENT_DEFINITION) {
					output.push(fragmentToZod(definition, schema, config));
				}
			}
		}
	}

	return output.join("\n\n");
};

export const plugin = withZodPlugin;
export default {
	plugin: withZodPlugin,
};
