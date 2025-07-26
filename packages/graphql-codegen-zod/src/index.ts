import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import type {
	FragmentDefinitionNode,
	FragmentSpreadNode,
	OperationDefinitionNode,
	SelectionNode,
	SelectionSetNode,
	VariableDefinitionNode,
} from "graphql";
import {
	type GraphQLField,
	type GraphQLInputObjectType,
	type GraphQLInterfaceType,
	type GraphQLObjectType,
	type GraphQLSchema,
	type GraphQLType,
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

/**
 * Configuration options for the GraphQL Codegen Zod plugin
 */
export namespace withZodPlugin {
	export interface Config {
		/** Custom scalar type mappings for GraphQL to Zod conversion */
		scalars?: Record<string, string>;
	}
}

/**
 * Utility class for managing fragment definitions
 */
class FragmentRegistry {
	private fragmentCache = new Map<string, FragmentDefinitionNode>();
	private fragmentDependencies = new Map<string, Set<string>>();

	/**
	 * Registers fragment definitions from documents
	 */
	registerFragments(documents: Types.DocumentFile[]): void {
		for (const document of documents) {
			if (!document.document?.definitions) {
				continue;
			}

			for (const definition of document.document.definitions) {
				if (definition.kind === Kind.FRAGMENT_DEFINITION) {
					this.fragmentCache.set(definition.name.value, definition);
					this.analyzeFragmentDependencies(definition);
				}
			}
		}
	}

	/**
	 * Analyzes fragment dependencies for better error detection
	 */
	private analyzeFragmentDependencies(
		fragment: FragmentDefinitionNode,
	): void {
		const dependencies = new Set<string>();

		// Extract fragment spreads from the selection set
		const extractSpreads = (selections: readonly SelectionNode[]): void => {
			for (const selection of selections) {
				if (selection.kind === Kind.FRAGMENT_SPREAD) {
					dependencies.add(selection.name.value);
				} else if (selection.selectionSet?.selections) {
					extractSpreads(selection.selectionSet.selections);
				}
			}
		};

		extractSpreads(fragment.selectionSet.selections);
		this.fragmentDependencies.set(fragment.name.value, dependencies);
	}

	/**
	 * Finds a fragment definition by name
	 */
	findFragment(fragmentName: string): FragmentDefinitionNode | null {
		return this.fragmentCache.get(fragmentName) || null;
	}

	/**
	 * Checks if a fragment exists
	 */
	hasFragment(fragmentName: string): boolean {
		return this.fragmentCache.has(fragmentName);
	}

	/**
	 * Validates fragment dependencies
	 */
	validateDependencies(): string[] {
		const errors: string[] = [];

		for (const [fragmentName, dependencies] of Array.from(
			this.fragmentDependencies.entries(),
		)) {
			for (const dependency of Array.from(dependencies)) {
				if (!this.hasFragment(dependency)) {
					errors.push(
						`Fragment '${fragmentName}' depends on undefined fragment '${dependency}'`,
					);
				}
			}
		}

		return errors;
	}
}

/**
 * Creates a field definition with proper indentation
 */
function createFieldDefinition(
	fieldName: string,
	zodType: string,
	description?: string,
): string {
	const comment = description ? `  /** ${description} */\n` : "";
	const meta = description
		? `.meta({description: "${description.replace(/"/g, '\\"')}"})`
		: "";
	return `${comment}  ${fieldName}: ${zodType}${meta}`;
}

/**
 * Creates a getter field definition with proper indentation
 */
function createGetterDefinition(
	fieldName: string,
	zodType: string,
	description?: string,
): string {
	const comment = description ? `  /** ${description} */\n` : "";
	const meta = description
		? `.meta({description: "${description.replace(/"/g, '\\"')}"})`
		: "";
	return `${comment}  get ${fieldName}() {\n    return ${zodType}${meta}\n  }`;
}

/**
 * Checks for circular references in type definitions
 */
function detectCircularReference(
	typeName: string,
	visitedTypes: Set<string>,
): boolean {
	if (visitedTypes.has(typeName)) {
		return true;
	}
	visitedTypes.add(typeName);
	return false;
}

/**
 * Processes a GraphQL type with error handling
 */
function processTypeWithErrorHandling(
	type: GraphQLType,
	config: withZodPlugin.Config,
	knownSchemaNames: Set<string>,
	visitedTypes: Set<string>,
): string | null {
	try {
		const typeName = getNamedType(type).name;

		// Check for circular references
		if (detectCircularReference(typeName, visitedTypes)) {
			return `/** Circular reference detected for type: ${typeName} */`;
		}

		const result = processType(type, config, knownSchemaNames);

		// Remove from visited types after processing
		visitedTypes.delete(typeName);

		return result;
	} catch (error) {
		const typeName = getNamedType(type).name;
		return `/** Error processing type ${typeName}: ${error instanceof Error ? error.message : "Unknown error"} */`;
	}
}

/**
 * Converts a GraphQL type to its corresponding Zod schema string representation.
 */
function typeToZod(
	type: GraphQLType,
	config: withZodPlugin.Config,
	knownSchemaNames: Set<string>,
): string {
	if (isNonNullType(type)) {
		return typeToZod(type.ofType, config, knownSchemaNames);
	}

	if (isListType(type)) {
		return `z.array(${typeToZod(type.ofType, config, knownSchemaNames)})`;
	}

	const { name } = getNamedType(type);

	switch (name) {
		case "String":
			return "z.string()";
		case "Int":
			return "z.int()";
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
		default:
			if (config.scalars?.[name]) {
				return config.scalars[name];
			} else if (knownSchemaNames.has(`${name}Fragment`)) {
				return `${name}FragmentSchema`;
			} else if (knownSchemaNames.has(name)) {
				return `${name}Schema`;
			} else {
				return `z.any() /* Unknown type: ${name} */`;
			}
	}
}

/**
 * Wraps a schema definition with exports and type definitions for TypeScript integration.
 */
function wrapSchema(
	name: string,
	fields: string[],
	override?: string,
	description?: string,
): string {
	const comment = description ? `/** ${description} */\n` : "";
	const typeComment = description ? `\t/** ${description} */\n` : "";
	const schema = override ?? `z.object({\n${fields.join(",\n")}\n})`;
	return [
		`${comment}export const ${name}Schema = ${schema};`,
		`export type ${name}Schema = typeof ${name}Schema;`,
		`export namespace ${name}Schema {`,
		`${typeComment}\texport type Type = z.infer<${name}Schema>;`,
		`}`,
	].join("\n");
}

/**
 * Checks if a type reference is recursive (references a known schema).
 * Recursive references are converted to getter functions to avoid circular dependencies.
 */
function isRecursiveReference(
	namedType: GraphQLType,
	knownSchemaNames: Set<string>,
): boolean {
	const name = getNamedType(namedType).name;
	return (
		knownSchemaNames.has(name) || knownSchemaNames.has(`${name}Fragment`)
	);
}

/**
 * Gets the correct schema name for a field, considering fragment spreads and array types.
 * Handles the logic of determining whether to use a fragment schema, regular schema, or array schema.
 */
function getFieldSchemaName(
	field: GraphQLField<any, any>,
	selectionSet: SelectionSetNode | undefined,
	config: withZodPlugin.Config,
	knownSchemaNames: Set<string>,
): string {
	// Early return if no selection set
	if (!selectionSet?.selections) {
		return typeToZod(field.type, config, knownSchemaNames);
	}

	// Extract fragment spreads from selection set
	const fragmentSpreads = selectionSet.selections.filter(
		(s): s is FragmentSpreadNode => s.kind === Kind.FRAGMENT_SPREAD,
	);

	// Early return if no fragment spreads
	if (fragmentSpreads.length === 0) {
		return typeToZod(field.type, config, knownSchemaNames);
	}

	// Get valid fragment names that exist in known schemas
	const validFragmentNames = fragmentSpreads
		.map((spread) => spread.name.value)
		.filter((fragmentName) =>
			knownSchemaNames.has(`${fragmentName}Fragment`),
		);

	// Early return if no valid fragments found
	if (validFragmentNames.length === 0) {
		return typeToZod(field.type, config, knownSchemaNames);
	}

	// Use the first fragment as the base (fragments are merged in GraphQL)
	const primaryFragmentName = validFragmentNames[0];
	const fragmentSchemaName = `${primaryFragmentName}FragmentSchema`;

	// Handle array types - properly unwrap non-null wrappers first
	let currentType = field.type;
	while (isNonNullType(currentType)) {
		currentType = currentType.ofType;
	}

	if (isListType(currentType)) {
		return `z.array(${fragmentSchemaName})`;
	}

	return fragmentSchemaName;
}

/**
 * Processes a GraphQL selection set into field definitions for Zod schema generation.
 * Handles fields, fragment spreads, and inline fragments. Determines whether fields should be
 * regular properties or getter functions based on recursive reference detection.
 */
function processSelectionSet(
	selectionSet: SelectionSetNode,
	baseType: GraphQLObjectType,
	schema: GraphQLSchema,
	config: withZodPlugin.Config,
	knownSchemaNames: Set<string>,
	fragmentRegistry: FragmentRegistry,
): {
	fields: string[];
	fieldNames: Set<string>;
} {
	const fields: string[] = [];
	const fieldNames = new Set<string>(); // Track field names to prevent duplicates

	for (const selection of selectionSet.selections) {
		if (selection.kind === Kind.FIELD) {
			const fieldName = selection.name.value;

			// Skip if we already have this field (deduplication)
			if (fieldNames.has(fieldName)) {
				continue;
			}
			fieldNames.add(fieldName);

			const field = baseType.getFields()[fieldName];

			if (!field) {
				fields.push(
					`/** Field ${fieldName} not found on type ${baseType.name} */`,
				);
				continue;
			}

			const required = isNonNullType(field.type);
			const zodType = getFieldSchemaName(
				field,
				selection.selectionSet,
				config,
				knownSchemaNames,
			);

			// Check if this is an array field with fragment reference
			const fragmentSpreads =
				selection.selectionSet?.selections?.filter(
					(s): s is FragmentSpreadNode =>
						s.kind === Kind.FRAGMENT_SPREAD,
				) || [];
			const isArrayWithFragment =
				fragmentSpreads.length > 0 && isListType(field.type);

			// For array fields with fragments, we don't treat them as recursive
			// because they should be regular fields, not getters
			const isRecursive = isArrayWithFragment
				? false
				: isRecursiveReference(field.type, knownSchemaNames);

			// Handle nullish logic consistently for all field types
			const finalZodType = required ? zodType : `${zodType}.nullish()`;
			const description = field.description || undefined;

			fields.push(
				isRecursive
					? createGetterDefinition(
							fieldName,
							finalZodType,
							description,
						)
					: createFieldDefinition(
							fieldName,
							finalZodType,
							description,
						),
			);
		} else if (selection.kind === Kind.FRAGMENT_SPREAD) {
			// Handle fragment spreads by merging their fields into the current selection set
			const fragmentName = selection.name.value;

			// Find the fragment definition using the registry
			const fragmentDefinition =
				fragmentRegistry.findFragment(fragmentName);
			if (fragmentDefinition) {
				// Process the fragment's selection set and merge the fields
				const fragmentResult = processSelectionSet(
					fragmentDefinition.selectionSet,
					baseType,
					schema,
					config,
					knownSchemaNames,
					fragmentRegistry,
				);

				// Add fragment fields, checking for duplicates by field name
				for (const fragmentFieldName of Array.from(
					fragmentResult.fieldNames,
				)) {
					if (!fieldNames.has(fragmentFieldName)) {
						fieldNames.add(fragmentFieldName);
						// Find the corresponding field definition
						const fieldIndex = Array.from(
							fragmentResult.fieldNames,
						).indexOf(fragmentFieldName);
						if (
							fieldIndex >= 0 &&
							fragmentResult.fields[fieldIndex]
						) {
							fields.push(fragmentResult.fields[fieldIndex]);
						}
					}
				}
				continue;
			}

			// Fallback: if we can't find the fragment definition, create a getter
			const fragmentSchemaName = `${fragmentName}FragmentSchema`;
			fields.push(
				`  get ${fragmentName}() {\n    return ${fragmentSchemaName}\n  }`,
			);
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
					`/** Inline fragment type ${inlineTypeName} not found */`,
				);
				continue;
			}

			if (!isObjectType(inlineType)) {
				fields.push(
					`/** Inline fragment type ${inlineTypeName} is not an object type */`,
				);
				continue;
			}

			const inlineResult = processSelectionSet(
				selection.selectionSet,
				inlineType,
				schema,
				config,
				knownSchemaNames,
				fragmentRegistry,
			);

			// Add inline fragment fields, checking for duplicates by field name
			for (const inlineFieldName of Array.from(inlineResult.fieldNames)) {
				if (!fieldNames.has(inlineFieldName)) {
					fieldNames.add(inlineFieldName);
					// Find the corresponding field definition
					const fieldIndex = Array.from(
						inlineResult.fieldNames,
					).indexOf(inlineFieldName);
					if (fieldIndex >= 0 && inlineResult.fields[fieldIndex]) {
						fields.push(inlineResult.fields[fieldIndex]);
					}
				}
			}
		}
	}

	return {
		fields,
		fieldNames,
	};
}

