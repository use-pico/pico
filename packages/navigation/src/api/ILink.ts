import {type IHrefProps} from "./IHrefProps";

export interface ILink<
    TPath extends string = string,
> extends IHrefProps<TPath> {
    withLocale?: boolean;
}
