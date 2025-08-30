import { useCls, withCls } from "@use-pico/cls";
import type { FC } from "react";
import { TypoCls } from "./TypoCls";

export namespace Typo {
	export interface Props extends TypoCls.Props {
		label: string;
	}
}

/**
 * Base Typo component - a simple text wrapper for rendering text content.
 *
 * This component is designed specifically for text rendering and only accepts
 * string values instead of ReactNode to ensure it's used for its intended purpose.
 * It provides consistent typography styling through the TypoCls system.
 *
 * @param props - Component props
 * @param props.label - The text string to render (only accepts strings, not ReactNode)
 * @param props.tva - Optional theme variant array, defaults to TypoCls
 * @param props.cls - Optional class name overrides
 *
 * @example
 * ```tsx
 * <Typo label="Hello World" />
 * <Typo label="Custom text" cls="text-blue-500" />
 * ```
 *
 * @returns A div element with the rendered text and applied typography styles
 */
export const BaseTypo: FC<Typo.Props> = ({ label, tva = TypoCls, cls }) => {
	const slots = useCls(tva, cls);

	return <div className={slots.root()}>
        {label}</div>;
};

/**
 * Typo component - a styled text wrapper that renders string content.
 *
 * This is the main export that provides consistent typography styling.
 * It's literally a text wrapper used to render text, which is why it
 * accepts only "string" instead of ReactNode.
 *
 * @example
 * ```tsx
 * import { Typo } from './typo/Typo';
 *
 * <Typo label="Welcome to our app" />
 * ```
 */
export const Typo = withCls(BaseTypo, TypoCls);
