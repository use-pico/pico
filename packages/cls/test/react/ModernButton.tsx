import type { FC, HTMLAttributes } from "react";
import { useCls, withCls } from "../../src/react";
import { ModernButtonCls } from "./ModernButtonCls";

/**
 * Modern Button component using the new useCls hook.
 *
 * @example
 * ```tsx
 * import {ModernButton} from "./ModernButton";
 *
 * export const MyComponent = () => {
 *   return <ModernButton
 *      variant="primary"
 *      size="lg"
 *      disabled={false}
 *      onClick={() => console.log("clicked")}
 *   >
 *     Click me
 *   </ModernButton>
 * }
 * ```
 */
export namespace ModernButton {
	/**
	 * All the properties used in the ModernButton component.
	 */
	export interface Props
		extends ModernButtonCls.Props<
			Omit<HTMLAttributes<HTMLButtonElement>, "children">
		> {
		children?: React.ReactNode;
		disabled?: boolean;
		loading?: boolean;
	}
}

const ModernButtonBase: FC<ModernButton.Props> = ({
	children,
	disabled = false,
	loading = false,
	onClick,
	cls,
	...props
}) => {
	const classes = useCls(
		ModernButtonCls,
		{
			variant: {
				disabled,
				loading,
			},
		},
		cls,
	);

	return (
		<button
			type="button"
			className={classes.root()}
			onClick={disabled || loading ? undefined : onClick}
			disabled={disabled || loading}
			{...props}
		>
			{loading && <span className={classes.spinner()}>⏳</span>}
			<span className={classes.label()}>{children}</span>
		</button>
	);
};

// Attach cls instance to component
export const ModernButton = withCls(ModernButtonBase, ModernButtonCls);
