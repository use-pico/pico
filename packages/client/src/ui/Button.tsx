import {cn}   from "@use-pico/common";
import {
    type ButtonHTMLAttributes,
    type FC
}             from "react";
import {Icon} from "./Icon";

const Variants = {
    "primary": [
        "bg-blue-400 hover:bg-blue-500 text-white",
    ],
    "subtle":  [
        "text-slate-500 hover:text-slate-700 hover:bg-blue-50",
    ],
    "danger":  [
        "bg-red-400 hover:bg-red-500 text-slate-50 hover:text-white",
    ],
} as const;
type Variants = typeof Variants;

export namespace Button {
    export interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, cn.WithClass {
        icon?: {
            enabled?: string;
            disabled?: string;
            loading?: string;
        };
        loading?: boolean;
        variant?: keyof Variants;
    }
}

export const Button: FC<Button.Props> = (
    {
        icon,
        loading,
        cx,
        variant = "primary",
        children,
        ...props
    }
) => {
    return <button
        className={cn(
            "flex items-center justify-center gap-2 group",
            "hover:shadow-md hover:shadow-slate-200 transition-all",
            "py-2 px-4 rounded",
            Variants[variant],
            {"opacity-50 cursor-not-allowed hover:bg-blue-400": props.disabled},
            cx,
        )}
        {...props}
    >
        {props.disabled && icon?.disabled ? <Icon
            icon={loading === true ? (icon.loading ?? "icon-[svg-spinners--90-ring-with-bg]") : icon.disabled}
            size={"xl"}
        /> : null}
        {!props.disabled && icon?.enabled ? <Icon
            icon={loading === true ? (icon.loading ?? "icon-[svg-spinners--90-ring-with-bg]") : icon.enabled}
            size={"xl"}
        /> : null}
        {children ? <span>{children}</span> : null}
    </button>;
};
