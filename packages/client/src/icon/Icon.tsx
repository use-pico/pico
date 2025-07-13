import type { FC, HTMLAttributes } from "react";
import { IconCls } from "./IconCls";

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
		extends IconCls.Props<
			Omit<HTMLAttributes<HTMLDivElement>, "className">
		> {
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
	tva = IconCls,
	cls,
	...props
}) => {
	const { el } = tva(variant, cls);

	return icon ? (
		<el.base.Div
			cls={icon}
			{...props}
		/>
	) : null;
};
