import type {FC}       from "react";
import {CheckIcon}     from "../icon/CheckIcon";
import {UnCheckIcon}   from "../icon/UnCheckIcon";
import {UndefinedIcon} from "../icon/UndefinedIcon";
import {Icon}          from "./Icon";

export namespace BoolInline {
	/**
	 * Props for BoolInline component.
	 */
	export interface Props extends Icon.PropsEx {
		/**
		 * Input boolean value.
		 */
		bool?: boolean | null;
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

/**
 * Renders icon based on a boolean value.
 *
 * @category UI
 */
export const BoolInline: FC<BoolInline.Props> = (
	{
		bool,
		checkIcon = CheckIcon,
		unCheckIcon = UnCheckIcon,
		undefinedIcon = UndefinedIcon,
		...props
	}) => {
	return bool !== undefined && bool !== null ? (bool ? <Icon
		icon={checkIcon}
		{...props}
	/> : <Icon
		icon={unCheckIcon}
		{...props}
	/>) : <Icon
		icon={undefinedIcon}
		{...props}
	/>;
};
