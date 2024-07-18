import { FloatingTree } from "@floating-ui/react";
import { Css, cssOf } from "@use-pico/common";
import { type ButtonHTMLAttributes, type FC } from "react";
import { ActionMenuIcon } from "../icon/ActionMenuIcon";
import type { ActionMenu } from "../menu/ActionMenu";
import { Items } from "../menu/ActionMenu/Items";
import { Float } from "./Float";
import { Icon } from "./Icon";

export namespace Variants {
	export interface Props {
		disabled?: boolean;
		action?: {
			disabled?: boolean;
		};
	}
}
const Variants = (props: Variants.Props) =>
	({
		primary: "text-white",
		secondary: "text-slate-700",
		subtle: "text-black",
		danger: "text-slate-50",
		button: {
			primary: [
				"bg-blue-400 hover:bg-blue-500",
				props.disabled && "cursor-not-allowed",
			],
			secondary: [
				"bg-amber-400 hover:bg-amber-500",
				props.disabled && "cursor-not-allowed",
			],
			subtle: [
				"hover:text-slate-800 hover:bg-blue-50",
				props.disabled &&
					"text-slate-400 hover:text-slate-400 hover:bg-inherit cursor-not-allowed",
			],
			danger: ["bg-red-400 hover:bg-red-500 hover:text-white"],
		},
		action: {
			primary: [
				"bg-blue-400 hover:bg-blue-500 border-l-blue-800",
				props.action?.disabled &&
					"opacity-75 bg-blue-600 hover:bg-blue-600 cursor-not-allowed",
			],
			secondary: ["bg-amber-400 hover:bg-amber-500 border-l-amber-600"],
			subtle: ["hover:text-slate-700 hover:bg-blue-50"],
			danger: [
				"bg-green-500 hover:bg-red-500 hover:text-white",
				props.disabled && "cursor-not-allowed",
			],
		},
	}) as const;
type Variants = ReturnType<typeof Variants>;

const Sizes = {
	xs: "py-0.5 px-1",
	sm: "py-1 px-2",
	md: "py-2 px-4",
} as const;
type Sizes = keyof typeof Sizes;

export namespace Button {
	export interface Props
		extends ButtonHTMLAttributes<HTMLButtonElement>,
			Css<"root" | "button" | "action"> {
		icon?: {
			enabled?: string;
			disabled?: string;
			loading?: string;
		};
		iconProps?: Omit<Icon.Props, "icon">;
		loading?: boolean;
		variant?: keyof Omit<Variants, "button" | "action">;
		size?: Sizes;
		action?: {
			items: ActionMenu.Item[];
			disabled?: boolean;
		};
	}
}

export const Button: FC<Button.Props> = ({
	icon,
	iconProps,
	loading,
	variant = "primary",
	size = "md",
	action,
	css,
	children,
	...props
}) => {
	const variantProps = {
		disabled: props.disabled,
		action,
	} as const;

	return (
		<div
			className={cssOf(
				"flex flex-row items-center justify-center",
				"transition-all",
				Variants(variantProps)[variant],
				css?.root,
			)}
		>
			<button
				type={"button"}
				className={cssOf(
					"flex items-center justify-center gap-2 group",
					"rounded",
					Boolean(action) && "rounded-r-none",
					...Variants(variantProps).button[variant],
					Sizes[size],
					css?.button,
				)}
				{...props}
			>
				{props.disabled && icon?.disabled ?
					<Icon
						icon={
							loading === true ?
								icon.loading ?? "icon-[svg-spinners--90-ring-with-bg]"
							:	icon.disabled
						}
						size={"xl"}
						{...iconProps}
					/>
				:	null}
				{!props.disabled && icon?.enabled ?
					<Icon
						icon={
							loading === true ?
								icon.loading ?? "icon-[svg-spinners--90-ring-with-bg]"
							:	icon.enabled
						}
						size={"xl"}
						{...iconProps}
					/>
				:	null}
				{children ?
					<span>{children}</span>
				:	null}
			</button>
			{action && (
				<FloatingTree>
					<Float
						action={"click"}
						disabled={action.disabled}
						target={
							<div
								className={cssOf(
									"flex items-center justify-center",
									"border-l rounded-r",
									...Variants(variantProps).action[variant],
									Sizes[size],
									css?.action,
								)}
							>
								<Icon
									icon={ActionMenuIcon}
									size={"2xl"}
								/>
							</div>
						}
						delay={100}
						float={{
							placement: "bottom-start",
						}}
						closeOnClick
					>
						<Items items={action.items} />
					</Float>
				</FloatingTree>
			)}
		</div>
	);
};
