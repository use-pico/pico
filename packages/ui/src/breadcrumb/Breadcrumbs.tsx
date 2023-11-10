import {Breadcrumbs as CoolBreadcrumbs} from "@mantine/core";
import {type FC}                        from "react";
import {type Breadcrumb}                from "../api/Breadcrumb";
import {BreadcrumbLabel}                from "./BreadcrumbLabel";
import {BreadcrumbLink}                 from "./BreadcrumbLink";
import {isBreadcrumbLabel}              from "./isBreadcrumbLabel";
import {isBreadcrumbLink}               from "./isBreadcrumbLink";

export namespace Breadcrumbs {
    export interface Props {
        items: (Breadcrumb.Item | undefined | false)[];
    }
}

export const Breadcrumbs: FC<Breadcrumbs.Props> = (
    {
        items,
    }
) => {
    return <CoolBreadcrumbs>
        {items.map((item, index) => {
            if (isBreadcrumbLink(item)) {
                return <BreadcrumbLink
                    key={`breadcrumb-${index}`}
                    {...item}
                />;
            } else if (isBreadcrumbLabel(item)) {
                return <BreadcrumbLabel
                    key={`breadcrumb-${index}`}
                    {...item}
                />;
            }
            return null;
        })}
    </CoolBreadcrumbs>;
};
