import { type FC, type HTMLAttributes } from "react";
import { IconCss } from "./IconCss";

/**
 * Simple styled icon (span); uses Tailwind CSS classes.
 *
 * @group ui
 */
export namespace Icon {
	/**
	 * Props for `Icon` component.
	 */
	export interface Props
		extends IconCss.Props<Omit<HTMLAttributes<HTMLDivElement>, "className">> {
		/**
		 * `Iconify` icon name.
		 */
		icon: string | undefined;
	}

	/**
	 * Useful for extending an icon.
	 */
	export type PropsEx = Omit<Props, "icon"> & Partial<Pick<Props, "icon">>;
}

export const Icon: FC<Icon.Props> = ({
	icon,
	variant,
	tva = IconCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;
	return icon ?
			<div
				className={tv.base({ css: [icon] })}
				{...props}
			/>
		:	null;
};
