import { type ButtonHTMLAttributes, type FC, memo, useMemo } from "react";
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

export const Button: FC<Button.Props> = memo(
	({
		iconEnabled,
		iconDisabled,
		iconLoading = SpinnerIcon,
		iconProps,
		loading,
		variant,
		tva = ButtonCls,
		css,
		children,
		...props
	}) => {
		const tv = tva({
			disabled: props.disabled,
			...variant,
			css,
		}).slots;

		const iconVariant = useMemo(
			() =>
				({
					size: "xl",
				}) as const,
			[],
		);

		return (
			<button
				type={"button"}
				className={tv.base({
					disabled: props.disabled,
				})}
				{...props}
			>
				{props.disabled ? (
					<Icon
						icon={loading === true ? iconLoading : iconDisabled}
						variant={iconVariant}
						{...iconProps}
					/>
				) : (
					<Icon
						icon={loading === true ? iconLoading : iconEnabled}
						variant={iconVariant}
						{...iconProps}
					/>
				)}
				{children}
			</button>
		);
	},
);
