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

/**
 * Converts a GraphQL type to its corresponding Zod schema string
 */
function typeToZod(type: GraphQLType, config: withZodPlugin.Config): string {
	if (isNonNullType(type)) {
		return typeToZod(type.ofType, config);
	}

	if (isListType(type)) {
		return `z.array(${typeToZod(type.ofType, config)})`;
	}

	const { name } = getNamedType(type);

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

/**
 * Wraps a schema definition with exports and type definitions
 */
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

/**
 * Checks if a type reference is recursive (references a known schema)
 */
function isRecursiveReference(namedType: GraphQLType): boolean {
	const name = getNamedType(namedType).name;
	return (
		knownSchemaNames.has(name) || knownSchemaNames.has(`${name}Fragment`)
	);
}

/**
 * Creates a regular field definition for Zod schema
 */
function createFieldDefinition(
	fieldName: string,
	zodType: string,
	required: boolean,
): string {
	return required
		? `  ${fieldName}: ${zodType}`
		: `  ${fieldName}: ${zodType}.nullish()`;
}

/**
 * Creates a getter field definition for recursive references
 */
function createGetterDefinition(
	fieldName: string,
	zodType: string,
	required: boolean,
): string {
	const value = required ? zodType : `${zodType}.nullish()`;
	return `  get ${fieldName}() {\n    return ${value}\n  }`;
}

/**
 * Gets the correct schema name for a field, considering fragment spreads
 */
function getFieldSchemaName(
	field: any,
	selectionSet: any,
	config: withZodPlugin.Config,
): string {
	// If the field has a selection set with fragment spreads, use the fragment name
	if (selectionSet?.selections) {
		const fragmentSpread = selectionSet.selections.find(
			(s: any) => s.kind === Kind.FRAGMENT_SPREAD,
		);
		if (fragmentSpread) {
			const fragmentName = fragmentSpread.name.value;
			if (knownSchemaNames.has(`${fragmentName}Fragment`)) {
				return `${fragmentName}FragmentSchema`;
			}
		}
	}

	// Otherwise, use the field's type
	return typeToZod(field.type, config);
}

/**
 * Processes a GraphQL selection set into field definitions
 */
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

			if (!field) {
				fields.push(
					`  // Field ${fieldName} not found on type ${baseType.name}`,
				);
				continue;
			}

			const required = isNonNullType(field.type);
			const zodType = getFieldSchemaName(
				field,
				selection.selectionSet,
				config,
			);
			const isRecursive = isRecursiveReference(field.type);

			fields.push(
				isRecursive
					? createGetterDefinition(fieldName, zodType, required)
					: createFieldDefinition(fieldName, zodType, required),
			);
		} else if (selection.kind === Kind.FRAGMENT_SPREAD) {
			// Handle fragment spreads by referencing the fragment schema
			const fragmentName = selection.name.value;
			fields.push(createFragmentSpreadField(fragmentName));
		} else if (selection.kind === Kind.INLINE_FRAGMENT) {
			// Handle inline fragments
			const typeCondition = selection.typeCondition;
			if (!typeCondition) {
				continue;
			}

			const inlineTypeName = typeCondition.name.value;
			const inlineType = schema.getType(inlineTypeName);

			if (!inlineType) {
				fields.push(
					`  // Inline fragment: Type ${inlineTypeName} not found in schema`,
				);
				continue;
			}

			if (!isObjectType(inlineType)) {
				fields.push(
					`  // Inline fragment: Type ${inlineTypeName} is not an object type`,
				);
				continue;
			}

			const inlineFields = processSelectionSet(
				selection.selectionSet,
				inlineType,
				schema,
				config,
			);
			fields.push(...inlineFields);
		}
	}

	return fields;
}

/**
 * Converts a GraphQL input object type to Zod schema
 */
function inputToZod(
	type: GraphQLInputObjectType,
	config: withZodPlugin.Config,
): string {
	const fields = Object.entries(type.getFields()).map(([fieldName, field]) =>
		processField(fieldName, field, config),
	);
	return wrapSchema(type.name, fields);
}

/**
 * Converts a GraphQL object type to Zod schema
 */
function objectToZod(
	type: GraphQLObjectType,
	config: withZodPlugin.Config,
): string {
	const fields = Object.entries(type.getFields()).map(([fieldName, field]) =>
		processField(fieldName, field, config),
	);
	return wrapSchema(type.name, fields);
}

