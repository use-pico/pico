import type { ClassName } from "../ClassName";

/**
 * Defines the structure of variants in a component.
 * TVariantKeys represents the names of different variant categories (like 'size', 'color', 'state', etc.)
 * Each variant category maps to a record where keys are variant values and values are class names.
 * For example: { size: { small: 'text-sm', large: 'text-lg' } }
 */
export type VariantProps<
	TSlotKeys extends string,
	TVariantKeys extends string,
> = Record<TVariantKeys, Record<string, Partial<Record<TSlotKeys, ClassName>>>>;
