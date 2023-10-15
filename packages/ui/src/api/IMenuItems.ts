import {type IMenuGroup} from "./IMenuGroup";
import {type IMenuLink}  from "./IMenuLink";

export type IMenuItems = Record<string, IMenuLink | IMenuGroup>;
