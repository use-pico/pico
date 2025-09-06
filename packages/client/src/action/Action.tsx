import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, HTMLAttributes } from "react";
import { Icon } from "../icon/Icon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { ActionCls } from "./ActionCls";

/**
 * Action component for creating simple interactive elements like toolbar buttons.
 *
 * The Action component provides a flexible way to create clickable elements with
 * different states (enabled, disabled, loading) and customizable icons. It's
 * particularly useful for toolbar buttons, action buttons, and other interactive
 * elements that need to respond to different states.
 *
 * @group ui
 *
 * @example
 * ```tsx
 * import {Action} from "@use-pico/client";
 *
 * export const MyComponent = () => {
 *   const mutation = useMutation();
 *   return <Action
 *      iconEnabled="play"
 *      iconDisabled="pause"
 *      iconLoading="spinner"
 *      loading={mutation.isPending}
 *      onClick={() => {
 *          mutation.mutate();
 *      }}
 *   />
 * }
 * ```
 */
export namespace Action {
	/**
	 * Properties for the Action component.
	 */
	export interface Props
		extends ActionCls.Props<
			Omit<HTMLAttributes<HTMLDivElement>, "children">
		> {
		/** Icon to display when the action is enabled and not loading */
		iconEnabled?: Icon.Type;
		/** Icon to display when the action is disabled */
		iconDisabled?: Icon.Type;
		/** Icon to display when the action is in loading state */
		iconLoading?: Icon.Type;
		/** Additional properties to pass to the Icon component */
		iconProps?: Icon.PropsEx;
		/** Size variant of the action (inherits from ActionCls size variants) */
		size?: Cls.VariantOf<ActionCls, "size">;
		/**
		 * Controls loading state of an action.
		 * When true, displays the loading icon and prevents click events.
		 */
		loading?: boolean;
		/**
		 * Controls disabled state of an action.
		 * When true, displays the disabled icon and prevents click events.
		 */
		disabled?: boolean;
	}
}

const BaseAction: FC<Action.Props> = ({
	iconEnabled,
	iconDisabled,
	iconLoading = SpinnerIcon,
	iconProps,
	size = "sm",
	disabled = false,
	loading = false,
	onClick,
	tva = ActionCls,
	tweak,
	...props
}) => {
	const slots = useCls(tva, tweak, ({ what }) => ({
		variant: what.variant({
			disabled,
			loading,
			size,
		}),
	}));

	return (
		<div
			className={slots.base()}
			onClick={disabled ? undefined : onClick}
			{...props}
		>
			{disabled ? (
				<Icon
					icon={loading ? iconLoading : (iconDisabled ?? iconEnabled)}
					size={size}
					{...iconProps}
				/>
			) : (
				<Icon
					icon={loading ? iconLoading : iconEnabled}
					size={size}
					{...iconProps}
				/>
			)}
		</div>
	);
};

export const Action = withCls(BaseAction, ActionCls);
