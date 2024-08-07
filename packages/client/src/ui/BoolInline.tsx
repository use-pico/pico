import type { FC } from "react";
import { CheckIcon } from "../icon/CheckIcon";
import { UnCheckIcon } from "../icon/UnCheckIcon";
import { UndefinedIcon } from "../icon/UndefinedIcon";
import { Icon } from "./Icon";

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
	export interface Props extends Icon.PropsEx {
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
	...props
}) => {
	if (value === null || value === undefined) {
		return (
			<Icon
				icon={undefinedIcon}
				{...props}
			/>
		);
	}
	return (
		<Icon
			icon={value ? checkIcon : unCheckIcon}
			css={[value && "text-green-600", !value && "text-amber-600"]}
			{...props}
		/>
	);
};
