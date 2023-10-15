import {Translation}           from "@pico/i18n";
import {type FC}               from "react";
import {type IBreadcrumbLabel} from "../api/IBreadcrumbLabel";
import {Group}                 from "../ui/Group";
import {WithIcon}              from "../ui/WithIcon";

export type IBreadcrumbLabelProps = IBreadcrumbLabel;

export const BreadcrumbLabel: FC<IBreadcrumbLabelProps> = (
    {
        label,
        icon,
    }) => {
    return <Group gap={"sm"}>
        <WithIcon icon={icon}/>
        <Translation withLabel={label}/>
    </Group>;
};
