import { useCls, type VariantOf } from "@use-pico/cls";
import type { ButtonHTMLAttributes, FC } from "react";
import { Icon } from "../icon/Icon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { ButtonCls } from "./ButtonCls";

export namespace Button {
	export interface Props
		extends ButtonCls.Props<ButtonHTMLAttributes<HTMLButtonElement>> {
		iconEnabled?: string;
		iconDisabled?: string;
		iconLoading?: string;
		iconProps?: Omit<Icon.Props, "icon">;
		loading?: boolean;
		size?: VariantOf<ButtonCls, "size">;
	}
}

export const Button: FC<Button.Props> = ({
	iconEnabled,
	iconDisabled,
	iconLoading = SpinnerIcon,
	iconProps,
	loading,
	size,
	tva = ButtonCls,
	cls,
	children,
	...props
}) => {
	const classes = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			disabled: props.disabled,
			size,
		}),
	}));

	return (
		<div className={classes.wrapper()}>
			<button
				className={classes.root()}
				type={"button"}
				{...props}
			>
				{props.disabled ? (
					<Icon
						icon={loading === true ? iconLoading : iconDisabled}
						size={"sm"}
						{...iconProps}
					/>
				) : (
					<Icon
						icon={loading === true ? iconLoading : iconEnabled}
						size={"sm"}
						{...iconProps}
					/>
				)}
				{children}
			</button>
		</div>
	);
};
