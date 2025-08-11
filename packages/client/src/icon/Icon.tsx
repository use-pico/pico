import { isString } from "@use-pico/common";
import type { FC, HTMLAttributes, ReactNode } from "react";
import { IconCls } from "./IconCls";

/**
 * Simple styled icon (span); uses Tailwind CSS classes.
 *
 * @group ui
 */
export namespace Icon {
	export type Type = string | ReactNode;

	/**
	 * Props for `Icon` component.
	 */
	export interface Props
		extends IconCls.Props<
			Omit<HTMLAttributes<HTMLDivElement>, "className">
		> {
		/**
		 * `Iconify` icon name.
		 *
		 * If non-string is provided (basically a JSX element), this component
		 * is replaced with the element.
		 */
		icon: Icon.Type;
	}

	/**
	 * Useful for extending an icon.
	 */
	export type PropsEx = Omit<Props, "icon"> & Partial<Pick<Props, "icon">>;
}

export const Icon: FC<Icon.Props> = ({
	icon,
	tva = IconCls,
	cls,
	...props
}) => {
	const classes = tva.create(
		cls,
		isString(icon)
			? ({ what }) => ({
					slot: {
						base: what.css(icon),
					},
				})
			: undefined,
	);

	return isString(icon) ? (
		<div
			className={classes.base()}
			{...props}
		/>
	) : (
		icon
	);
};
