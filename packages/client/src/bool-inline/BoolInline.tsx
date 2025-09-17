import type { FC, Ref } from "react";
import { CheckIcon } from "../icon/CheckIcon";
import { Icon } from "../icon/Icon";
import { IconCls } from "../icon/IconCls";
import { UnCheckIcon } from "../icon/UnCheckIcon";
import { UndefinedIcon } from "../icon/UndefinedIcon";
import { BoolInlineCls } from "./BoolInlineCls";

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
	export interface Props extends BoolInlineCls.Props<Icon.PropsEx> {
		ref?: Ref<HTMLDivElement>;
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
	ref,
	value,
	checkIcon = CheckIcon,
	unCheckIcon = UnCheckIcon,
	undefinedIcon = UndefinedIcon,
	cls = BoolInlineCls,
	tweak,
	...props
}) => {
	if (value === null || value === undefined) {
		return (
			<div
				ref={ref}
				data-ui="BoolInline-root"
			>
				<Icon
					icon={undefinedIcon}
					cls={IconCls.use(cls)}
					tweak={IconCls.tweak(tweak)}
					{...props}
				/>
			</div>
		);
	}

	return (
		<div
			ref={ref}
			data-ui="BoolInline-root"
		>
			<Icon
				icon={value ? checkIcon : unCheckIcon}
				cls={IconCls.use(cls)}
				tweak={IconCls.tweak(tweak, ({ what }) => ({
					variant: what.variant({
						value,
					}),
				}))}
				{...props}
			/>
		</div>
	);
};
