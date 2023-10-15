import {type ReactNode}  from "react";
import {type IHrefProps} from "./IHrefProps";

export interface ILink<
    TPath extends string = string,
> extends IHrefProps<TPath> {
    label?: string;
    icon?: ReactNode;
    withLocale?: boolean;
}
