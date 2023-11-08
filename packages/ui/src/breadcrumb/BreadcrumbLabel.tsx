import {type FC}         from "react";
import {type Breadcrumb} from "../api/Breadcrumb";
import {Group}           from "../ui/Group";
import {WithIcon}        from "../ui/WithIcon";

export namespace BreadcrumbLabel {
    export type Props = Breadcrumb.Label;
}

export const BreadcrumbLabel: FC<BreadcrumbLabel.Props> = (
    {
        label,
        icon,
    }) => {
    return <Group gap={"sm"}>
        <WithIcon icon={icon}/>
        {label}
    </Group>;
};
