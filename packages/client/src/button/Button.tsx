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
	}
}

export const Button: FC<Button.Props> = ({
	iconEnabled,
	iconDisabled,
	iconLoading = SpinnerIcon,
	iconProps,
	loading,
	tva = ButtonCls,
	cls,
	children,
	...props
}) => {
	const classes = tva.create(cls, {
		variant: {
			disabled: props.disabled,
		},
	});

	const iconVariant = {
		size: "xl",
	} as const;

	return (
		<button
			className={classes.base}
			type={"button"}
			{...props}
		>
			{props.disabled ? (
				<Icon
					icon={loading === true ? iconLoading : iconDisabled}
					cls={{
						variant: iconVariant,
					}}
					{...iconProps}
				/>
			) : (
				<Icon
					icon={loading === true ? iconLoading : iconEnabled}
					cls={{
						variant: iconVariant,
					}}
					{...iconProps}
				/>
			)}
			{children}
		</button>
	);
};
