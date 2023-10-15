import {type IHrefProps} from "./IHrefProps";

export type IWithLinkTo<TPath extends string = string> = (href: IHrefProps<TPath> | TPath) => string;
