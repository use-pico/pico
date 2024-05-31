import {type z} from "zod";

/**
 * Extracts the inferred type of a nested key from a schema.
 */
export type InferOf<TKey extends string, TSchema extends z.ZodObject<any>> = TKey extends `${infer T}.${infer K}` ? InferOf<K, TSchema["shape"][T] extends z.ZodOptional<any> ? ReturnType<TSchema["shape"][T]["unwrap"]> : TSchema["shape"][T]> : z.infer<TSchema["shape"][TKey]>;
