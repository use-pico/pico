import {cn}   from "@use-pico2/common";
import {
    type ButtonHTMLAttributes,
    type FC
}             from "react";
import {Icon} from "./Icon";

export namespace Button {
    export interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, cn.WithClass {
        icon?: {
            enabled?: string;
            disabled?: string;
            loading?: string;
        };
        loading?: boolean;
    }
}

export const Button: FC<Button.Props> = (
    {
        icon,
        loading,
        cx,
        children,
        ...props
    }
) => {
    return <button
        className={cn(
            "flex items-center justify-center gap-2 group",
            "bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded",
            {"opacity-50 cursor-not-allowed hover:bg-blue-400": props.disabled},
            cx,
        )}
        {...props}
    >
        {props.disabled && icon?.disabled ? <Icon
            icon={loading == true ? (icon.loading ?? "icon-[svg-spinners--90-ring-with-bg]") : icon.disabled}
        /> : null}
        {!props.disabled && icon?.enabled ? <Icon
            icon={loading == true ? (icon.loading ?? "icon-[svg-spinners--90-ring-with-bg]") : icon.enabled}
        /> : null}
        {children ? <span>{children}</span> : null}
    </button>;
};
