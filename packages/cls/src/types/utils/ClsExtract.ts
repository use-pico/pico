import type { ClsProps } from "./ClsProps";

/**
 * Extracts only the cls-related props from a Props type.
 * TProps represents the full props type that includes cls system props.
 * This type picks only the variant, tva, and cls properties for when you need just the cls system props.
 */
export type ClsExtract<TProps extends ClsProps<any>> = Pick<
	TProps,
	"variant" | "tva" | "cls"
>;
