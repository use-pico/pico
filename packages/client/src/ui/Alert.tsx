import { cssOf, type Css } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { Icon } from "./Icon";

const Variant = {
	info: "border-sky-500 bg-sky-100 text-sky-900",
	success: "border-green-500 bg-green-100 text-green-900",
	warning: "border-amber-500 bg-amber-100 text-amber-900",
	error: "border-red-500 bg-red-100 text-red-900",
	neutral: "border-slate-300 bg-slate-100 text-slate-600",
	subtle: "border-slate-100 bg-slate-50 text-slate-400",
	click: {
		info: "hover:bg-sky-200",
		success: "hover:bg-green-200",
		warning: "hover:bg-amber-200",
		error: "hover:bg-red-200",
		neutral: "hover:bg-slate-200",
		subtle: "hover:bg-slate-100",
	},
} as const;
type Variant = typeof Variant;

/**
 * Display simple alert with various available variants.
 *
 * You may specify an icon, title and optional message.
 *
 * @group ui
 */
export namespace Alert {
	export interface Props extends Css<"root" | "title" | "message"> {
		icon?: string;
		title: ReactNode;
		message?: ReactNode;
		variant?: keyof Omit<Variant, "click">;
		onClick?: () => void;
	}
}

export const Alert: FC<Alert.Props> = ({
	icon,
	title,
	message,
	variant = "info",
	onClick,
	css,
}) => {
	return (
		<div
			className={cssOf(
				["border rounded py-2 px-3", "flex flex-col"],
				Variant[variant],
				Boolean(onClick) && "cursor-pointer",
				onClick ? Variant.click[variant] : [],
				css?.root,
			)}
			onClick={onClick}
		>
			<div className={cssOf("flex items-center gap-2")}>
				{icon && (
					<Icon
						icon={icon}
						size={"2xl"}
					/>
				)}
				<div className={cssOf("font-semibold", css?.title)}>{title}</div>
			</div>
			{message && (
				<div className={cssOf("opacity-85 text-sm", css?.message)}>
					{message}
				</div>
			)}
		</div>
	);
};
