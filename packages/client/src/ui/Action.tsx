import { Css, cssOf } from "@use-pico/common";
import { type FC, type HTMLAttributes } from "react";
import { Icon } from "./Icon";

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
	export interface Props extends Css.Style, HTMLAttributes<HTMLDivElement> {
		/**
		 * Various icon states.
		 */
		icon: {
			/**
			 * Enabled state
			 */
			enabled: string;
			/**
			 * Disabled state.
			 */
			disabled?: string;
			/**
			 * Loading state.
			 */
			loading?: string;
		};
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
	icon,
	disabled = false,
	loading = false,
	css,
	children,
	...props
}) => {
	return (
		<div
			className={cssOf(
				"flex items-center justify-center gap-2 group w-fit h-fit",
				"rounded cursor-pointer",
				"hover:shadow-md hover:shadow-slate-200 transition-all",
				"hover:bg-slate-200",
				"text-slate-600",
				"text-2xl",
				"p-1",
				disabled && "opacity-50 cursor-not-allowed hover:bg-blue-400",
				css,
			)}
			{...props}
		>
			{disabled && icon?.disabled ?
				<Icon
					icon={
						loading ?
							icon.loading ?? "icon-[svg-spinners--90-ring-with-bg]"
						:	icon.disabled
					}
					size={"xl"}
				/>
			:	null}
			{!disabled && icon?.enabled ?
				<Icon
					icon={
						loading ?
							icon.loading ?? "icon-[svg-spinners--90-ring-with-bg]"
						:	icon.enabled
					}
					size={"xl"}
				/>
			:	null}
			{children}
		</div>
	);
};
