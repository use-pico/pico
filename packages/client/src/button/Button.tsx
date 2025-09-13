import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { ButtonHTMLAttributes, FC, Ref } from "react";
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
		size?: Cls.VariantOf<ButtonCls, "size">;
		tone?: Cls.VariantOf<ButtonCls, "tone">;
		theme?: Cls.VariantOf<ButtonCls, "theme">;
		round?: Cls.VariantOf<ButtonCls, "round">;
		ref?: Ref<HTMLButtonElement>;
	}
}

export const BaseButton: FC<Button.Props> = ({
	iconEnabled,
	iconDisabled,
	iconLoading = SpinnerIcon,
	iconProps,
	loading,
	size,
	tone,
	theme,
	round,
	ref,
	cls = ButtonCls,
	tweak,
	children,
	...props
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			disabled: props.disabled,
			size,
			tone,
			theme,
			round,
		}),
	}));

	return (
		<div className={slots.wrapper()}>
			<button
				ref={ref}
				className={slots.root()}
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

export const Button = withCls(BaseButton, ButtonCls);
