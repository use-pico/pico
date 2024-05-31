import {isObject} from "@use-pico/common";
import {type Menu} from "./Menu";

export const isMenuGroup = (item: any): item is Menu.Group => {
	if (!item || !isObject(item)) {
		return false;
	} else if ("label" in item && "items" in item) {
		return true;
	}
	return false;
};