/**
 * Processes fields for object-like types (input, object, interface)
 */
function processObjectFields(
	type: GraphQLInputObjectType | GraphQLObjectType | GraphQLInterfaceType,
	config: withZodPlugin.Config,
	knownSchemaNames: Set<string>,
): string[] {
	return Object.entries(type.getFields()).map(([fieldName, field]) => {
		const required = isNonNullType(field.type);
		const zodType = typeToZod(field.type, config, knownSchemaNames);
		const isRecursive = isRecursiveReference(field.type, knownSchemaNames);
		const finalZodType = required ? zodType : `${zodType}.nullish()`;
		const description = field.description || undefined;

		return isRecursive
			? createGetterDefinition(fieldName, finalZodType, description)
			: createFieldDefinition(fieldName, finalZodType, description);
	});
}

/**
 * Routes a GraphQL type to the appropriate conversion function
 */
function processType(
	type: GraphQLType,
	config: withZodPlugin.Config,
	knownSchemaNames: Set<string>,
): string | null {
	if (isEnumType(type)) {
		const values = type
			.getValues()
			.map((v) => `"${v.name}"`)
			.join(", ");
		const enumSchema = `z.enum([${values}])`;
		const description = type.description || undefined;
		const finalSchema = description
			? `${enumSchema}.meta({description: "${description.replace(/"/g, '\\"')}"})`
			: enumSchema;
		return wrapSchema(type.name, [], finalSchema, description);
	}

	if (isInputObjectType(type)) {
		const fields = processObjectFields(type, config, knownSchemaNames);
		const description = type.description || undefined;
		return wrapSchema(
			type.name,
			fields,
			description
				? `z.object({\n${fields.join(",\n")}\n}).meta({description: "${description.replace(/"/g, '\\"')}"})`
				: undefined,
			description,
		);
	}

	if (isObjectType(type)) {
		const fields = processObjectFields(type, config, knownSchemaNames);
		const description = type.description || undefined;
		return wrapSchema(
			type.name,
			fields,
			description
				? `z.object({\n${fields.join(",\n")}\n}).meta({description: "${description.replace(/"/g, '\\"')}"})`
				: undefined,
			description,
		);
	}

	if (isUnionType(type)) {
		const types = type
			.getTypes()
			.map((t) => `${t.name}Schema`)
			.join(", ");

		if (types.length === 0) {
			return `/** Union ${type.name}: No types found */`;
		}

		const unionSchema = `z.union([${types}])`;
		const description = type.description || undefined;
		const finalSchema = description
			? `${unionSchema}.meta({description: "${description.replace(/"/g, '\\"')}"})`
			: unionSchema;
		return wrapSchema(type.name, [], finalSchema, description);
	}

	if (isInterfaceType(type)) {
		const fields = processObjectFields(type, config, knownSchemaNames);
		const description = type.description || undefined;
		return wrapSchema(
			type.name,
			fields,
			description
				? `z.object({\n${fields.join(",\n")}\n}).meta({description: "${description.replace(/"/g, '\\"')}"})`
				: undefined,
			description,
		);
	}

	return null;
}

