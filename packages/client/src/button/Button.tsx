import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { ButtonHTMLAttributes, FC, Ref } from "react";
import { Icon } from "../icon/Icon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { ToneProvider } from "../tone/ToneProvider";
import { useTone } from "../tone/useTone";
import { ButtonCls } from "./ButtonCls";

export namespace Button {
	export interface Props
		extends ButtonCls.Props<ButtonHTMLAttributes<HTMLButtonElement>> {
		wrapperRef?: Ref<HTMLDivElement>;
		buttonRef?: Ref<HTMLButtonElement>;
		iconEnabled?: string;
		iconDisabled?: string;
		iconLoading?: string;
		iconProps?: Omit<Icon.Props, "icon">;
		loading?: boolean;
		size?: Cls.VariantOf<ButtonCls, "size">;
		tone?: Cls.VariantOf<ButtonCls, "tone">;
		theme?: Cls.VariantOf<ButtonCls, "theme">;
		round?: Cls.VariantOf<ButtonCls, "round">;
	}
}

export const BaseButton: FC<Button.Props> = ({
	wrapperRef,
	buttonRef,
	iconEnabled,
	iconDisabled,
	iconLoading = SpinnerIcon,
	iconProps,
	loading,
	size,
	tone,
	theme,
	round,
	cls = ButtonCls,
	tweak,
	disabled,
	children,
	...props
}) => {
	const contextTone = useTone({
		tone,
		theme,
	});

	const { slots } = useCls(cls, tweak, {
		variant: {
			disabled,
			size,
			round,
			...contextTone,
		},
	});

	return (
		<ToneProvider {...contextTone}>
			<div
				data-ui="Button-wrapper"
				ref={wrapperRef}
				className={slots.wrapper()}
			>
				<button
					data-ui="Button-root"
					ref={buttonRef}
					className={slots.root()}
					type={"button"}
					disabled={disabled}
					{...props}
				>
					{disabled ? (
						<Icon
							icon={
								loading === true
									? iconLoading
									: (iconDisabled ?? iconEnabled)
							}
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
		</ToneProvider>
	);
};

export const Button = withCls(BaseButton, ButtonCls);
