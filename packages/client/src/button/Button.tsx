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
	const classes = tva.create(cls, ({ what }) => ({
		variant: what.variant({
			disabled: props.disabled,
		}),
	}));

	const iconVariant = {
		size: "xl",
	} as const;

	return (
		<button
			className={classes.root()}
			type={"button"}
			{...props}
		>
			{props.disabled ? (
				<Icon
					icon={loading === true ? iconLoading : iconDisabled}
					cls={({ what }) => ({
						variant: what.variant(iconVariant),
					})}
					{...iconProps}
				/>
			) : (
				<Icon
					icon={loading === true ? iconLoading : iconEnabled}
					cls={({ what }) => ({
						variant: what.variant(iconVariant),
					})}
					{...iconProps}
				/>
			)}
			{children}
		</button>
	);
};
