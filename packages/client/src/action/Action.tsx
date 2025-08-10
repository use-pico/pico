import { withCls } from "@use-pico/cls";
import type { FC, HTMLAttributes } from "react";
import { Icon } from "../icon/Icon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { ActionCls } from "./ActionCls";

/**
 * Action, useful for creating simple actions like toolbar buttons.
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
 *      icon={{
 *          enabled: "...",
 *          disabled: "...",
 *          loading: "...",
 *      }}
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
	 * All the properties used in the Action icon.
	 */
	export interface Props
		extends ActionCls.Props<
			Omit<HTMLAttributes<HTMLDivElement>, "children">
		> {
		iconEnabled?: string;
		iconDisabled?: string;
		iconLoading?: string;
		iconProps?: Icon.PropsEx;
		/**
		 * Controls loading state of an action.
		 */
		loading?: boolean;
		/**
		 * Controls disabled state of an action.
		 */
		disabled?: boolean;
	}
}

const Component: FC<Action.Props> = ({
	iconEnabled,
	iconDisabled,
	iconLoading = SpinnerIcon,
	iconProps,
	disabled = false,
	loading = false,
	onClick,
	tva = ActionCls,
	cls,
	...props
}) => {
	const classes = tva.create(cls, () => ({
		variant: {
			disabled,
			loading,
		},
	}));

	return (
		<div
			className={classes.base()}
			onClick={disabled ? undefined : onClick}
			{...props}
		>
			{disabled ? (
				<Icon
					icon={loading ? iconLoading : (iconDisabled ?? iconEnabled)}
					{...iconProps}
				/>
			) : (
				<Icon
					icon={loading ? iconLoading : iconEnabled}
					{...iconProps}
				/>
			)}
		</div>
	);
};

export const Action = withCls(Component, ActionCls);
