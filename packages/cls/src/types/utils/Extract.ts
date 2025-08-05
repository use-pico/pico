import type { Props } from "./ClsProps";

/**
 * Extracts only the cls-related props from a Props type.
 * TProps represents the full props type that includes cls system props.
 * This type picks only the variant, tva, and cls properties for when you need just the cls system props.
 */
export type Extract<TProps extends Props<any>> = Pick<
	TProps,
	"variant" | "tva" | "cls"
>;
