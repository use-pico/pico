import {type IHrefProps} from "./IHrefProps";

export type INavigate<TPath extends string = string> = (href: IHrefProps<TPath> | TPath | null) => void;
