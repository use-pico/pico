import { type Cls, useCls, VariantProvider, withCls } from "@use-pico/cls";
import type { ButtonHTMLAttributes, FC, Ref } from "react";
import { useMemo } from "react";
import { PicoCls } from "../cls/PicoCls";
import { Icon } from "../icon/Icon";
import type { IconCls } from "../icon/IconCls";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { Tx } from "../tx/Tx";
import { ButtonCls } from "./ButtonCls";

export namespace Button {
	export interface Props
		extends ButtonCls.Props<ButtonHTMLAttributes<HTMLButtonElement>> {
		wrapperRef?: Ref<HTMLDivElement>;
		buttonRef?: Ref<HTMLButtonElement>;
		/**
		 * Goes through translation; in general buttons should _not_ have
		 * any complex content, thus the "label" only.
		 */
		label?: string;
		iconEnabled?: Icon.Type;
		iconDisabled?: Icon.Type;
		iconLoading?: Icon.Type;
		iconProps?: Omit<Icon.Props, "icon">;
		iconPosition?: "left" | "right";
		loading?: boolean;
		border?: boolean;
		background?: boolean;
		size?: Cls.VariantOf<ButtonCls, "size">;
		tone?: Cls.VariantOf<ButtonCls, "tone">;
		theme?: Cls.VariantOf<ButtonCls, "theme">;
		round?: Cls.VariantOf<ButtonCls, "round">;
	}
}

type ButtonSize = Cls.VariantOf<ButtonCls, "size">;

const ICON_SIZE_MAP: Partial<
	Record<ButtonSize, Cls.VariantOf<IconCls, "size">>
> = {
	sm: "xs",
	md: "sm",
	lg: "md",
	xl: "lg",
} as const;

const BaseButton: FC<Button.Props> = ({
	wrapperRef,
	buttonRef,
	label,
	iconEnabled,
	iconDisabled,
	iconLoading = SpinnerIcon,
	iconProps,
	iconPosition = "left",
	loading,
	size,
	tone,
	theme,
	round,
	border,
	background,
	//
	cls = ButtonCls,
	tweak,
	//
	disabled,
	children,
	...props
}) => {
	const { slots, variant } = useCls(
		cls,
		/**
		 * Component tweak has lowest precedence
		 */
		tweak,
		/**
		 * Component props has highest precedence
		 */
		{
			variant: {
				disabled,
				theme,
				tone,
				size,
				round,
				border,
				background,
			},
		},
	);

	const iconSize = ICON_SIZE_MAP[variant.size] ?? variant.size;

	const renderIcon = useMemo(
		() =>
			disabled ? (
				<Icon
					icon={
						loading === true
							? iconLoading
							: (iconDisabled ?? iconEnabled)
					}
					size={iconSize}
					{...iconProps}
				/>
			) : (
				<Icon
					icon={loading === true ? iconLoading : iconEnabled}
					size={iconSize}
					{...iconProps}
				/>
			),
		[
			disabled,
			loading,
			iconLoading,
			iconDisabled,
			iconEnabled,
			iconSize,
			iconProps,
		],
	);

	return (
		<VariantProvider
			cls={PicoCls}
			variant={{
				tone: variant.tone,
				theme: variant.theme,
			}}
		>
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
					{iconPosition === "left" && renderIcon}

					<Tx
						label={label}
						display={"block"}
					/>

					{children}

					{iconPosition === "right" && renderIcon}
				</button>
			</div>
		</VariantProvider>
	);
};

export const Button = withCls(BaseButton, ButtonCls);
