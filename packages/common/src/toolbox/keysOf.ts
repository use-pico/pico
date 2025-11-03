/**
 * Returns an array of object keys as typed strings, preserving type information.
 *
 * This is a type-safe wrapper around `Object.keys()` that ensures the returned
 * array has the correct TypeScript type. Unlike `Object.keys()` which returns
 * `string[]`, this function returns `Array<Extract<keyof TObject, string>>`,
 * preserving the relationship between the object type and its keys.
 *
 * **Use case:**
 * When you need to iterate over object keys while maintaining type safety,
 * this function provides better type inference than the native `Object.keys()`.
 *
 * @template TObject - The type of the object whose keys are being extracted
 *
 * @param obj - The object to extract keys from
 *
 * @returns An array of string keys from the object, typed as `Array<Extract<keyof TObject, string>>`
 *
 * @example
 * ```typescript
 * import { keysOf } from "@use-pico/common/toolbox";
 *
 * const user = {
 *   id: "123",
 *   name: "John",
 *   age: 30
 * };
 *
 * const keys = keysOf(user);
 * // Type: Array<"id" | "name" | "age">
 * // Value: ["id", "name", "age"]
 *
 * // Type-safe iteration
 * keys.forEach(key => {
 *   const value = user[key]; // TypeScript knows this is valid
 *   console.log(`${key}: ${value}`);
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Comparison with Object.keys()
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * // Object.keys() returns string[]
 * const nativeKeys = Object.keys(obj);
 * // Type: string[]
 * // No type safety when accessing obj[key]
 *
 * // keysOf() returns typed keys
 * const typedKeys = keysOf(obj);
 * // Type: Array<"a" | "b" | "c">
 * // Type-safe access to obj[key]
 * ```
 *
 * @example
 * ```typescript
 * // Usage in a generic function
 * function logObjectKeys<T extends object>(obj: T) {
 *   const keys = keysOf(obj);
 *   keys.forEach(key => {
 *     console.log(`${String(key)}: ${obj[key]}`);
 *   });
 * }
 *
 * logObjectKeys({ x: 1, y: 2 }); // Logs: "x: 1", "y: 2"
 * ```
 */
export function keysOf<TObject extends object>(obj: TObject) {
	return Object.keys(obj) as Array<Extract<keyof TObject, string>>;
}