/**
 * Collects all known schema names from the GraphQL schema
 */
function collectKnownTypes(schema: GraphQLSchema): Set<string> {
	const typeMap = schema.getTypeMap();
	const knownSchemaNames = new Set<string>();

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
	return knownSchemaNames;
}

/**
 * Generic function to process document definitions
 */
function processDocumentDefinitions<
	T extends FragmentDefinitionNode | OperationDefinitionNode,
>(
	documents: Types.DocumentFile[],
	kind: string,
	processor: (definition: T) => void,
): void {
	for (const document of documents) {
		if (!document.document?.definitions) {
			continue;
		}

		for (const definition of document.document.definitions) {
			if (definition.kind === kind) {
				processor(definition as T);
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
	visitedTypes: Set<string>,
	fragmentRegistry: FragmentRegistry,
): string[] {
	const results: string[] = [];
	const knownSchemaNames = collectKnownTypes(schema);

	processDocumentDefinitions<FragmentDefinitionNode>(
		documents,
		Kind.FRAGMENT_DEFINITION,
		(definition) => {
			results.push(
				fragmentToZod(
					definition,
					schema,
					config,
					knownSchemaNames,
					visitedTypes,
					fragmentRegistry,
				),
			);
		},
	);

	return results;
}

/**
 * Processes all operations in documents to generate Zod schemas for their variables
 */
function processOperations(
	documents: Types.DocumentFile[],
	schema: GraphQLSchema,
	config: withZodPlugin.Config,
	visitedTypes: Set<string>,
): string[] {
	const results: string[] = [];
	const knownSchemaNames = collectKnownTypes(schema);

	processDocumentDefinitions<OperationDefinitionNode>(
		documents,
		Kind.OPERATION_DEFINITION,
		(definition) => {
			results.push(
				operationToZod(
					definition,
					config,
					knownSchemaNames,
					visitedTypes,
				),
			);
		},
	);

	return results;
}

/**
 * Processes a GraphQL operation with error handling
 */
function operationToZod(
	operation: OperationDefinitionNode,
	config: withZodPlugin.Config,
	knownSchemaNames: Set<string>,
	visitedTypes: Set<string>,
): string {
	try {
		const operationName = operation.name?.value || "Anonymous";
		const variables = operation.variableDefinitions || [];

		// Skip operations without variables
		if (variables.length === 0) {
			return `/** Operation ${operationName}: No variables defined */`;
		}

		// Check for circular references in operation
		if (detectCircularReference(operationName, visitedTypes)) {
			return `/** Operation ${operationName}: Circular reference detected */`;
		}

		// Process the operation's variable definitions
		const fields = processVariableDefinitions(
			variables,
			config,
			knownSchemaNames,
		);

		// Remove from visited types after processing
		visitedTypes.delete(operationName);

		// Add description for operation variables schema
		const description = `Variables for operation: ${operationName}`;
		return wrapSchema(
			`${operationName}Variables`,
			fields,
			`z.object({\n${fields.join(",\n")}\n}).meta({description: "${description}"})`,
			description,
		);
	} catch (error) {
		const operationName = operation.name?.value || "Anonymous";
		return `/** Error processing operation ${operationName}: ${error instanceof Error ? error.message : "Unknown error"} */`;
	}
}

/**
 * Converts an AST TypeNode directly to a Zod schema string
 */
function astTypeToZod(
	typeNode: any,
	config: withZodPlugin.Config,
	knownSchemaNames: Set<string>,
): string {
	if (typeNode.kind === Kind.NAMED_TYPE) {
		const name = typeNode.name.value;

		switch (name) {
			case "String":
				return "z.string()";
			case "Int":
				return "z.int()";
			case "Float":
				return "z.float32()";
			case "Boolean":
				return "z.boolean()";
			case "ID":
				return "z.string()";
			case "Date":
			case "DateTime":
				return "z.date()";
			case "JSON":
				return "z.any() /** JSON type */";
			default:
				if (config.scalars?.[name]) {
					return config.scalars[name];
				} else if (knownSchemaNames.has(`${name}Fragment`)) {
					return `${name}FragmentSchema`;
				} else if (knownSchemaNames.has(name)) {
					return `${name}Schema`;
				} else {
					return `z.any() /** Unknown type ${name} */`;
				}
		}
	} else if (typeNode.kind === Kind.NON_NULL_TYPE) {
		return astTypeToZod(typeNode.type, config, knownSchemaNames);
	} else if (typeNode.kind === Kind.LIST_TYPE) {
		return `z.array(${astTypeToZod(typeNode.type, config, knownSchemaNames)})`;
	}

	return `z.any() /** Unknown type ${typeNode.kind} */`;
}

/**
 * Processes variable definitions into field definitions for Zod schema generation
 */
function processVariableDefinitions(
	variables: readonly VariableDefinitionNode[],
	config: withZodPlugin.Config,
	knownSchemaNames: Set<string>,
): string[] {
	const fields: string[] = [];

	for (const variable of variables) {
		const variableName = variable.variable.name.value;
		const variableType = variable.type;

		if (!variableType) {
			fields.push(`/** Variable ${variableName}: Missing type */`);
			continue;
		}

		const zodType = astTypeToZod(variableType, config, knownSchemaNames);
		const required = variableType.kind === Kind.NON_NULL_TYPE;
		const finalZodType = required ? zodType : `${zodType}.nullish()`;

		// GraphQL variable definitions don't have descriptions in the AST
		// but we could potentially get them from directives or other sources
		// For now, we'll pass undefined for variable descriptions
		fields.push(
			createFieldDefinition(variableName, finalZodType, undefined),
		);
	}

	return fields;
}

/**
 * Processes a GraphQL fragment with error handling
 */
function fragmentToZod(
	fragment: FragmentDefinitionNode,
	schema: GraphQLSchema,
	config: withZodPlugin.Config,
	knownSchemaNames: Set<string>,
	visitedTypes: Set<string>,
	fragmentRegistry: FragmentRegistry,
): string {
	try {
		const fragmentName = `${fragment.name.value}Fragment`;
		const typeCondition = fragment.typeCondition;

		if (!typeCondition) {
			return `/** Fragment ${fragmentName}: Missing type condition */`;
		}

		const typeName = typeCondition.name.value;

		// Get the base type from the schema
		const baseType = schema.getType(typeName);
		if (!baseType) {
			return `/** Fragment ${fragmentName}: Type ${typeName} not found in schema */`;
		}

		if (!isObjectType(baseType)) {
			return `/** Fragment ${fragmentName}: Type ${typeName} is not an object type */`;
		}

		// Check for circular references in fragment
		if (detectCircularReference(fragmentName, visitedTypes)) {
			return `/** Fragment ${fragmentName}: Circular reference detected */`;
		}

		// Process the fragment's selection set
		const fields = processSelectionSet(
			fragment.selectionSet,
			baseType,
			schema,
			config,
			knownSchemaNames,
			fragmentRegistry,
		);

		// Remove from visited types after processing
		visitedTypes.delete(fragmentName);

		// Add description from the base type if available
		const description = baseType.description || undefined;
		return wrapSchema(
			fragmentName,
			fields.fields,
			description
				? `z.object({\n${fields.fields.join(",\n")}\n}).meta({description: "${description.replace(/"/g, '\\"')}"})`
				: undefined,
			description,
		);
	} catch (error) {
		const fragmentName = fragment.name.value;
		return `/** Error processing fragment ${fragmentName}: ${error instanceof Error ? error.message : "Unknown error"} */`;
	}
}

/**
 * Processes all types in the schema to generate Zod schemas
 */
function processTypes(
	schema: GraphQLSchema,
	config: withZodPlugin.Config,
	visitedTypes: Set<string>,
): string[] {
	const results: string[] = [];
	const typeMap = schema.getTypeMap();
	const knownSchemaNames = collectKnownTypes(schema);

	for (const typeName of Object.keys(typeMap)) {
		if (typeName.startsWith("__")) {
			continue;
		}

		const type = typeMap[typeName];
		if (!type) {
			continue;
		}

		const result = processTypeWithErrorHandling(
			type,
			config,
			knownSchemaNames,
			visitedTypes,
		);
		if (result) {
			results.push(result);
		}
	}

	return results;
}

/**
 * GraphQL Codegen plugin that generates Zod schemas from GraphQL schema and documents.
 * Converts GraphQL types, fragments, and operations into TypeScript-compatible Zod schemas.
 */
export const withZodPlugin: PluginFunction<withZodPlugin.Config> = (
	schema: GraphQLSchema,
	documents: Types.DocumentFile[],
	config: withZodPlugin.Config = {},
) => {
	// Merge config with defaults
	const finalConfig: Required<withZodPlugin.Config> = {
		scalars: config.scalars || {},
	};

	try {
		const output: string[] = [
			`/* eslint-disable no-use-before-define */`,
			`import { z } from "zod";`,
		];

		// Create visited types tracker for this execution
		const visitedTypes = new Set<string>();

		// Create a registry for fragment definitions
		const fragmentRegistry = new FragmentRegistry();
		fragmentRegistry.registerFragments(documents);

		// Validate fragment dependencies
		const dependencyErrors = fragmentRegistry.validateDependencies();
		if (dependencyErrors.length > 0) {
			output.push(
				`/** Fragment dependency warnings: */`,
				...dependencyErrors.map((error) => `/** ${error} */`),
			);
		}

		// Generate schemas for types, fragments, and operations
		const typeSchemas = processTypes(schema, finalConfig, visitedTypes);
		const fragmentSchemas = processFragments(
			documents,
			schema,
			finalConfig,
			visitedTypes,
			fragmentRegistry,
		);
		const operationSchemas = processOperations(
			documents,
			schema,
			finalConfig,
			visitedTypes,
		);

		output.push(...typeSchemas, ...fragmentSchemas, ...operationSchemas);

		return output.join("\n\n");
	} catch (error) {
		// Return a basic error message if the plugin fails completely
		const errorMessage = `/** Error processing plugin: ${error instanceof Error ? error.message : "Unknown error"} */`;

		return [
			`/* eslint-disable no-use-before-define */`,
			`import { z } from "zod";`,
			errorMessage,
			`export const ErrorSchema = z.any();`,
		].join("\n");
	}
};

export const plugin = withZodPlugin;
export default {
	plugin: withZodPlugin,
};
