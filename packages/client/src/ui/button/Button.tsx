import { type Cls, useCls, VariantProvider } from "@use-pico/cls";
import type { ButtonHTMLAttributes, FC, Ref } from "react";
import { useMemo } from "react";
import { PicoCls } from "../../cls/PicoCls";
import { Icon } from "../../icon/Icon";
import type { IconCls } from "../../icon/IconCls";
import { SpinnerIcon } from "../../icon/SpinnerIcon";
import type { UiProps } from "../../type/UiProps";
import { Tx } from "../tx/Tx";
import { ButtonCls } from "./ButtonCls";

const ICON_SIZE_MAP: Partial<
	Record<Cls.VariantOf<ButtonCls, "size">, Cls.VariantOf<IconCls, "size">>
> = {
	sm: "xs",
	md: "sm",
	lg: "md",
	xl: "lg",
} as const;

export namespace Button {
	export interface Props
		extends UiProps<
			ButtonCls.Props<ButtonHTMLAttributes<HTMLButtonElement>>
		> {
		/**
		 * Ref to the wrapper div element.
		 */
		wrapperRef?: Ref<HTMLDivElement>;
		/**
		 * Ref to the button element.
		 */
		buttonRef?: Ref<HTMLButtonElement>;
		/**
		 * Goes through translation; in general buttons should _not_ have
		 * any complex content, thus the "label" only.
		 */
		label?: string;
		/**
		 * Icon to display when the button is enabled and not loading.
		 */
		iconEnabled?: Icon.Type;
		/**
		 * Icon to display when the button is disabled.
		 * Falls back to `iconEnabled` if not provided.
		 */
		iconDisabled?: Icon.Type;
		/**
		 * Icon to display when the button is loading.
		 * @default SpinnerIcon
		 */
		iconLoading?: Icon.Type;
		/**
		 * Additional props to pass to the icon component.
		 */
		iconProps?: Omit<Icon.Props, "icon">;
		/**
		 * Position of the icon relative to the label.
		 * @default "left"
		 */
		iconPosition?: "left" | "right";
		/**
		 * Whether the button is in a loading state.
		 * When true, shows the loading icon and prevents interaction.
		 */
		loading?: boolean;
		/**
		 * Whether to show the border.
		 * @default true
		 */
		border?: boolean;
		/**
		 * Whether the button should take full width of its container.
		 * @default false
		 */
		full?: boolean;
		/**
		 * Whether to show the background.
		 * @default true
		 */
		background?: boolean;
		/**
		 * Size of the button (affects padding and font size).
		 * @default "md"
		 */
		size?: Cls.VariantOf<ButtonCls, "size">;
		/**
		 * Color tone of the button (affects background, text, border, and shadow colors).
		 * @default "primary"
		 */
		tone?: Cls.VariantOf<ButtonCls, "tone">;
		/**
		 * Theme variant (light or dark).
		 * @default "light"
		 */
		theme?: Cls.VariantOf<ButtonCls, "theme">;
		/**
		 * Border radius of the button.
		 * @default "default"
		 */
		round?: Cls.VariantOf<ButtonCls, "round">;
		/**
		 * Whether to truncate text that overflows the button width.
		 * @default false
		 */
		truncate?: boolean;
		/**
		 * Absolute positioning for snapping the button to corners of a parent container.
		 * Requires the parent element to have relative positioning.
		 * @default "unset"
		 */
		snapTo?: Cls.VariantOf<ButtonCls, "snap-to">;
	}
}

export const Button: FC<Button.Props> = ({
	ui,
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
	full,
	truncate,
	snapTo,
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
				full,
				truncate,
				"snap-to": snapTo,
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
				data-ui={ui ?? "Button-wrapper"}
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
						truncate={truncate}
					/>

					{children}

					{iconPosition === "right" && renderIcon}
				</button>
			</div>
		</VariantProvider>
	);
};
