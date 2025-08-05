/**
 * Extracts the possible values for each variant from the variant definition.
 * For boolean variants (those with only 'true'/'false' keys), it maps to boolean type.
 * For other variants, it maps to the union of all possible string keys.
 * This type is used to define what values can be passed to each variant.
 */
export type ValuesDef<TVariant> = {
	[K in keyof TVariant]?: keyof TVariant[K] extends "true" | "false"
		? boolean
		: keyof TVariant[K];
};
