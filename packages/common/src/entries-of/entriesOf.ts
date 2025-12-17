/**
 * Returns an array of object entries as typed tuples, preserving type information.
 *
 * This is a type-safe wrapper around `Object.entries()` that ensures the returned
 * array has the correct TypeScript type. Unlike `Object.entries()` which returns
 * `[string, any][]`, this function returns `Array<[Extract<keyof TObject, string>, TObject[Extract<keyof TObject, string>]]>`,
 * preserving the relationship between the object type, its keys, and values.
 *
 * **Use case:**
 * When you need to iterate over object entries (key-value pairs) while maintaining type safety,
 * this function provides better type inference than the native `Object.entries()`.
 *
 * @template TObject - The type of the object whose entries are being extracted
 *
 * @param obj - The object to extract entries from
 *
 * @returns An array of [key, value] tuples from the object, typed as `Array<[Extract<keyof TObject, string>, TObject[Extract<keyof TObject, string>]]>`
 *
 * @example
 * ```typescript
 * import { entriesOf } from "@use-pico/common/entries-of";
 *
 * const user = {
 *   id: "123",
 *   name: "John",
 *   age: 30
 * };
 *
 * const entries = entriesOf(user);
 * // Type: Array<["id" | "name" | "age", string | number]>
 * // Value: [["id", "123"], ["name", "John"], ["age", 30]]
 *
 * // Type-safe iteration
 * entries.forEach(([key, value]) => {
 *   // TypeScript knows key is "id" | "name" | "age"
 *   // TypeScript knows value is string | number
 *   console.log(`${key}: ${value}`);
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Comparison with Object.entries()
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * // Object.entries() returns [string, any][]
 * const nativeEntries = Object.entries(obj);
 * // Type: [string, any][]
 * // No type safety for keys or values
 *
 * // entriesOf() returns typed entries
 * const typedEntries = entriesOf(obj);
 * // Type: Array<["a" | "b" | "c", number]>
 * // Type-safe access to both keys and values
 * ```
 *
 * @example
 * ```typescript
 * // Usage in a generic function
 * function logObjectEntries<T extends Record<string, unknown>>(obj: T) {
 *   const entries = entriesOf(obj);
 *   entries.forEach(([key, value]) => {
 *     console.log(`${String(key)}: ${value}`);
 *   });
 * }
 *
 * logObjectEntries({ x: 1, y: 2 }); // Logs: "x: 1", "y: 2"
 * ```
 */
export function entriesOf<TObject extends Record<string, unknown>>(
	obj: TObject,
) {
	return Object.entries(obj) as Array<
		[
			Extract<keyof TObject, string>,
			TObject[Extract<keyof TObject, string>],
		]
	>;
}
