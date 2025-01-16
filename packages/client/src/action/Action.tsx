import { type FC, type HTMLAttributes } from "react";
import { Icon } from "../icon/Icon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { ActionCss } from "./ActionCss";

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
		extends ActionCss.Props<HTMLAttributes<HTMLDivElement>> {
		iconEnabled?: string;
		iconDisabled?: string;
		iconLoading?: string;
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

export const Action: FC<Action.Props> = ({
	iconEnabled,
	iconDisabled,
	iconLoading = SpinnerIcon,
	disabled = false,
	loading = false,
	onClick,
	variant,
	tva = ActionCss,
	css,
	children,
	...props
}) => {
	const tv = tva({ disabled, loading, ...variant, css }).slots;

	return (
		<div
			className={tv.base()}
			onClick={disabled ? undefined : onClick}
			{...props}
		>
			{disabled ?
				<Icon icon={loading ? iconLoading : (iconDisabled ?? iconEnabled)} />
			:	<Icon icon={loading ? iconLoading : iconEnabled} />}
			{children}
		</div>
	);
};
