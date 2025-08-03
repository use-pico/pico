import z from "zod";
import { CursorSchema } from "./CursorSchema";
import type { FilterSchema } from "./FilterSchema";
import { OrderSchema } from "./OrderSchema";

export namespace withQuerySchema {
	export interface Props<
		TFilterSchema extends FilterSchema,
		TSort extends string,
	> {
		filter: TFilterSchema;
		sort: TSort[];
	}

	export type QuerySchema<
		TFilterSchema extends FilterSchema = FilterSchema,
		TSort extends string = string,
	> = ReturnType<typeof withQuerySchema<TFilterSchema, TSort>>;

	export type Query<
		TFilterSchema extends FilterSchema = FilterSchema,
		TSort extends string = string,
	> = z.infer<QuerySchema<TFilterSchema, TSort>>;

	/**
	 * Extracts all available sort keys from a Query type.
	 *
	 * @template TQuery - The Query type to extract sort keys from
	 * @returns The union of all available sort keys
	 *
	 * @example
	 * ```typescript
	 * type MyQuery = withQuerySchema.Query<MyFilterSchema, "name" | "age">;
	 * type SortKeys = withQuerySchema.SortKeys<MyQuery>; // "name" | "age"
	 * ```
	 */
	export type SortKeys<TQuery extends Query> = NonNullable<
		TQuery["sort"]
	>[number]["value"];
}

/**
 * Creates a Zod schema for general data querying with cursor, filter, and sort support.
 *
 * This function generates a validation schema that defines the structure for querying data with:
 * - Optional cursor for pagination
 * - Optional filter/where conditions
 * - Optional sort array with key-value pairs
 *
 * @template TFilterSchema - The filter schema type that extends FilterSchema
 * @template TSort - The string literal type for sort keys
 *
 * @param props - Configuration object containing filter and sort definitions
 * @param props.filter - The filter schema to validate filter/where conditions
 * @param props.sort - Array of string keys that are allowed for sorting
 *
 * @returns A Zod object schema that validates data query structure with the shape:
 * ```typescript
 * {
 *   cursor?: string | null,
 *   filter?: TFilterSchema | null,
 *   where?: TFilterSchema | null,
 *   sort?: Array<{
 *     value: TSort,
 *     sort: "asc" | "desc" | null | undefined
 *   }> | null
 * }
 * ```
 *
 * @example
 * ```typescript
 * const schema = withQuerySchema({
 *   filter: userFilterSchema,
 *   sort: ['name', 'age']
 * });
 *
 * // Validates objects like:
 * // {
 * //   cursor: "abc123",
 * //   filter: { status: "active" },
 * //   sort: [
 * //     { value: "name", sort: "asc" },
 * //     { value: "age", sort: "desc" }
 * //   ]
 * // }
 * ```
 */
export const withQuerySchema = <
	TFilterSchema extends FilterSchema,
	TSort extends string,
>({
	filter,
	sort,
}: withQuerySchema.Props<TFilterSchema, TSort>) => {
	return z.object({
		cursor: CursorSchema.nullish(),
		filter: z.nullish(filter),
		where: z.nullish(filter),
		sort: z.nullish(
			z.array(
				z.object({
					value: sort.length > 0 ? z.enum(sort) : z.never(),
					sort: OrderSchema,
				}),
			),
		),
	});
};
