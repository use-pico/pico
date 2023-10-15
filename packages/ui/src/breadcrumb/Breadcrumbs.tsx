"use client";

import {Breadcrumbs as CoolBreadcrumbs} from "@mantine/core";
import {
    type IWithTranslation,
    WithTranslationProvider
}                                       from "@pico/i18n";
import {type FC}                        from "react";
import {type IBreadcrumb}               from "../api/IBreadcrumb";
import {BreadcrumbLabel}                from "./BreadcrumbLabel";
import {BreadcrumbLink}                 from "./BreadcrumbLink";
import {isBreadcrumbLabel}              from "./isBreadcrumbLabel";
import {isBreadcrumbLink}               from "./isBreadcrumbLink";

export interface IBreadcrumbsProps {
    withTranslation?: IWithTranslation;
    items: (IBreadcrumb | undefined)[];
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = (
    {
        withTranslation,
        items,
    }
) => {
    return <WithTranslationProvider
        withTranslation={withTranslation}
    >
        <CoolBreadcrumbs>
            {items.filter(Boolean).map((
                {
                    id,
                    ...item
                }) => {
                if (isBreadcrumbLink(item)) {
                    return <BreadcrumbLink
                        key={id}
                        {...item}
                    />;
                } else if (isBreadcrumbLabel(item)) {
                    return <BreadcrumbLabel
                        key={id}
                        {...item}
                    />;
                }
                return null;
            })}
        </CoolBreadcrumbs>
    </WithTranslationProvider>;
};
