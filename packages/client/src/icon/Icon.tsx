import { type Cls, useCls } from "@use-pico/cls";
import { isString } from "@use-pico/common";
import type { FC, HTMLAttributes, ReactNode, Ref } from "react";
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
		ref?: Ref<HTMLDivElement>;
		/**
		 * `Iconify` icon name.
		 *
		 * If non-string is provided (basically a JSX element), this component
		 * is replaced with the element.
		 */
		icon: Icon.Type;
		size?: Cls.VariantOf<IconCls, "size">;
		tone?: Cls.VariantOf<IconCls, "tone">;
		theme?: Cls.VariantOf<IconCls, "theme">;
		disabled?: boolean;
	}

	/**
	 * Useful for extending an icon.
	 */
	export type PropsEx = Omit<Props, "icon"> & Partial<Pick<Props, "icon">>;
}

export const Icon: FC<Icon.Props> = ({
	ref,
	icon,
	size,
	tone,
	theme,
	disabled,
	cls = IconCls,
	tweak,
	...props
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			size,
			tone,
			theme,
			disabled,
		}),
		slot: what.slot({
			root: what.css(isString(icon) ? icon : undefined),
		}),
	}));

	return isString(icon) ? (
		<div
			data-ui="Icon-root"
			ref={ref}
			className={slots.root()}
			{...props}
		/>
	) : (
		icon
	);
};
