"use client";

import {LocaleLink}      from "@use-pico/i18n";
import {type IHrefProps} from "@use-pico/navigation";
import {useStore$}       from "@use-pico/store";
import {
    type FC,
    type ReactNode
}                        from "react";
import {LinkLockStore}   from "../store/LinkLockStore";
import {Button}          from "./Button";

export namespace ButtonLink {
    export interface Props {
        href?: IHrefProps | string;
        /**
         * Title of a button.
         */
        label?: ReactNode;
        withLocale?: boolean;
        target?: LocaleLink.Props["target"];
        disabled?: boolean;
        icon?: ReactNode;
        buttonProps?: Partial<Button.Props<typeof LocaleLink>>;
    }
}

export const ButtonLink: FC<ButtonLink.Props> = (
    {
        href,
        label,
        withLocale = true,
        target,
        disabled = false,
        icon,
        buttonProps,
    }) => {
    const linkLock = useStore$(LinkLockStore, ({isLock}) => ({isLock}));
    const $buttonProps: ButtonLink.Props["buttonProps"] = {
        variant:     "subtle",
        size:        "compact-md",
        leftSection: icon,
        children: label,
        ...buttonProps,
    };

    try {
        if (!href || disabled) {
            return <Button<LocaleLink.Props>
                component={LocaleLink}
                disabled
                {...$buttonProps}
            />;
        }
        if (linkLock?.isLock) {
            return label;
        }
        return <Button<LocaleLink.Props>
            component={LocaleLink}
            disabled={disabled}
            href={href}
            withLocale={withLocale}
            target={target}
            {...$buttonProps}
        />;
    } catch (e) {
        console.error(e);
        return <Button<LocaleLink.Props>
            component={LocaleLink}
            disabled
            {...$buttonProps}
        />;
    }
};
