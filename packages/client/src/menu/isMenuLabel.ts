import {isObject} from "@use-pico/common";
import {type Menu} from "./Menu";

export const isMenuLabel = (item: any): item is Menu.Label => {
	if (!item || !isObject(item)) {
		return false;
	} else if ("label" in item) {
		return true;
	}
	return false;
};