/**
 * Converts a GraphQL enum type to Zod schema
 */
function enumToZod(type: GraphQLEnumType): string {
	const values = type
		.getValues()
		.map((v) => `"${v.name}"`)
		.join(", ");
	return wrapSchema(type.name, [], `z.enum([${values}])`);
}

/**
 * Converts a GraphQL union type to Zod schema
 */
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

/**
 * Converts a GraphQL interface type to Zod schema
 */
function interfaceToZod(
	type: GraphQLInterfaceType,
	config: withZodPlugin.Config,
): string {
	const fields = Object.entries(type.getFields()).map(([fieldName, field]) =>
		processField(fieldName, field, config),
	);
	return wrapSchema(type.name, fields);
}

/**
 * Converts a GraphQL fragment to Zod schema
 */
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

/**
 * Creates a fragment spread field definition
 */
function createFragmentSpreadField(fragmentName: string): string {
	return knownSchemaNames.has(`${fragmentName}Fragment`)
		? `  get ${fragmentName}() {\n    return ${fragmentName}FragmentSchema\n  }`
		: `  ${fragmentName}: ${fragmentName}Schema`;
}

/**
 * Processes a GraphQL field into a Zod schema field
 */
function processField(
	fieldName: string,
	field: any,
	config: withZodPlugin.Config,
): string {
	const required = isNonNullType(field.type);
	const zodType = typeToZod(field.type, config);
	const isRecursive = isRecursiveReference(field.type);

	return isRecursive
		? createGetterDefinition(fieldName, zodType, required)
		: createFieldDefinition(fieldName, zodType, required);
}

/**
 * Routes a GraphQL type to the appropriate conversion function
 */
function processType(
	type: GraphQLType,
	config: withZodPlugin.Config,
): string | null {
	if (isEnumType(type)) {
		return enumToZod(type);
	}

	if (isInputObjectType(type)) {
		return inputToZod(type, config);
	}

	if (isObjectType(type)) {
		return objectToZod(type, config);
	}

	if (isUnionType(type)) {
		return unionToZod(type);
	}

	if (isInterfaceType(type)) {
		return interfaceToZod(type, config);
	}

	return null;
}

/**
 * Collects all known schema names from the GraphQL schema
 */
function collectKnownTypes(schema: GraphQLSchema): void {
	const typeMap = schema.getTypeMap();

	for (const typeName of Object.keys(typeMap)) {
		if (typeName.startsWith("__")) {
			continue;
		}

		const type = typeMap[typeName];
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
}

/**
 * Collects all fragment names from GraphQL documents
 */
function collectFragments(documents: Types.DocumentFile[]): void {
	for (const document of documents) {
		if (!document.document?.definitions) {
			continue;
		}

		for (const definition of document.document.definitions) {
			if (definition.kind === Kind.FRAGMENT_DEFINITION) {
				knownSchemaNames.add(`${definition.name.value}Fragment`);
			}
		}
	}
}

/**
 * Processes all fragments in documents to generate Zod schemas
 */
function processFragments(
	documents: Types.DocumentFile[],
	schema: GraphQLSchema,
	config: withZodPlugin.Config,
): string[] {
	const results: string[] = [];

	for (const document of documents) {
		if (!document.document?.definitions) {
			continue;
		}

		for (const definition of document.document.definitions) {
			if (definition.kind === Kind.FRAGMENT_DEFINITION) {
				results.push(fragmentToZod(definition, schema, config));
			}
		}
	}

	return results;
}

/**
 * Processes all types in the schema to generate Zod schemas
 */
function processTypes(
	schema: GraphQLSchema,
	config: withZodPlugin.Config,
): string[] {
	const results: string[] = [];
	const typeMap = schema.getTypeMap();

	for (const typeName of Object.keys(typeMap)) {
		if (typeName.startsWith("__")) {
			continue;
		}

		const type = typeMap[typeName];
		if (!type) {
			continue;
		}

		const result = processType(type, config);
		if (result) {
			results.push(result);
		}
	}

	return results;
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
	collectKnownTypes(schema);
	collectFragments(documents);

	// Second pass: generate schemas for types
	output.push(...processTypes(schema, config));

	// Third pass: generate schemas for fragments
	output.push(...processFragments(documents, schema, config));

	return output.join("\n\n");
};

export const plugin = withZodPlugin;
export default {
	plugin: withZodPlugin,
};
