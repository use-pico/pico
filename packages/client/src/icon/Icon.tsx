import { isString } from "@use-pico/common/is-string";
import type { ComponentProps, FC, ReactNode } from "react";
import { uiIcon } from "./uiIcon";

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
	export interface Props extends uiIcon.Component<ComponentProps<"span">> {
		icon: Icon.Type;
	}

	/**
	 * Useful for extending an icon.
	 */
	export type PropsEx = Partial<Props>;
}

export const Icon: FC<Icon.Props> = ({
	icon,
	//
	ui,
	className,
	//
	...props
}) => {
	return isString(icon) ? (
		<span
			{...uiIcon({
				ui,
				//
				className: [
					icon,
					className,
				],
			})}
			{...props}
		/>
	) : (
		icon
	);
};
