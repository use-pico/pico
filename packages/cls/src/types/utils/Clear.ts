import type { ClsProps } from "./ClsProps";

/**
 * Removes cls-related props from a Props type.
 * TProps represents the full props type that includes cls system props.
 * This type omits the variant, tva, and cls properties, useful when you want to extend props
 * and provide your own cls type.
 */
export type Clear<TProps extends ClsProps<any>> = Omit<
	TProps,
	"variant" | "tva" | "cls"
>;
