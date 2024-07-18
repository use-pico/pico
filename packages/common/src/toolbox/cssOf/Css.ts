import type { ClassNameValue } from "tailwind-merge";
import { type Styles } from "./Styles";

export namespace Css {
	export interface Style {
		css?: ClassNameValue;
	}
}

/**
 * This interface is used to add css prop to components.
 *
 * Because a lot of components are componed by other components, this interface enables to get all required
 * styles and distribute them to the children.
 */
export interface Css<T extends string> {
	css?: Styles<T>;
}
