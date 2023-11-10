import {type IMenuGroup} from "./IMenuGroup";
import {type IMenuLabel} from "./IMenuLabel";
import {type IMenuLink}  from "./IMenuLink";

export type IMenuItems = (IMenuLink | IMenuGroup | IMenuLabel)[];
