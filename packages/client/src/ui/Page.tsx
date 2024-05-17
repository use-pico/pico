import {cn}   from "@use-pico2/common";
import type {
    FC,
    PropsWithChildren,
    ReactNode
}             from "react";
import {Icon} from "./Icon";

export namespace Page {
    export type Props = PropsWithChildren<
        {
            /**
             * Customize texts used in a page itself.
             */
            text?: {
                /**
                 * Page title (tab).
                 */
                title?: string;
                /**
                 * Page header (shown at the top of the page).
                 */
                header?: ReactNode;
            };
            icon?: string;
            /**
             * Page subheader (shown below the header and above the content).
             */
            sub?: ReactNode;
        } & cn.WithClass
    >;
}

export const Page: FC<Page.Props> = (
    {
        text,
        icon,
        sub,
        children,
        cx,
    }) => {
    return <div
        className={cn(
            cx,
        )}
    >
        <div
            className={cn(
                "mb-2",
            )}
        >
            <div
                className={cn(
                    "flex flex-row items-center gap-1",
                    "text-slate-600",
                    "opacity-60",
                )}
            >
                {icon ? <Icon
                    icon={icon}
                /> : null}
                <span
                    className={cn(
                        "text-lg font-semibold",
                    )}
                >
						{text?.header}
					</span>
            </div>
        </div>
        <div>
            {sub}
        </div>
        {children}
    </div>;
};
