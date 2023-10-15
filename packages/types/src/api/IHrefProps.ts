import {type ParamsOf} from "./ParamsOf";

export interface IHrefProps<TPath extends string = string> {
    href: TPath;
    query?: ParamsOf.Params<TPath>;
}
