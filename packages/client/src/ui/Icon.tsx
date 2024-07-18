import {
	Css,
	cssOf
} from "@use-pico/common";
import {
	type FC,
	type HTMLAttributes
} from "react";

const cssSize = {
	"xs": "text-xs",
	"sm": "text-sm",
	"md": "text-base",
	"lg": "text-lg",
	"xl": "text-xl",
	"2xl": "text-2xl",
	"3xl": "text-3xl",
	"4xl": "text-4xl",
	"5xl": "text-5xl",
	"6xl": "text-6xl",
} as const;
type cssSize = typeof cssSize;

/**
 * Simple styled icon (span); uses Tailwind CSS classes.
 *
 * @group ui
 */
export namespace Icon {
	/**
	 * Props for `Icon` component.
	 */
	export interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "className">, Css.Style {
		/**
		 * `Iconify` icon name.
		 */
		icon: string;
		/**
		 * Size of the icon.
		 */
		size?: keyof cssSize;
	}

	/**
	 * Useful for extending an icon.
	 */
	export type PropsEx =
		Omit<Props, "icon">
		& Partial<Pick<Props, "icon">>;
}

export const Icon: FC<Icon.Props> = (
	{
		icon,
		size,
		css,
		...props
	}
) => {
	return <span
		className={cssOf(
			icon,
			size ? cssSize[size] : false,
			css,
		)}
		{...props}
	/>;
};
