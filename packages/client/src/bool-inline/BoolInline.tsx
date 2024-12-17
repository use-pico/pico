import type { FC } from "react";
import { CheckIcon } from "../icon/CheckIcon";
import { Icon } from "../icon/Icon";
import { UnCheckIcon } from "../icon/UnCheckIcon";
import { UndefinedIcon } from "../icon/UndefinedIcon";
import { BoolInlineCss } from "./BoolInlineCss";

/**
 * Renders icon based on a boolean value.
 *
 * @group ui
 *
 * @example
 * ```tsx
 * import {BoolInline} from "@use-pico/client";
 *
 * export const MyComponent = () => {
 *  return <BoolInline
 *    bool={true}
 *  />
 * }
 * ```
 */
export namespace BoolInline {
	/**
	 * Props for BoolInline component.
	 */
	export interface Props extends BoolInlineCss.Props<Icon.PropsEx> {
		/**
		 * Input boolean value.
		 */
		value?: boolean | null;
		/**
		 * Icon to display when value is true.
		 */
		checkIcon?: string;
		/**
		 * Icon to display when value is false.
		 */
		unCheckIcon?: string;
		/**
		 * Icon to display when value is undefined.
		 */
		undefinedIcon?: string;
	}
}

export const BoolInline: FC<BoolInline.Props> = ({
	value,
	checkIcon = CheckIcon,
	unCheckIcon = UnCheckIcon,
	undefinedIcon = UndefinedIcon,
	tva = BoolInlineCss,
	...props
}) => {
	if (value === null || value === undefined) {
		return (
			<Icon
				icon={undefinedIcon}
				tva={tva}
				{...props}
			/>
		);
	}
	return (
		<Icon
			icon={value ? checkIcon : unCheckIcon}
			tva={(values) => tva({ ...values, value })}
			{...props}
		/>
	);
};
