import type { ClassName } from "../ClassName";
import type { ValuesDef } from "../definition/ValuesDef";
import type { SlotEx } from "../ex/SlotEx";
import type { VariantEx } from "../ex/VariantEx";
import type { ClsFn } from "../fn/ClsFn";

/**
 * Type for component props that include cls system props.
 * TCls represents the cls function type that this component uses.
 * P represents additional props that the component may have.
 * This type automatically includes variant, tva, and cls props while omitting them from the base props to prevent conflicts.
 */
export type ClsProps<TCls extends ClsFn<any, any, any>, P = unknown> = {
	variant?: ValuesDef<VariantEx<ReturnType<TCls>["~type"]["variant"], TCls>>;
	tva?: TCls;
	cls?: {
		[K in keyof SlotEx<
			ReturnType<TCls>["~type"]["slot"],
			TCls
		>]?: ClassName;
	};
} & Omit<P, "variant" | "tva" | "cls">;
