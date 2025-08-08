import type { FC, HTMLAttributes } from "react";
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

export const ModernButton: FC<ModernButton.Props> = ({
	children,
	disabled = false,
	loading = false,
	onClick,
	tva = ModernButtonCls,
	cls,
	...props
}) => {
	const classes = tva.create(cls, {
		variant: {
			disabled,
			loading,
		},
	});

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
