import { type ButtonHTMLAttributes, type FC } from "react";
import { Icon } from "../icon/Icon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { ButtonCss } from "./ButtonCss";

export namespace Button {
	export interface Props
		extends ButtonCss.Props<ButtonHTMLAttributes<HTMLButtonElement>> {
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
	variant,
	tva = ButtonCss,
	css,
	children,
	...props
}) => {
	const tv = tva({
		disabled: props.disabled,
		...variant,
		css,
	}).slots;

	return (
		<button
			type={"button"}
			className={tv.base({ disabled: props.disabled })}
			{...props}
		>
			{props.disabled ?
				<Icon
					icon={loading === true ? iconLoading : iconDisabled}
					variant={{ size: "xl" }}
					{...iconProps}
				/>
			:	<Icon
					icon={loading === true ? iconLoading : iconEnabled}
					variant={{ size: "xl" }}
					{...iconProps}
				/>
			}
			{children}
		</button>
	);
};
