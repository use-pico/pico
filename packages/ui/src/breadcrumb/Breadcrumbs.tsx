import {Breadcrumbs as CoolBreadcrumbs} from "@mantine/core";
import {type FC}                        from "react";
import {type Breadcrumb}                from "../api/Breadcrumb";
import {BreadcrumbLabel}                from "./BreadcrumbLabel";
import {BreadcrumbLink}                 from "./BreadcrumbLink";
import {isBreadcrumbLabel}              from "./isBreadcrumbLabel";
import {isBreadcrumbLink}               from "./isBreadcrumbLink";

export namespace Breadcrumbs {
    export interface Props {
        items: Record<string, Breadcrumb.Item | undefined | false>;
    }
}

export const Breadcrumbs: FC<Breadcrumbs.Props> = (
    {
        items,
    }
) => {
    return <CoolBreadcrumbs>
        {Object.entries(items).map(([id, item]) => {
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
    </CoolBreadcrumbs>;
};
